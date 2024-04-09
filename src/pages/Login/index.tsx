import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { setToken, setUserInfo } from '../../util/auth';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import styles from './Login.module.less'

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onSubmit = async ():Promise<void> => {
        try{
            const val = await form.validateFields()
            const res = await axios.post('http://localhost:3000/user/login/',{
                "username":val.username,
                "password":val.password
            });
            if(res.data.code === 0){
                // 存入用户信息和token
                setUserInfo(JSON.stringify(res.data.list))
                setToken(JSON.stringify(res.data.token))
                navigate("/")
            }else{
                message.error("登录失败");
            }
            
        }
        catch{
            console.log('error')
        }
        
    }

    return(
        <div className={styles.card}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                >
                    <Input defaultValue='www'/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                >
                    <Input.Password defaultValue='123456'/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )}

export default Login;