/*路由器模块*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from '../views/Msite/MSite'
import Order from '../views/Order/Order'
import Profile from '../views/Profile/Profile'
import Search from '../views/Search/Search'
import Login from '../views/Login/Login'

import Shop from '../views/Shop/Shop'
import ShopGoods from '../views/Shop/ShopGoods/ShopGoods'
import ShopInfo from '../views/Shop/ShopInfo/ShopInfo'
import ShopRatings from '../views/Shop/ShopRatings/ShopRatings'

Vue.use(VueRouter)

export default new VueRouter({
  // mode:'history',
  routes:[
    {
      path: '/msite',
      component: MSite,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})
