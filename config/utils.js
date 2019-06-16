const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./index');

exports.resolve = function resolve(dir) {
  return path.join(__dirname, '..', dir);
};

// 设置静态文件的公共路径，用于修改src属性的值（通常用于某个loader的options）
exports.assetsPath = function assetsPath(_path) {
  // 根据不同的环境到对公共路径进行配置并与传入的文件名称进行合并
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

// css加载器的相关配置
exports.cssLoaders = function cssLoaders(option) {
  const options = option || {};
  const cssLoader = {
    loader: 'css-loader',
    options: {
      // 根据不同的环境配置是否要对css文件进行压缩
      minimize: process.env.NODE_ENV === 'production',
      // 根据传入的配置决定是否生成sourceMap用于调试bug
      sourceMap: options.sourceMap
    }
  };
  // 定义名为"generateLoaders"的函数用于配置css或css预处理器文件
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader];
    // 如果有css预处理器文件（如less、sass、stylus等）
    if (loader) {
      loaders.push({
        // 使用该预处理器对应的加载器
        loader: `${loader}-loader`,
        // 创建一个空对象，将css加载器初始配置与该预处理器的特殊配置进行合并
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }
    // 是否将入口文件（main.js）中引入的css文件一起打包进该文件的css中
    // 根据传入的options.extract的值进行判断（一般在生产环境中会去单独打包）
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      });
    }
    return ['vue-style-loader'].concat(loaders);
  }
  // return
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
};
// {
//   loaders: {
//     css: [ 'vue-style-loader',
//       {
//         loader: 'css-loader',
//         options:
//         { minimize: false, sourceMap: 'cheap-module-eval-source-map' }
//       }
//     ],
//     postcss: [ 'vue-style-loader',
//       {
//         loader: 'css-loader',
//         options:
//         { minimize: false, sourceMap: 'cheap-module-eval-source-map' }
//       }
//     ],
//     less: [ 'vue-style-loader',
//       {
//         loader: 'css-loader',
//         options:
//         { minimize: false, sourceMap: 'cheap-module-eval-source-map' }
//       },
//       {
//         loader: 'less-loader',
//         options: { sourceMap: 'cheap-module-eval-source-map' }
//       }
//     ];
//     sass: [ 'vue-style-loader',
//       {
//         loader: 'css-loader',
//         options:
//         {
//           minimize: false,
//           sourceMap: 'cheap-module-eval-source-map'
//         }
//       },
//       {
//         loader: 'sass-loader',
//         options:
//         {
//           indentedSyntax: true,
//           sourceMap: 'cheap-module-eval-source-map'
//         }
//       }
//     ],
//     scss:[ 'vue-style-loader',
//       {
//         loader: 'css-loader',
//         options:
//         { minimize: false, sourceMap: 'cheap-module-eval-source-map' }
//       },
//       {
//         loader: 'sass-loader',
//         options: { sourceMap: 'cheap-module-eval-source-map' }
//       }
//     ],
//     stylus: [ 'vue-style-loader',
//       {
//         loader: 'css-loader',
//         options:
//         { minimize: false, sourceMap: 'cheap-module-eval-source-map' }
//       },
//       {
//         loader: 'stylus-loader',
//         options: { sourceMap: 'cheap-module-eval-source-map' }
//       }
//     ],
//     styl: [ 'vue-style-loader',
//       {
//         loader: 'css-loader',
//         options:
//         { minimize: false, sourceMap: 'cheap-module-eval-source-map' }
//       },
//       {
//         loader: 'stylus-loader',
//         options: { sourceMap: 'cheap-module-eval-source-map' }
//       }
//     ],
//   }
// }
// 对.vue文件之外的css文件或css预处理器文件进行处理
exports.styleLoaders = function styleLoaders(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  // 循环cssLoaders返回出来的所有文件类型
  Object.keys(loaders).forEach((extension) => {
    const loader = loaders[extension];
      // 对每一个文件类型用其相对应的加载器进行处理
      output.push({
        test: new RegExp(`\\.${extension}$`),
        use: loader
      });
  });
  return output;
};
