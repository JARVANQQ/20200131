<template>
  <div id="app">
    <div class="content">
      <router-view></router-view>
      <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
  </div>
</template>

<script>
  import FooterGuide from './components/FooteGuide/FooteGuide'
  // import {reqAddress} from './api'//测试
  import {mapActions} from 'vuex'

  export default {

    components:{
      FooterGuide
    },
    methods:{
      ...mapActions(['getAddress', 'getConversationInfo'])
    },
    mounted () {
      // 异 步 获 取 address
      // this.$store.dispatch('getAddress')
      this.getAddress()
      this.getConversationInfo()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    /*background #f5f5f5*/
    /*position relative*/
</style>
