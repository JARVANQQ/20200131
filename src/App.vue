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
  import {reqFoodCategorys} from './api'

  export default {

    components:{
      FooterGuide
    },
    async mounted () {
      const result = await reqFoodCategorys()
      console.log(result)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
