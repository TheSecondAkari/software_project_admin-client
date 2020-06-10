import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Routers from './router.js';
// import ViewUI from 'view-design';
import axios from 'axios'
import 'view-design/dist/styles/iview.css';
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {
  Layout, Header, Sider, Content, Button, Table, Icon, Row, Col, Menu, MenuItem, Tabs, TabPane, Page, Input, RadioGroup, Radio, Select, Option, Cascader, Upload, Divider, Form, FormItem, Message, Notice, Modal, Drawer
} from 'view-design';
Vue.component("Header", Header);
Vue.component("Content", Content);
Vue.component("Sider", Sider);
Vue.component('Layout', Layout);
Vue.component('Button', Button);
Vue.component('i-Button', Button);
Vue.component('Table', Table);
Vue.component('i-table', Table);
Vue.component('Icon', Icon);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('i-Col', Col);
Vue.component('i-col', Col);
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('Tabs', Tabs);
Vue.component('TabPane', TabPane);
Vue.component('Page', Page);
Vue.component('Input', Input);
Vue.component('i-Input', Input);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Radio', Radio);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Cascader', Cascader);
Vue.component('Upload', Upload);
Vue.component('Divider', Divider);
Vue.component('i-Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Modal', Modal);
Vue.component('Drawer', Drawer);

Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;

Vue.prototype.$axios = axios
Vue.use(VueRouter);
// Vue.use(ViewUI);
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
