// 打包html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 使用vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 请求清除文件的插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 复制静态资源到dist中
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 提取 CSS 到单个文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 工具类
const { resolve } = require('./utils');
// 别名
const { alias } = require('./alias');
// vue-loader
const VueLoader = require('./vue-loader.config');

// 配置
const {
  base: { path, publicPath }
} = require('./index');

const baseConfig = {
  // 入口文件，用绝对路径，保证我们不因为路径发生错误
  // path.join(__dirname, 'src/index.js')中__dirname表示当前文件的路径，path.join就是将当前文件的路径跟'src/index.js'拼接起来，形成一个绝对路径
  entry: {
    app: resolve('src/app.js'), // 入口js
    vendor: [
      'vue', 'vuex',
      'vue-router',
      'vuex-router-sync',
      'axios'
    ]
  },
  output: { // 打包输出目录
    path, // 打包输出路径 resolve('dist/spcp-web/virt')
    publicPath, // 通过devServer访问路径   '/spcp-web/virt/'
    filename: 'scripts/[name].[chunkhash].js', // 打包输出文件名字 name对应 entry 里面的 app
    chunkFilename: 'scripts/[id].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/, // 排查node_modules
        options: VueLoader
        // options: {
        //   // extractCSS: true // 提交.vue文件中的style作为单个css文件
        //   // css: ExtractTextPlugin.extract({
        //   //   use: 'css-loader',
        //   //   fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
        //   // })
        // }
      },
      // {
      //   test: /\.css$/,
      //   loader: 'vue-style-loader!css-loader',
      //   options: {
      //     module: true, // 开启css模块化
      //     localIdentName: '[path]-[name]-[local]_[hash:base64:6]' // className名称
      //   },
      //   // exclude: /node_modules/
      //   exclude: [
      //     resolve('node_module')
      //   ]
      // },
      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.(s)?css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/, // 排查node_modules
        options: {
          presets: ['env'] // 作为参数传入 babel-loader,babel-loader会根据不同浏览器，自动编译成es5或es6
        }
      }, {
        test: /\.(jpg|gif|png|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192, // 200kb    图片小于 200kbd 的，图片变成 base64 编码的 date url
          name: 'static/img/[name][hash:8].[ext]' // img 存储位置
        }
      }, {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'static/fonts/[name]_[hash:8].[ext]' // 修改生成字体文件的名称
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // 让webpack认识vue
    new HtmlWebpackPlugin({
      filename: 'index.html', // html文件名
      template: resolve('src/index.html'),
      inject: true, // 是否引用打包好的js
      minify: {
        collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
        removeComments: true // 去注释
      },
    }),
    new CleanWebpackPlugin(), // 自动删除文件
    // 复制静态资源到dist中
    new CopyWebpackPlugin([
      {
        from: resolve('static/**/*'),
        to: path,
      },
    ]),
    new ExtractTextPlugin('style/style.css')
  ],
  // 默认NPM包导出的是运行时构建。为了使用独立构建，
  // 在webpack配置中添加下面的别名
  resolve: {
    // extensions可以免去导入文件的后缀，例如： import vue from ‘vue.js’ 改成 import vue from ‘vue’
    // alias可重新配置模块路径，可以省去很长的写法。
    extensions: ['.js', '.vue', '.json'],
    alias
  }
};
module.exports = baseConfig;
