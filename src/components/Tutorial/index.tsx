import React ,{useState} from "react";
import { Menu } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link, Outlet } from "react-router-dom";

const Tutorial = () => {
    const [current, setCurrent] = useState('Home');

    const items: MenuProps['items'] = [
        {
            label:<Link to="Home"><HomeOutlined /></Link>,
            key: 'Home',
        },
        {
            label: <Link to="Tracer">Tracer</Link>,
            key: 'Tracer',
            children: [
                {
                    label: <Link to="Array1DTracer">Array1DTracer</Link>,
                    key: 'Array1DTracer',
                  },
                  {
                    label: <Link to="Array2DTracer">Array2DTracer</Link>,
                    key: 'Array2DTracer',
                  },
                {
                    label: <Link to="ChartTracer">ChartTracer</Link>,
                    key: 'ChartTracer',
                  },
                  {
                    label:<Link to="GraphTracer">GraphTracer</Link>,
                    key:'GraphTracer'
                  },
                  {
                    label: <Link to="LogTracer">LogTracer</Link>,
                    key: 'LogTracer',
                  },
            ]
        },
        {
            label: <Link to="Layout">Layout</Link>,
            key: 'Layout',
            children:[
                {
                    label:<Link to="HorizontalLayout">HorizontalLayout</Link>,
                    key:'HorizontalLayout'
                },
                {
                    label:<Link to="VerticalLayout">VerticalLayout</Link>,
                    key:'VerticalLayout'
                }
            ]
        },
      ];

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <div style={{height:'calc(100vh - 64px)'}}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <Outlet />
    </div>
}

export default Tutorial