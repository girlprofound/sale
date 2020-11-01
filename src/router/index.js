import Vue from 'vue'
import Router from 'vue-router'
//import Login from '../components/login/login.vue'
//@ - src
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import Reports from '@/components/report/report.vue'

Vue.use(Router)
/* 
路由的步骤
  1、设置链接，修改标识，js编程式导航
  2、容器router-view
  3、启动组件
  4、配置路由
  5、实例化对象
  6、挂载路由
*/
export default new Router({
  routes: [{
      name: 'login',
      path: '/login',
      component: Login
     
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children:[
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'right',
          path: '/rights',
          component: Right
        },
        {
          name: 'role',
          path: '/role',
          component: Role
        },
        {
          name: 'reports',
          path: '/reports',
          component: Reports
        }
      ]
     
    }
  ]
})
