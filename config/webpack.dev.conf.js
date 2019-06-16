const webpack = require('webpack');
const merge = require('webpack-merge');
// 友好的错误提示
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const config = require('./webpack.base.conf.js');


const {
  dev: {
    mode,
    devtool,
    devServer: {
      contentBase,
      openPage,
      host,
      port
    }
  }
} = require('./index');

const devConfig = {
  mode,
  devtool,
  // dev单价要单独配置 hash，覆盖 base中配置的chunkhash，不然会与热加载冲突
  output: {
    filename: 'scripts/[name].[hash].js',
    chunkFilename: 'scripts/[id].[hash].js',
  },
  plugins: [
    // dev环境下，开启热加载
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径
    new webpack.NamedModulesPlugin(),
     // 友好的错误提示
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://${host}:${port}`],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors(severity, errors) {
        console.log(severity, errors);
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,

      // add formatters and transformers (see below)
      additionalFormatters: [],
      additionalTransformers: []
    })
  ],

  devServer: {
    contentBase,
    openPage,
    host,
    port,
    open: true, // 自动打开浏览器
    // 我这里没有设置contentBase，个人研究contentBase必须指向存在的bundle.js文件所在目录，
    // 因为这里是开发模式，所以dist目录并不存在，所以用false.
    // publicPath: 'http://www.baidu.com',
    compress: true, // gzip压缩
    // allowedHosts: [
    //   'host.com',
    //   'subdomain.host.com',
    //   'subdomain2.host.com',
    //   'host2.com'
    // ],

    // after: function(app,server) {
    //   console.log(app,server,"after")
    // },
    inline: true, // 会在构建完变化后的代码时通过代理客户端控制网页刷新。
    hot: true, // 热部署
    progress: true,
    // color: true, // 打开npm start 起不来
    watchOptions: {
      aggregateTimeout: 2000, // 浏览器延迟多少秒更新
      poll: 1000// 每秒检查一次变动
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    noInfo: true,
    stats: 'errors-only',
    historyApiFallback: true, // 找不到页面默认跳index.html
    // https: false, // 开启https
    proxy: [
      {
        context: ['**', '!**/*.{js,css,html,png,gif,jpg,jpeg,svg}'],
        // target: 'http://dip.cnsuning.com:80/service/1540881155990/PAAS_V8.0',
        target: 'http://10.47.228.128',
        changeOrigin: true,
      }
    ]
  }
};
// 导出合并配置
module.exports = merge(config, devConfig);
