const { alias } = require('./config/alias');

module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  parserOptions: {
    // 设置 script(默认) 或 module，如果代码是在ECMASCRIPT中的模块
    sourceType: 'module',
    //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    parser: 'babel-eslint',
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.jsx'],
      },
      webpack: {
        config: {
          resolve: {
            alias,
          },
        },
      },
    },
  },
  rules: {
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    'linebreak-style': ['error', 'windows'],
    'max-len': [1, 200],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    indent: 'off',
    'no-debugger': 0,
    'no-console': 'off',
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 1,
      },
    ],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    // 在结束括号之前禁止换行。
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }]
  },
};
