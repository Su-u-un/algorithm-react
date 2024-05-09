import React from "react";
import { Typography, Card, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;
const LogTracer = () => {
    return (
        <Typography style={{ padding: '20px', backgroundColor: 'white', height: 'calc(100% - 46px)', overflow: "auto" }}>
            <Title>LogTracer</Title>
            <Title level={3}>构造函数</Title>
            <Card title="constructor" style={{ width: 450 }}>
                <Paragraph>new LogTracer(title?: <Text italic>undefined</Text> | <Text italic>string</Text>): <Text italic>LogTracer</Text></Paragraph>
                <Paragraph>创建一个tracer</Paragraph>
            </Card>
            <Title level={3}>方法</Title>
            <Space style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card title="set" style={{ width: 450 }}>
                    <Paragraph>set(log?: <Text italic>undefined</Text> | <Text italic>string</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>设置要显示的初始日志</Paragraph>
                </Card>
                <Card title="reset" style={{ width: 450 }}>
                    <Paragraph>reset(): <Text italic>void</Text></Paragraph>
                    <Paragraph>重置tracer</Paragraph>
                </Card>
                <Card title="println" style={{ width: 450 }}>
                    <Paragraph>println(message: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>打印日志并换行</Paragraph>
                </Card>
                <Card title="printf" style={{ width: 450 }}>
                    <Paragraph>printf(format: <Text italic>string</Text>, ...args: <Text italic>any[]</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>打印格式化日志</Paragraph>
                </Card>
                <Card title="print" style={{ width: 450 }}>
                    <Paragraph>print(message: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>打印日志</Paragraph>
                </Card>
                <Card title="destroy" style={{ width: 450 }}>
                    <Paragraph>destroy(): <Text italic>void</Text></Paragraph>
                    <Paragraph>删除此tracer</Paragraph>
                </Card>
                <Card title="delay" style={{ width: 450 }}>
                    <Paragraph>delay(lineNumber?: <Text italic>Number</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>显示所有tracer的更改</Paragraph>
                </Card>
            </Space>
        </Typography>
    )
}

export default LogTracer