import React,{useState} from 'react'
import { Form, Input, Button,message,Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import user from '../../api/user'

type FieldType = {
    username?: string;
    password?: string;
    rePassword?: string;
    phone?: string;
    imgCaptcha?:string
    captcha?:string
  };

let timer = null

const Register = ()=>{
    const [form] = Form.useForm();
    const navigator = useNavigate()

    // 获取验证码计时
    const [time, setTime] = useState(5);
    const [loading,setLoading] = useState(false)
    const getCaptcha = async ()=>{
        // 获取验证码
        try {
            const val = await form.validateFields(['phone'])
            const res = await user.registerCaptcha({
                "phone":val.phone
            })
            if(res.data.code === '-1'){
                message.info('获取验证码失败，请联系管理员')
            }
            else if(res.data.code === '-2'){
                message.info(res.data.msg)
            }
            else{
                setLoading(true)
                timer = window.setInterval(() => {
                setTime((pre)=>{
                        if(pre === 0){
                            setLoading(false)
                            window.clearInterval(timer)
                            return 5
                        }
                        return pre-1
                    })
                },1000)
            }
        } catch (errorInfo) {
          console.log('Failed:', errorInfo);
        }
    }
    // 二次确认密码
    const validateConfirm = (rule, value, callback)=>{
        const { getFieldValue } = form;
        if (value && value !== getFieldValue('password')) {
          callback('两次输入密码不一致！');
        } else {
          callback();
        }
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onSubmit = async ():Promise<void> => {
        try{
            const val = await form.validateFields()
            const res = await user.register({
                "username":val.username,
                "password":val.password,
                "phone":val.phone,
                "captcha":val.captcha
            });
            if(res.data.code === 0){
                message.success("注册成功，请登录");
                navigator("/Auth");
            }else message.error(res.data.msg);
            
        }
        catch{
            console.log('error')
        }
    }


    return (
        <Form
            form={form}
            name="register"
            wrapperCol={{ span: 20 }}
            style={{paddingLeft:'50px',width:'100%',height:'100%'}}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                name="username"
                style={{marginBottom: '10px'}}
                rules={[{required: true, message: '请输入用户名'}]}
                help={false}
            >
                <Input placeholder='请输入用户名'/>
            </Form.Item>

            <Form.Item<FieldType>
                name="phone"
                style={{marginBottom: '10px'}}
                rules={[
                    { required: true, message: '请输入手机号' },
                    {
                        pattern: /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/,
                        message: '请输入正确的手机号'
                    }
                ]}
                help={false}
            >
                <Input addonBefore="+86" placeholder='请输入手机号'/>
            </Form.Item>

            <Form.Item<FieldType>
                name="captcha"
                style={{marginBottom: '10px'}}
                rules={[{required: true, message: '请输入短信验证码'},{type:'string',len:4, message: '请输入四位验证码'}]}
                help={false}
            >
                <Space.Compact style={{ width: '100%' }}>
                    <Input placeholder='请输入短信验证码' />
                    <Button onClick={getCaptcha} type="default" disabled={!loading? false : true}>{!loading?'获取短信验证码':`${time}秒后重发`}</Button>
                </Space.Compact>
            </Form.Item>

            <Form.Item<FieldType>
                name="password"
                style={{marginBottom: '10px'}}
                rules={[{required: true, message: '请输入密码'}]}
                help={false}
            >
                <Input.Password placeholder='请输入密码'/>
            </Form.Item>

            <Form.Item<FieldType>
                name="rePassword"
                style={{marginBottom: '10px'}}
                rules={[
                    {required: true, message: '请输入再次确认密码'},
                    {validator:validateConfirm}
                ]}
            >
                <Input.Password placeholder='请确认密码'/>
            </Form.Item>

            <Form.Item style={{marginBottom: '10px'}}>
                <Button type="primary" htmlType="submit" onClick={onSubmit} block>
                    注册
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Register