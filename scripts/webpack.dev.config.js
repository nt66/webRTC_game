const path = require('path');
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

// console.log(resolve('../dist'))

const webpackConfigDev = {
  mode: 'development',

  entry: {
    app: [resolve('../client/App.tsx')],
  },

  output: {
    path: resolve('../dist'), 
    filename: 'index.js',
  },

  devtool: 'cheap-module-eval-source-map',  // 资源地图 

  devServer: {
    contentBase: resolve('../dist'), 
    hot: true,
    open: true,   
    host: 'localhost',
    port: 3000,
  },

  plugins: [
    new HtmlWebpackPlugin({template: './client/public/index.html', }),
    new webpack.NamedModulesPlugin(),  
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
