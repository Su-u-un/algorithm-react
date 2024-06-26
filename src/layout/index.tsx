import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';

import Sider from '../components/Sider';
import Header from '../components/Header';
import Content from '../components/Content';
import Tutorial from '../components/Tutorial';
import {SplitPane,Pane} from 'react-split-pane';

import { useSelector } from 'react-redux';

const BasicLayout: React.FC = () => {
  const {type} = useSelector(state => state.current)
  
  const [show, setShow] = useState(false)

  // 这边对是否选中文件作监听，点击了目录就展示可视化，否则展示教程
  useEffect(() => {
    if(type){
      setShow(true)
    }
    else{
      setShow(false)
    }
  }, [type]);

  return (
    <div style={{display:'flex',height:'100vh'}}>
      <SplitPane split="vertical">
        <Pane maxSize='250px'>
          <Sider/>
        </Pane>
        <Pane>
          <Layout style={{ minHeight: '100vh'}}>
            <Header/>
            {
              show
              ?
              <Content/>
              :
              <Tutorial/>
            }
          </Layout>
        </Pane>
      </SplitPane>
    </div>
  );
};

export default BasicLayout;