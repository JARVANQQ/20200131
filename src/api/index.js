/*
* 包含n个接口请求函数模块
* 函数的返回值：promise对象
* */

import ajax from './ajax'

const REQ_HEADER = '/api'

//1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${REQ_HEADER}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(REQ_HEADER+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(REQ_HEADER+'/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = ({geohash, keyword}) => ajax(REQ_HEADER+'/search_shops', {geohash, keyword})
// 5、获取一次性验证码
// 6、用户名密码登陆
export const reqUserLogin = ({name, pwd, captcha}) => ajax(REQ_HEADER+'/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSmsCode = (phone) => ajax(REQ_HEADER+'/sendcode', {phone})
// 8、手机号验证码登陆
export const reqPhoneLogin = ({phone, code}) => ajax(REQ_HEADER+'/login_sms', {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqConversationInfo = () => ajax(REQ_HEADER+'/userinfo')
// 10、用户登出
export const reqUserLogOut = () => ajax(REQ_HEADER+'/logout')


/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')
/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')
/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

