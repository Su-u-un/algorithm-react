import React from "react";
import { Typography, Card, Space } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;
const GraphTracer = () => {
    return (
        <Typography style={{ padding: '20px', backgroundColor: 'white', height: 'calc(100% - 46px)', overflow: "auto" }}>
            <Title>GraphTracer</Title>
            <Title level={3}>构造函数</Title>
            <Card title="constructor" style={{ width: 450 }}>
                <Paragraph>new GraphTracer(title?: <Text italic>undefined | string</Text>): <Text italic>GraphTracer</Text></Paragraph>
                <Paragraph>创建一个tracer</Paragraph>
            </Card>
            <Title level={3}>方法</Title>
            <Space style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Card title="set" style={{ width: 450 }}>
                    <Paragraph>set(array2d?: <Text italic>any[][]</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>设置要可视化的邻接矩阵</Paragraph>
                </Card>
                <Card title="reset" style={{ width: 450 }}>
                    <Paragraph>reset(): <Text italic>void</Text></Paragraph>
                    <Paragraph>重置tracer</Paragraph>
                </Card>
                <Card title="destroy" style={{ width: 450 }}>
                    <Paragraph>destroy(): <Text italic>void</Text></Paragraph>
                    <Paragraph>移除tracer</Paragraph>
                </Card>
                <Card title="addEdge" style={{ width: 450 }}>
                    <Paragraph>addEdge(source: <Text italic>any</Text>, target: <Text italic>any</Text>, weight?: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>添加一条边</Paragraph>
                </Card>
                <Card title="updateEdge" style={{ width: 450 }}>
                    <Paragraph>updateEdge(source: <Text italic>any</Text>, target: <Text italic>any</Text>, weight?: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>更新边</Paragraph>
                </Card>
                <Card title="removeEdge" style={{ width: 450 }}>
                    <Paragraph>removeEdge(source: <Text italic>any</Text>, target: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>移除一条边</Paragraph>
                </Card>
                <Card title="addNode" style={{ width: 450 }}>
                    <Paragraph>addNode(id: <Text italic>any</Text>, weight?: <Text italic>any</Text>, x?: <Text italic>undefined | number</Text>, y?: <Text italic>undefined | number</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>添加一个节点</Paragraph>
                </Card>
                <Card title="updateNode" style={{ width: 450 }}>
                    <Paragraph>updateNode(id: <Text italic>any</Text>, weight?: <Text italic>any</Text>, x?: <Text italic>undefined | number</Text>, y?: <Text italic>undefined | number</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>更新节点</Paragraph>
                </Card>
                <Card title="removeNode" style={{ width: 450 }}>
                    <Paragraph>removeEdge(id: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>移除一个节点</Paragraph>
                </Card>
                <Card title="select" style={{ width: 450 }}>
                    <Paragraph>select(source?: <Text italic>any</Text>, target: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>选择节点</Paragraph>
                </Card>
                <Card title="deselect" style={{ width: 450 }}>
                    <Paragraph>deselect(target: <Text italic>any</Text>,source?: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>取消选择节点</Paragraph>
                </Card>
                <Card title="directed" style={{ width: 450 }}>
                    <Paragraph>directed(isDirected?: <Text italic>undefined | false | true</Text>): <Text italic>this</Text></Paragraph>
                    <Paragraph>使图形有向</Paragraph>
                </Card>
                <Card title="layoutCircle" style={{ width: 450 }}>
                    <Paragraph>layoutCircle(): <Text italic>this</Text></Paragraph>
                    <Paragraph>在圆形布局上排列节点</Paragraph>
                </Card>
                <Card title="layoutRandom" style={{ width: 450 }}>
                    <Paragraph>layoutRandom(): <Text italic>this</Text></Paragraph>
                    <Paragraph>随机排列节点</Paragraph>
                </Card>
                <Card title="layoutTree" style={{ width: 450 }}>
                    <Paragraph>layoutTree(root?: <Text italic>any</Text>, sorted?: <Text italic>undefined | false | true</Text>): <Text italic>this</Text></Paragraph>
                    <Paragraph>在树形布局上排列节点</Paragraph>
                </Card>
                <Card title="leave" style={{ width: 450 }}>
                    <Paragraph>leave(source?: <Text italic>any</Text>, target: <Text italic>any</Text>, weight?: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>访问节点后离开</Paragraph>
                </Card>
                <Card title="log" style={{ width: 450 }}>
                    <Paragraph>log(logTracer?: <Text italic>logTracer</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>同步日志</Paragraph>
                </Card>
                <Card title="visit" style={{ width: 450 }}>
                    <Paragraph>visit(source: <Text italic>any</Text>, target: <Text italic>any</Text>, weight?: <Text italic>any</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>访问节点</Paragraph>
                </Card>
                <Card title="weighted" style={{ width: 450 }}>
                    <Paragraph>weighted(isWeighted?: <Text italic>undefined | false | true</Text>): <Text italic>this</Text></Paragraph>
                    <Paragraph>图表加权</Paragraph>
                </Card>
                <Card title="delay" style={{ width: 450 }}>
                    <Paragraph>delay(lineNumber?: <Text italic>Number</Text>): <Text italic>void</Text></Paragraph>
                    <Paragraph>显示所有tracer的更改</Paragraph>
                </Card>
            </Space>
        </Typography>
    )
}

export default GraphTracer