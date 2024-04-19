import React from 'react';
import { Layout,theme  } from 'antd';
import Player from '../Player';
import UserCard from '../UserCard';

const { Header:AntdHeader } = Layout;

const Header = () => {
    const {
        token: { colorBgContainer},
      } = theme.useToken();
    return (
        <AntdHeader style={{ display: 'flex',flexDirection:'row',justifyContent:'space-between', padding: 0, background: colorBgContainer }} >
          <Player/>
          <UserCard/>
        </AntdHeader>
    )
}

export default Header