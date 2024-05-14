import React,{useState} from 'react';
import { Button, Tabs, Layout, Space } from 'antd';
import Login from '../../components/Login';
import Register from '../../components/Register';

import styles from './Auth.module.less'

const { Header,Content } = Layout


const Auth: React.FC = () => {
    const [status,setStatus] = useState('login')

    const login = [
        {
            key: '1',
            label: '快捷登录',
            children: <Login type="phone"/>,
        },
        {
            key: '2',
            label: '密码登录',
            children: <Login type="pwd"/>,
        },
    ]
    const register = [
        {
            key: '1',
            label: '注册',
            children: <Register/>,
        },
    ]

    return(
        <Layout>
            <Header style={{ display: 'flex',flexDirection:'row',justifyContent:'space-between', background: '#fff', padding: 0,borderBottom:'1px solid #ccc' }}>
                <div style={{marginLeft:'20px',fontWeight:'bold',fontSize:'25px'}}>AlgoVis</div>
                <div style={{marginRight:'20px'}}>
                    <Space>
                        <Button onClick={()=>setStatus('login')} type={status==='login'?'default':'primary'}>登录</Button>
                        <Button onClick={()=>setStatus('register')} type={status==='register'?'default':'primary'}>注册</Button>
                    </Space>
                    
                </div>
            </Header>
            <Content style={{ height:'calc(100vh - 64px)'}}>
                <div style={{ background:'white',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)', width:'500px',height:'350px',border:'1px solid #ccc',borderRadius:'10px' }}>
                    {
                    status==='login'
                    ?
                    <>
                    <Tabs style={{padding:'0 40px'}} defaultActiveKey="1" items={login} onChange={(e)=>{console.log(e)}} />
                    <div style={{padding:'0 90px'}}>没有账号？<a onClick={()=>setStatus('register')}>立即注册</a></div>
                    </>
                    :
                    <>
                    <Tabs style={{padding:'0 40px'}} defaultActiveKey="1" items={register} onChange={(e)=>{console.log(e)}} />
                    <div style={{padding:'0 90px'}}>已有账号？<a onClick={()=>setStatus('login')}>立即登录</a></div>
                    </>
                    }
                    
                </div>
            </Content>
            
        </Layout>
    )}

export default Auth;