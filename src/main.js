import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Routers from './router.js';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.config.productionTip = false //是否产生生产信息。flase即不产生

// The routing configuration
const RouterConfig = {
  routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
