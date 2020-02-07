<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <!-- 类名：current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current:index===currentIndex}" @click="jumpFoodList(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="menuItemUl">
          <!--类名：food-list-->
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" :key="index"
                  @click="toggleShowFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}} 份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="showFoods"></Food>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import BScroll from 'better-scroll'

  import CartControl from '../../../components/CartControl/CartControl'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  import Food from '../../../components/Food/Food'
  export default {
    data () {
      return{
        scrollY:0,
        tops:[],
        food: {}
      }
    },
    methods:{
      ...mapActions(['getShopGoods']),
      //获取到实时的scrollY
      _initScrollY () {
        this.foodsScroll.on('scroll', (event) => {
          let scrollY = event.y
          this.scrollY = Math.abs(scrollY)
        })
      },
      //获取到每个li的top值
      _initTops () {
        let tops = []
        let top = 0
        let lis = this.$refs.menuItemUl.children
        tops.push(top)
        //将lis伪数组转为真数组并且遍历
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        this.tops = tops
      },
      //点击menu，右侧跳转到对应的foodList
      jumpFoodList (index) {
        this.scrollY = -this.tops[index]
        this.foodsScroll.scrollTo(0, this.scrollY)
      },
      toggleShowFood (food) {
        this.food = food
        //调用子组件对象的方法
        this.$refs.showFoods.showFood()
      }
    },
    computed:{
      ...mapState(['goods']),
      currentIndex () {
        const scrollY = this.scrollY
        const {tops} = this
        let index = this.tops.findIndex((element, index) => {
          //判断当前的scroll是否在tops[index]~top[index+1],是的话则当前的class为current,返回当前的索引下标
          return scrollY >= tops[index] && scrollY < tops[index+1]
        })
        return index
      }
    },
    mounted () {
      //从后台获取goods数据
      this.getShopGoods()
    },
    watch:{
      goods (newValue) {
        this.$nextTick(() => {
          new BScroll('.menu-wrapper', {
            // ...... 详见配置项
            click:true
          })
          this.foodsScroll = new BScroll('.foods-wrapper', {
            // ...... 详见配置项
            click:true,
            probeType:3
          })
          //获取Tops的值
          this._initTops()
          this._initScrollY()
        })
      }
    },
    components:{
      CartControl,
      ShopCart,
      Food
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
