var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('develop')
      }
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'templates/template.html'),
      title: 'Input Your Title Here',
      filename: 'html/index.html'
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
