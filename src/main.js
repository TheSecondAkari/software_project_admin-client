import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Routers from './router.js';
import ViewUI from 'view-design';
import axios from 'axios'
import 'view-design/dist/styles/iview.css';
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.prototype.$axios = axios
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(VueQuillEditor)
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
