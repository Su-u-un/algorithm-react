import React from "react";
import { Typography,Card, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;
const VerticalLayout = () => {
    return (
        <Typography style={{ padding: '20px', backgroundColor: 'white', height: 'calc(100% - 46px)', overflow: "auto" }}>
            <Title>VerticalLayout</Title>
            <Title level={3}>构造函数</Title>
            <Card title="constructor" style={{ width: 450 }}>
                <Paragraph>new VerticalLayout(children?: <Text italic>Layout | Tracer</Text>): <Text italic>VerticalLayout</Text></Paragraph>
                <Paragraph>创建一个布局</Paragraph>
            </Card>
            <Title level={3}>方法</Title>
            <Space style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card title="add" style={{ width: 450 }}>
                    <Paragraph>add(child?: <Text italic>Layout | Tracer</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>向布局中增加一个子项</Paragraph>
                </Card>
                <Card title="destroy" style={{ width: 450 }}>
                    <Paragraph>destroy(): <Text italic>void</Text></Paragraph>
                    <Paragraph>移除tracer</Paragraph>
                </Card>
                <Card title="remove" style={{ width: 450 }}>
                    <Paragraph>remove(child?: <Text italic>Layout | Tracer</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>删除布局中的子项</Paragraph>
                </Card>
                <Card title="removeAll" style={{ width: 450 }}>
                    <Paragraph>removeAll(): <Text italic>void</Text></Paragraph>
                    <Paragraph>删除布局中所有子项</Paragraph>
                </Card>
                <Card title="setRoot" style={{ width: 450 }}>
                    <Paragraph>setRoot(root?: <Text italic>Layout | Tracer</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>将视图设置为根视图</Paragraph>
                </Card>
            </Space>
        </Typography>
    )
}

export default VerticalLayout