import React from "react";
import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;
const Home = () => {
    const code1 = "var solveNQueens = function (n) {\n        const ans = [];\n        const col = new Array(n).fill(0);\n        const onPath = new Array(n).fill(false);\n        const diag1 = new Array(n * 2 - 1).fill(false);\n        const diag2 = new Array(n * 2 - 1).fill(false);\n        function dfs(r) {\n            if (r === n) {\n                ans.push(col.map(c => '.'.repeat(c) + 'Q' + '.'.repeat(n - 1 - c)));\n                return;\n            }\n            for (let c = 0; c < n; c++) {\n                if (!onPath[c] && !diag1[r + c] && !diag2[r - c]) {\n                    col[r] = c;\n                    onPath[c] = diag1[r + c] = diag2[r - c] = true;\n                    dfs(r + 1);\n                    onPath[c] = diag1[r + c] = diag2[r - c] = false; // 恢复现场\n                }\n            }\n        }\n        dfs(0);\n        return ans;\n    };"
    const code2 = "// 导入API {\n  const { Tracer, Array2DTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');\n// }\n\nconst n = 4; // 设置棋盘大小\n// 生成棋盘模型\nconst board = (function createArray(n) {\n  const result = [];\n  for (let i = 0; i < n; i++) {\n    result[i] = Array(...Array(n)).map(Number.prototype.valueOf, 0);\n  }\n  return result;\n}(n));\n\n// 定义渲染器 {\n  const boardTracer = new Array2DTracer('Board');\n  const logger = new LogTracer('Progress');\n  Layout.setRoot(new VerticalLayout([boardTracer, logger]));\n  \n  boardTracer.set(board);\n  logger.println(`N Queens: ${n}X${n}matrix, ${n} queens`);\n  Tracer.delay();\n// }\n\n// ans用数组模拟可视化皇后位置\nconst ans = [];\n// col记录皇后位置，下标为row，值为col\nconst col = new Array(n).fill(0);\n// 记录列条件\nconst onPath = new Array(n).fill(false);\n// 记录斜边条件\nconst diag1 = new Array(n * 2 - 1).fill(false);\nconst diag2 = new Array(n * 2 - 1).fill(false);\n\nfunction dfs(r) {\n// 打印当前操作 {\n  logger.println(`进入下一行遍历，当前是第${r}行`);\n  logger.println('------------------------------------------------------------------');\n// }\n    if (r === n) {\n        ans.push(col.map(c => ' . '.repeat(c) + ' Q ' + ' . '.repeat(n - 1 - c)));\n        // 打印当前操作 {\n          logger.println('所有皇后均已成功放置，继续进行迭代');\n        // }\n        return;\n    }\n    for (let c = 0; c < n; c++) {\n      // 可视化操作（进入尝试放置） {\n            logger.println(`尝试把当前皇后放在${r}行${c}列`);\n            boardTracer.select(r, c);\n            Tracer.delay();\n          // }\n      // 如果条件都满足\n        if (!onPath[c] && !diag1[r + c] && !diag2[r - c]) {\n            col[r] = c;\n            onPath[c] = diag1[r + c] = diag2[r - c] = true;\n            dfs(r + 1);\n          // 可视化操作（如果条件不满足被退回来了） {\n          logger.println(`${r}行${c}列放置失败，回溯`);\n            boardTracer.deselect(r, c);\n            Tracer.delay();\n            \n          // }\n            onPath[c] = diag1[r + c] = diag2[r - c] = false; // 恢复现场\n        }else{\n          // 可视化操作（如果条件不满足被退回来了） {\n          logger.println(`${r}行${c}列放置失败，继续遍历`);\n            boardTracer.deselect(r, c);\n            Tracer.delay();\n            \n          // }\n        }\n    }\n}\n\n// logger {\nlogger.println('开始执行');\n// }\ndfs(0);\n// logger {\nlogger.println('完成，最终皇后如下所示');\nfor(let i = 0;i<ans.length;i++){\n  logger.println(`------第${i+1}种放置方法------`);\n  for(let j = 0;j<ans[i].length;j++){\n    logger.println(ans[i][j]);\n  }\n}\n// }\n"

    return (
        <Typography style={{ padding: '20px', backgroundColor: 'white', height: 'calc(100% - 46px)', overflow: "auto" }}>
            <Title>介绍</Title>
            <Paragraph>
                本平台实现可视化的原理是：在代码中数据结构改变时调用<Text strong>自定义的api</Text>，实现对可视化图像的动态渲染。
            </Paragraph>

            <Title level={2}>举例</Title>
            <Paragraph>
                举个例子，我们需要解决N皇后的问题，以下是<Link href="https://leetcode.cn/problems/n-queens/solutions/2079586/hui-su-tao-lu-miao-sha-nhuang-hou-shi-pi-mljv/">复制自leedcode的题解</Link>。
            </Paragraph>

            <Paragraph>
                <pre>
                    {code1}
                </pre>
            </Paragraph>

            <Paragraph>
                <ul>
                    <li>
                        N皇后需要展示棋盘，所以要用到<Text mark>Array2DTracer</Text>渲染一个二维结构。在可视化过程中，只看棋盘可能不易理解，所以要用到<Text mark>LogTracer</Text>，用于打印日志
                    </li>
                    <li>
                        在可视化操作和打印操作调用后，要使用<Text mark>Tracer</Text>提醒后端，将这些操作执行。达到分步操作的效果。
                    </li>
                    <li>
                        <Text mark>Layout</Text>是整体的根容器。在可视化区域，需要两个位置，一个用于展示棋盘，一个用于展示日志，所以调用<Text mark>VerticalLayout</Text>，引入<Text mark>Array2DTracer</Text>和<Text mark>LogTracer</Text>
                    </li>
                </ul>
            </Paragraph>
            
            <Paragraph>
                <blockquote>对上面的代码进行修改后如下所示</blockquote>
            </Paragraph>

            <Paragraph>
                <pre>
                    {code2}
                </pre>
            </Paragraph>
        </Typography>
    )
}

export default Home