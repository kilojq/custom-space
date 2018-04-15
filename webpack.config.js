
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');//每次打包自动清除上次打包输出的文件
module.exports = {
    entry: './src/App.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "App.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                }],
                exclude: [ path.resolve(__dirname, 'node_modules')]
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader' ,
                    'css-loader',
                    'sass-loader'
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'src/common')
                ]
            },
            /* 
             * file-loader:
             *     1. 把你的资源移动到输出目录
             *     2. 返回最终引入资源的 url
             */
            {
                test: /\.mp3(\?.*)?$/,
                use: [ {
                    loader: 'file-loader',
                    options: {
                        name: 'media/[name]_[hash:8].[ext]'
                    }
                } ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [ {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: 'img/[name].[ext]'
                    }
                } ]
            },
        ]
    },
    devServer: {
        open: true,//自动打开浏览器并运行服务器
        port: 9000,//修改端口
        contentBase: './src',
        publicPath: '/',// 服务器打包资源后的输出路径
    }

};