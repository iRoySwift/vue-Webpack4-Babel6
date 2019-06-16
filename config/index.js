const path = require('path');

const extraPath = 'spcp-web/virt'; // spcp-web/virt
const publicPath = '';
// dist
const distRoot = path.resolve(__dirname, '../dist');

module.exports = {
  base: {
    path: path.resolve(distRoot, extraPath), // 打包输出路径 resolve('dist/spcp-web/virt')
    publicPath:
      !publicPath && !extraPath ? '/' : `${publicPath}${extraPath ? '/' : ''}${extraPath}/`, // 通过devServer访问路径  '/spcp-web/virt/'
  },
  build: {
    mode: 'production',
    devtool: 'cheap-module-source-map',
  },
  dev: {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.resolve(distRoot, extraPath, '..'), // resolve('dist/spcp-web')
      openPage: extraPath ? `${extraPath}/index.html` : 'index.html', // 'spcp-web/virt/index.html'
      host: 'localhost',
      port: '8081',
    },
  },
};

// path=> d:\Project\vueWebpackTest\dist\spcp-web\virt
// publicPath=>spcp-web/virt/
// contentBase=> d:\Project\vueWebpackTest\dist\spcp-web
// openPage=>spcp-web/virt/index.html
