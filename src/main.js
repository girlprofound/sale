// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
//MyBread其实是组件选项所在的对象{template:',data ...}
import MyBread from '@/components/cuscom/myBread.vue'
import moment from 'moment'
//elementUI的样式引入
import 'element-ui/lib/theme-chalk/index.css'
//自定义的插件名字可以和导出的名字不一样
import MyHttpServer from '@/plugins/http.js'
import '@/assets/css/reset.css'
import router from './router'
/* import { data } from 'autoprefixer' */

Vue.config.productionTip = false

//引入elementUI
Vue.use(ElementUI);

//引入axios插件
Vue.use(MyHttpServer);

//全局过滤器 处理日期格式
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

//全局自定义组件
Vue.component(MyBread.name,MyBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
