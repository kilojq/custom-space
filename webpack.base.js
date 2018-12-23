const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')
const config = require('./config')
const assetsPublicPath = config[process.env.NODE_ENV].assetsPublicPath

module.exports = {
  entry: {
    'main': './src/App.js'
  },
  output: {
    filename: 'js/[name].[hash:5].js',
    chunkFilename: '[name].[hash:5].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     fallback: 'file-loader',
      //     name: 'img/[name].[hash:7].[ext]'
      //     // publicPath: process.env.NODE_ENV === 'development' ? '/' : ASSETS_BASE_URL
      //   }
      // },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10,
            name: 'img/[name].[ext]'
          }
        }]
      },
      {
        test: /\.mp3(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'media/[name]_[hash:8].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new VConsolePlugin({
      filter: [], // 需要过滤的入口文件
      enable: process.env.NODE_ENV  === 'development'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['main'],
      minify: process.env.NODE_ENV === 'development' ? false : {
        removeAttributeQuotes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyJS: true
      }
    })
  ]
}
