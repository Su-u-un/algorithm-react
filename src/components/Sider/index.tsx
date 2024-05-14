import React from 'react';
import Menu from '../Menu';
import { Divider ,theme } from 'antd';
import { getPublicInfo } from '../../util/auth';
import { useSelector } from 'react-redux';

const Sider = ()=>{
    const { token: { colorBgContainer}} = theme.useToken();

    const {algo} = useSelector((state:any)=>state.file)
    const publicData = JSON.parse(getPublicInfo()!)

    return (
        <div
            style={{background:colorBgContainer,display:'flex',flexDirection:'column',overflow: 'auto',height:'100%'}}
        >
            <Menu data={algo} type={'list'}/>
            <Divider />
            <Menu data={publicData} type={'public'}/>
        </div>
    )
}

export default Sider