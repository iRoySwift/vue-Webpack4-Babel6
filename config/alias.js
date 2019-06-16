const { resolve } = require('./utils');

module.exports.alias = {
  vue: 'vue/dist/vue.js', // 导入node_modules
  '@': resolve('src'),
  viewsPath: '@/views',
  componentsPath: '@/components',
  routerPath: '@/router'
}