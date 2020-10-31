// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import moment from 'moment'
//elementUI的样式引入
import 'element-ui/lib/theme-chalk/index.css'
//自定义的插件名字可以和导出的名字不一样
import MyHttpServer from '@/plugins/http.js'
import '@/assets/css/reset.css'
import router from './router'

Vue.config.productionTip = false

//引入elementUI
Vue.use(ElementUI);

//引入axios插件
Vue.use(MyHttpServer);

//全局过滤器 处理日期格式
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
