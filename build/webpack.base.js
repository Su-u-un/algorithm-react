const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:path.join(__dirname,"../src/index.tsx"),
    output:{
        filename:'bundle.js', // 每个输出js的名称
        path:path.join(__dirname,"../dist"), // 打包结果输出路径
    },
    module:{
        rules:[
            {
                test: /.(ts|tsx)$/,
                use:'babel-loader'
            },
            {
                test: /.(css|less)$/, //匹配 css less文件
                use: ['style-loader','css-loader','less-loader']
              }
        ]
    },
    resolve:{
        extensions:['.js','.tsx','.ts']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        })
    ]
}