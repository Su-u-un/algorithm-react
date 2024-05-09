import React from "react";
import { Typography,Card, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;
const Tracer = () => {
    return (
        <Typography style={{ padding: '20px', backgroundColor: 'white', height: 'calc(100% - 46px)', overflow: "auto" }}>
            <Title>Tracer</Title>
            <Title level={3}>构造函数</Title>
            <Card title="constructor" style={{ width: 450 }}>
                <Paragraph>new Tracer(title?: <Text italic>undefined</Text> | <Text italic>string</Text>): <Text italic>Tracer</Text></Paragraph>
                <Paragraph>创建一个tracer</Paragraph>
            </Card>
            <Title level={3}>方法</Title>
            <Space style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card title="destroy" style={{ width: 450 }}>
                    <Paragraph>destroy(): <Text italic>void</Text></Paragraph>
                    <Paragraph>删除一个Tracer</Paragraph>
                </Card>
                <Card title="reset" style={{ width: 450 }}>
                    <Paragraph>reset(): <Text italic>void</Text></Paragraph>
                    <Paragraph>重置tracer</Paragraph>
                </Card>
                <Card title="delay" style={{ width: 450 }}>
                    <Paragraph>delay(lineNumber?: <Text italic>Number</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>显示所有tracer的更改</Paragraph>
                </Card>
            </Space>
        </Typography>
    )
}

export default Tracer