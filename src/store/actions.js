/*
* 通过mutation间接更新state的多个方法的对象
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_SEARCH,
  RECEIVE_USER_INFO,
  RECEIVE_USER_LOGOUT,

  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  INCREASE_COUNT,
  REMOVE_COUNT
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqSearchShop,
  reqConversationInfo,
  reqUserLogOut,

  reqShopInfo,
  reqShopGoods,
  reqShopRatings
} from '../api'

export default {
  // 1.异步获取地址
  async getAddress({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  //2.异步获取食品分类列表
  async getFoodCategorys ({commit}) {
    const result = await reqFoodCategorys()
    commit(RECEIVE_CATEGORYS, {categorys:result.data})
  },
  //3.异步获取商铺列表
  async getShopsList ({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops(latitude, longitude)
    commit(RECEIVE_SHOPS, {shops:result.data})
  },
  //4.异步获取搜索商铺列表
  /*async getSearchShop ({commit, state}) {
    const result = await reqSearchShop(geohash)
    commit(RECEIVE_SEARCH, {search:result.data})
  }*/
  //同步存储用户的信息
  storageUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  //异步根据会话获取用户信息
  async getConversationInfo ({commit}) {
    const result = await reqConversationInfo()
    if (result.code===0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  //异步处理用户登出
  async getUserLogout ({commit}) {
    const result = await reqUserLogOut()
    if (result.code===0) {
      commit(RECEIVE_USER_LOGOUT)
    }
  },


  //异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },
  //异步获取商家商品数组
  async getShopGoods ({commit}) {
    const result = await reqShopGoods()
    if (result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
    }
  },
  //异步获取商家评价数组
  async getShopRatings ({commit}) {
    const result = await reqShopRatings()
    if (result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

  //跟新Food中的Count
  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREASE_COUNT, {food})
    }else {
      commit(REMOVE_COUNT, {food})
    }
  }
}
