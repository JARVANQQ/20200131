<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:phone_number_login}" @click="phone_number_login=true">短信登录</a>
          <a href="javascript:;" :class="{on:!phone_number_login}" @click="phone_number_login=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit="login">
          <div :class="{on:phone_number_login}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!right_phone" class="get_verification"
                      :class="{is_black:right_phone}" @click.prevent="get_code">
                {{time>0?`已发送(${time})s`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength ="8" placeholder="验证码" v-model="phone_code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!phone_number_login}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="show_pwds">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                <div class="switch_button" :class="show_pwds?'on':'off'" @click="show_pwds=!show_pwds">
                  <div class="switch_circle" :class="show_pwds?'right':''"></div>
                  <span class="switch_text">{{show_pwds?'123':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                     @click="get_captcha" ref="captchas">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqSmsCode, reqPhoneLogin, reqUserLogin} from '../../api'

  export default {
    data () {
      return{
        phone_number_login:true,//true是短信登录，false是密码登录
        phone:'',//手机号
        phone_code:'',//手机验证码
        name:'',//用户名
        pwd:'',//密码
        captcha:'',//图片验证码
        verification_code:'',
        show_pwds:false,
        enter_get_code:false,
        alertText:'',
        alertShow:false,
        time:0
      }
    },
    methods:{
      go_back () {
        this.$router.back()
      },
      //异步获取短信验证码
      async get_code () {
        //:disabled="{disabled:!right_phone}"
        if (this.enter_get_code) {
          return
        }
        this.enter_get_code = true
        this.time = 10
        //启动倒计时
        const intervalId = setInterval(()=>{
          if (this.time<=0) {
            clearInterval(intervalId)
            this.enter_get_code = false
          }
          this.time--
        },1000)
        //发送ajax请求(获取指定手机短信验证码)
        let result = await reqSmsCode (this.phone)
        if (result.code===1) {
          this.showAlert(result.msg)
        }
      },
      get_captcha () {
        this.$refs.captchas.src = `http://localhost:4000/captcha?time=${Date.now()}`
      },
      showAlert (alertText) {
        this.alertText = alertText
        this.alertShow = true
      },
      //提交表单
      async login () {
        let result = ''
        if (this.phone_number_login) {  //短信登录
          // let {right_phone, alertText, alertShow} =this//测试表明这种方法无法跟新到data中的数据，慎用
          if (!this.right_phone) {
            this.showAlert('请输入正确的手机号码')
            return
            // console.log(this.alertText, this.alertShow)
          }else if (!(/^\d{6}$/).test(this.phone_code)) {
            this.showAlert('验证码必须是6位')
            return
          }
          //发送ajax请求
          let {phone, phone_code} = this
          result = await reqPhoneLogin({phone, phone_code})

        }else { //用户名密码登录
          if (!this.name) {
            this.showAlert('请输入用户名')
            // console.log(this.alertText, this.alertShow)
            return
          }else if (!this.pwd) {
            this.showAlert('密码错误')
            return
          }else if (!this.captcha) {
            this.showAlert('您输的验证码不正确')
            return
          }
          //发送ajax请求
          let {name, pwd, captcha} =  this
          result = await reqUserLogin({name, pwd, captcha})
        }
        if (result.code===0) {//成功
          //将数据保存到state中的userInfo进行管理
          let user = result.data
          // debugger
          // console.log('username:'+this.name)
          this.$store.dispatch('storageUserInfo', user)
          //跳转到个人中心的页面
          this.$router.replace('/profile')
        }else if (result.code===1) {//失败
          this.showAlert(result.msg)
          this.get_captcha()
        }
      },
      closeTip () {
        this.alertText = ''
        this.alertShow = false
      }
    },
    computed:{
      right_phone () {
        return /^1[3456789]\d{9}$/.test(this.phone)
      }
    },
    components: {
      AlertTip
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.is_black
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
