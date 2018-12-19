const Merge = require('webpack-merge')
const BaseConfig = require('./webpack.base')

module.exports = Merge(BaseConfig, {
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader'
            // options: {
            //   sourceMap: process.env.NODE_ENV === 'development'
            // }
          }
        ]
      }
    ]
  },
  devServer: {
    open: true,
    compress: true,
    port: 9000,
    disableHostCheck: true,
    contentBase: './src',
    publicPath: '/'
  }
})
