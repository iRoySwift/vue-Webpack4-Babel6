import Vue from 'vue';
import Router from 'vue-router';

import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

export default new Router({
  mode: 'hash', // 默认hash模式
  // mode: 'history',
  // HTML5 History 模式 还需要后台配置支持
  // https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
  routes: [
    {
      path: '/',
      component: HelloWorld
    }
  ]
});
