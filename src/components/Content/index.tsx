import React from "react"
import { Layout } from 'antd';
import {SplitPane} from 'react-split-pane';
import Charts from '../Charts';
import Right from '../Right';

const { Content:AntdContent } = Layout;


const Content = () => {
    return (
        <AntdContent style={{ margin: '24px 16px 0', overflow: 'initial' ,display:'flex',flexDirection:'row'}}>
          <SplitPane split="vertical" >
            <Charts/>
            <Right/>
          </SplitPane>
        </AntdContent>
    )
}

export default Content