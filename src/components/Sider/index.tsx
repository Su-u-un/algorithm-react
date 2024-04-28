import React from 'react';
import Menu from '../Menu';
import { Divider ,theme } from 'antd';
import { getFileInfo,getPublicInfo } from '../../util/auth';

const Sider = ()=>{
    const { token: { colorBgContainer}} = theme.useToken();

    const data = JSON.parse(getFileInfo()!)
    const publicData = JSON.parse(getPublicInfo()!)

    return (
        <div
            style={{background:colorBgContainer,display:'flex',flexDirection:'column',overflow: 'auto',height:'100%'}}
        >
            <Menu data={data} type={'list'}/>
            <Divider />
            <Menu data={publicData} type={'public'}/>
        </div>
    )
}

export default Sider