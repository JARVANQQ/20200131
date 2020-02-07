/*入口文件*/
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router/index'
import store from './store'

import './mock/mockServer'

import {Button} from 'mint-ui'
//注册全局组件
Vue.component(Button.name, Button)

import loading from './common/images/loding.gif'
Vue.use(VueLazyload, {
  // error: 'dist/error.png',
  loading
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

