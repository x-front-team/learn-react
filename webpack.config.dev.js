var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'   // 设置路径为根目录，默认访问生成的模板html
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'templates/template.html'),
      title: 'Input Your Title Here',
      filename: 'index.html'
    })
  ],
  resolve: {
    alias: {
      "component": __dirname + '/src/components/'
    },
    modulesDirectories: ["node_modules", "modules"],
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx|\.js$/,
        loaders: ['babel'],
        exclude: path.join(__dirname, 'node_modules')
      }
    ]
  }
};
