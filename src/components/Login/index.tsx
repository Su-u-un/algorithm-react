import React, { forwardRef,useImperativeHandle, useState } from 'react'
import { Form, Input, Button,message,Space } from 'antd';
import { setToken, setUserInfo, setPublicInfo } from '../../util/auth';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAlgo } from '../../store/file';
import user from '../../api/user'

type PhoneType = {
    phone?: string;
    captcha?: string;
  };
type PwdType = {
    username?:string;
    password?:string
}
let timer = null

const Login = (props:any,ref:any) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    // 向父组件暴露form
    useImperativeHandle(ref, () => ({
        form
    }))
    // 路由跳转
    const navigate = useNavigate();
    const {type} = props

    // 获取验证码计时
    const [time, setTime] = useState(5);
    const [loading,setLoading] = useState(false)
    const getCaptcha = async () => {
        // 获取验证码
        try {
            const val = await form.validateFields(['phone'])
            const res = await user.loginCaptcha({
                "phone":val.phone,
            });
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

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onSubmit = async ():Promise<void> => {
        try{
            const val = await form.validateFields()
            const res = await user.login({
                "username":val.username,
                "password":val.password,
                "phone":val.phone,
                "captcha":val.captcha
            });
            if(res.code === '0'){
                // 存入用户信息、文件信息、公共文件信息和token
                dispatch(setAlgo(res.list))
                // setFileInfo(JSON.stringify(res.list))
                setUserInfo(JSON.stringify(res.username))
                setPublicInfo(JSON.stringify(res.public))
                setToken(JSON.stringify(res.token))
                navigate("/")
            }else{
                message.error(res.data.error);
            }
        }
        catch{
            console.log('error')
        }
        
    }


    return (
        // 区分手机号登录and用户名登录
        type === 'phone' ?
        <Form
            form={form}
            name="phone"
            wrapperCol={{ span: 20 }}
            style={{paddingLeft:'50px', paddingTop:'20px',width:'100%',height:'100%'}}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<PhoneType>
                name="phone"
                rules={[
                    { required: true, message: '请输入手机号' },
                    {
                        pattern: /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/,
                        message: '请输入正确的手机号'
                    }
                ]}
            >
                <Input size='large' addonBefore="+86" placeholder='请输入手机号'/>
            </Form.Item>

            <Form.Item<PhoneType>
                name="captcha"
                rules={[{required: true, message: '请输入短信验证码'},{type:'string',len:4, message: '请输入四位验证码'}]}
            >
                <Space.Compact style={{ width: '100%' }}>
                    <Input size ='large' placeholder='请输入短信验证码' />
                    <Button onClick={getCaptcha} size = 'large' type="default" disabled={!loading? false : true}>{!loading?'获取短信验证码':`${time}秒后重发`}</Button>
                </Space.Compact>
            </Form.Item>

            <Form.Item>
                <Button type="primary" size='large' htmlType="submit" onClick={onSubmit} block>
                    登录
                </Button>
            </Form.Item>
        </Form>
        :
        <Form
            form={form}
            name="username"
            wrapperCol={{ span: 20 }}
            style={{paddingLeft:'50px', paddingTop:'20px',width:'100%',height:'100%'}}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<PwdType>
                name="username"
            >
                <Input size='large' placeholder='请输入用户名'/>
            </Form.Item>

            <Form.Item<PwdType>
                name="password"
            >
                <Input.Password size ='large' placeholder='请输入密码'/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" size='large' htmlType="submit" onClick={onSubmit} block>
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
}

export default forwardRef(Login)