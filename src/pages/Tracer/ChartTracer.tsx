import React from "react";
import { Typography,Card, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;
const ChartTracer = () => {
    return (
        <Typography style={{ padding: '20px', backgroundColor: 'white', height: 'calc(100% - 46px)', overflow: "auto" }}>
            <Title>ChartTracer</Title>
            <Title level={3}>构造函数</Title>
            <Card title="constructor" style={{ width: 450 }}>
                <Paragraph>new ChartTracer(title?: <Text italic>undefined</Text> | <Text italic>string</Text>): <Text italic>ChartTracer</Text></Paragraph>
                <Paragraph>创建一个tracer</Paragraph>
            </Card>
            <Title level={3}>方法</Title>
            <Space style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card title="chart" style={{ width: 450 }}>
                    <Paragraph>chart(chartTracer: <Text italic>ChartTracer</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>同步chart tracer</Paragraph>
                </Card>
                <Card title="set" style={{ width: 450 }}>
                    <Paragraph>set(array1d?: <Text italic>any[]</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>设置要可视化的数组</Paragraph>
                </Card>
                <Card title="reset" style={{ width: 450 }}>
                    <Paragraph>reset(): <Text italic>void</Text></Paragraph>
                    <Paragraph>重置tracer</Paragraph>
                </Card>
                <Card title="destroy" style={{ width: 450 }}>
                    <Paragraph>destroy(): <Text italic>void</Text></Paragraph>
                    <Paragraph>移除tracer</Paragraph>
                </Card>
                <Card title="patch" style={{ width: 450 }}>
                    <Paragraph>patch(x: <Text italic>number</Text>.v?: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>通知值更改</Paragraph>
                </Card>
                <Card title="depatch" style={{ width: 450 }}>
                    <Paragraph>depatch(x: <Text italic>number</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>取消通知值更改</Paragraph>
                </Card>
                <Card title="select" style={{ width: 450 }}>
                    <Paragraph>select(sx: <Text italic>number</Text>,ex?: <Text italic>undefined | number</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>选择数组索引</Paragraph>
                </Card>
                <Card title="deselect" style={{ width: 450 }}>
                    <Paragraph>deselect(sx: <Text italic>number</Text>,ex?: <Text italic>undefined | number</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>取消选择</Paragraph>
                </Card>
                <Card title="delay" style={{ width: 450 }}>
                    <Paragraph>delay(lineNumber?: <Text italic>Number</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>显示所有tracer的更改</Paragraph>
                </Card>
            </Space>
        </Typography>
    )
}

export default ChartTracer