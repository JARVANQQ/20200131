/*
* 包含多个基于state的getters计算性的对象
*/
export default {
  totalCount (state) {
    return state.shopCart.reduce((previousValue, food) => previousValue + food.count,0)
  },
  totalPrice (state) {
    return state.shopCart.reduce((previousValue, food) => previousValue + food.count * food.price,0)
  }
}
