import React from 'react';
import { Layout, theme } from 'antd';
import Charts from '../components/Charts';
import Right from '../components/Right';
import Left from '../components/Left';
import Player from '../components/Player';

const { Header, Content,Sider } = Layout;

const BasicLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        collapsible
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div className="demo-logo-vertical" />
        <Left/>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <Player/>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' ,display:'flex',flexDirection:'row'}}>
          <div style={{height:'100%',width:'600px'}}>
            <Charts/>
          </div>
          
          <Right/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;