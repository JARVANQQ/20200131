/*
* 直接跟新state的多个方法的对象
*/
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_SEARCH,
  RECEIVE_USER_INFO,
  RECEIVE_USER_LOGOUT,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREASE_COUNT,
  REMOVE_COUNT,
  CLEAR_SHOP_CART
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_SEARCH] (state, {search}) {
    state.search = search
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RECEIVE_USER_LOGOUT] (state) {
    state.userInfo = ''
  },

  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  //增加count
  [INCREASE_COUNT] (state, {food}) {
    if (!food.count) {
      // food.count = 1

      Vue.set(food, 'count', 1)
      state.shopCart.push(food)
    }else {
      food.count++
    }
  },
  //减少count
  [REMOVE_COUNT] (state, {food}) {
    if (food.count) {
      food.count--
      if (food.count===0) {
        state.shopCart.splice(state.shopCart.indexOf(food), 1)
      }
    }
  },

  //清空购物车
  [CLEAR_SHOP_CART] (state) {
    state.shopCart.forEach((food, index) => {
      food.count = 0
    })
    state.shopCart = []
  }
}
