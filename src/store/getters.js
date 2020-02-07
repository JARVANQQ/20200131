/*
* 包含多个基于state的getters计算性的对象
*/
export default {
  totalCount (state) {
    return state.shopCart.reduce((preTotal, food) => preTotal + food.count, 0)
  },
  totalPrice (state) {
    return state.shopCart.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },
  satisfiedRatings (state) {
    return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType===0?1:0), 0)
  }
}
