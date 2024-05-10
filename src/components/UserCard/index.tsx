import React from "react";
import { Avatar, Dropdown } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { getUserInfo,delToken,delFileInfo,delUserInfo,delPublicInfo } from "../../util/auth";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
    const username = JSON.parse(getUserInfo()!)
    const navigate = useNavigate();

    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" onClick={() => {delToken();delUserInfo();delFileInfo();delPublicInfo();navigate('/Auth')}}>
              退出登录
            </a>
          ),
        }
      ];


    return (
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <div style={{userSelect:'none', marginRight:'20px',marginTop:'10px',height:'40px',lineHeight:'40px'}}>
            <span style={{marginRight:'20px'}}>{username}</span>
            <Avatar size={'small'} icon={<UserOutlined />} />
          </div>
        </Dropdown>
    )
}


export default UserCard