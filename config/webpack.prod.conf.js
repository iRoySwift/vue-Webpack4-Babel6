const merge = require('webpack-merge');

// 基础配置
const config = require('./webpack.base.conf.js');
// prd配置
const { build } = require('./index');

// 导出合并配置
module.exports = merge(config, build);
