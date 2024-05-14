const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry:path.join(__dirname,"../src/main.tsx"),
    output:{
        filename:'[name].[hash:8].js', // 每个输出js的名称
        path:path.join(__dirname,"../dist"), // 打包结果输出路径
    },
    resolve:{
        alias:{
          'src':path.resolve(__dirname,'../src')  
        },
        extensions:['.tsx','.ts','.jsx','.js']
    },
    module:{
        rules:[
            {
                test: /.(ts?)|(tsx?)|(js?)$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:[
                            [
                                '@babel/preset-env',
                                {
                                    targets:'IOS 9,Android 4.4, last 2 versions, >0.2%, not dead',
                                    useBuiltIns:'usage',
                                    corejs:3
                                }
                            ],
                            ['@babel/preset-typescript'],
                            ['@babel/preset-react']
                        ]
                    }
                }
            },
            {
                test: /.(css|less)$/, //匹配 css less文件
                exclude: /node_modules/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
				test: /\.(png|jpe?g|gif|svg|webp)$/i,
                exclude: /node_modules/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    },
                },
                generator: {
                    filename: 'static/imgs/[name].[hash:8][ext]',
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                exclude: /node_modules/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    },
                },
                generator: {
                    filename: 'static/fonts/[name].[hash:8][ext]',
                }
            },
        ]
    },
    
    plugins:[
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        })
    ]
}