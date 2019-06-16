import Vue from 'vue';
import I18n from 'vue-i18n';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import CN from './locale/zh_CN';
import store from './store/index';
import router from './router/index';

// 使用vuex管理 router状态
// 会在store上注册 `store.state.route`
sync(store, router);

Vue.use(I18n);
const i18n = new I18n({
  locale: CN.locale,
  messages: { [CN.locale]: CN },
});
const app = new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App />'
});

// new Vue({
//   el: "#app",
//   render : (h) => h(App) //h就是vue中的createApp参数
// });
