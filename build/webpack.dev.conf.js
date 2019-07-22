'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

/*----------------jsonServer获取数据源---------*/
/*引入json-server*/
const jsonServer = require('json-server')
/*搭建一个server*/
const apiServer = jsonServer.create()
/*将db.json关联到server*/
const apiRouter = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
apiServer.use(middlewares)
apiServer.use('/api/',apiRouter)
/*监听端口*/
apiServer.listen(config.dev.port + 1, () => {
  console.log('JSON Server is running')
})

/*----------------express获取数据源---------*/
const express = require('express')
const apiExpressServer=express()
//启动新组件，返回json数据
const bodyParser = require('body-parser')
apiExpressServer.use(bodyParser.urlencoded({extended:true}))
apiExpressServer.use(bodyParser.json())
const apiExpressRouter = express.Router()
const fs = require('fs')
apiExpressRouter.get('/',function(req,res){
  res.json({
    message:'欢迎使用express进入api！'
  })
})
apiExpressRouter.route('/:apiName')
.all(function(req,res){
  /*通过node的fs读取json数据*/
  fs.readFile('./db.json','utf8',function(err,data){
    if(err) throw err
    /*将data强行转换为json对象来取得当前访问url的端口名*/
    const jsondata = JSON.parse(data)
    if(jsondata[req.params.apiName]){
      res.json(jsondata[req.params.apiName])
    }
    else{
      res.send('找不到api的名称！')
    }
  })
})
//根目录的api
apiExpressServer.use('/api',apiExpressRouter)
/*监听端口*/
apiExpressServer.listen(config.dev.port + 2, () => {
  console.log('JSON Server is running')
})

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
