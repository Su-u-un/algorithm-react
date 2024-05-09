import React from 'react';
import { Button, Divider, Layout,theme,Drawer,Tabs  } from 'antd';
import { BookOutlined,HomeOutlined } from '@ant-design/icons';
import Player from '../Player';
import UserCard from '../UserCard';
import { setFolder } from "../../store/current"
import { useDispatch,useSelector } from 'react-redux';
import {Tracer,Array1DTracer,Array2DTracer,ChartTracer,GraphTracer,LogTracer} from '../../pages/Tracer'
import {Layout as RootLayout, VerticalLayout,HorizontalLayout } from "../../pages/Layout";

const { Header:AntdHeader } = Layout;

const Header = () => {
    const {
        token: { colorBgContainer},
      } = theme.useToken();

    const [open, setOpen] = React.useState(false);
    const { files } = useSelector(state => state.current)

    const dispatch = useDispatch()
    return (
        <AntdHeader style={{ display: 'flex',flexDirection:'row',justifyContent:'space-between', padding: 0, background: colorBgContainer }} >
          <Player/>
          <div>
            <Button style={{marginTop:'16px'}} icon={<HomeOutlined />} disabled={files.length === 0} onClick={() => {dispatch(setFolder([[],0,'']))}} >返回首页</Button>
            <Divider type='vertical'/>
            <Button style={{marginTop:'16px'}} icon={<BookOutlined />} disabled={files.length === 0} onClick={() => setOpen(true)} >查看教程</Button>
            <Drawer
              title='教程'
              placement="right"
              size='large'
              onClose={()=>{setOpen(false)}}
              open={open}
            >
              <Tabs
                defaultActiveKey="1"
                tabPosition='left'
                items={
                  [
                    {
                      label:'渲染器',
                      key:'1',
                      children:<Tracer/>,
                    },
                    {
                      label:'一维结构',
                      key:'2',
                      children:<Array1DTracer/>,
                    },
                    {
                      label:'二维结构',
                      key:'3',
                      children:<Array2DTracer/>, 
                    },
                    {
                      label:'图表',
                      key:'4',
                      children:<ChartTracer/>,
                    },
                    {
                      label:'图结构',
                      key:'5',
                      children:<GraphTracer/>,
                    },
                    {
                      label:'日志',
                      key:'6',
                      children:<LogTracer/>,
                    },
                    {
                      label:'布局',
                      key:'7',
                      children:<RootLayout/>,
                    },
                    {
                      label:'垂直布局',
                      key:'8',
                      children:<VerticalLayout/>,
                    },
                    {
                      label:'水平布局',
                      key:'9',
                      children:<HorizontalLayout/>,
                    }
                  ]
                }
              />
            </Drawer>
          </div>
          
          <UserCard/>
        </AntdHeader>
    )
}

export default Header