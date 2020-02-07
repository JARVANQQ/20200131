/*自定义过滤器*/
import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('date-format', function (value, formatStr='yyyy-LL-dd kk:mm:ss') {
  return format(value, formatStr)
})
