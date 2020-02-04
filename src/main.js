/*入口文件*/
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'

import './mock/mockServer'

import {Button} from 'mint-ui'
//注册全局组件
Vue.component(Button.name, Button)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

