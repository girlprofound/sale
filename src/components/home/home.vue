<template>
  <el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <img src="../../assets/login.jpg" alt="无法显示图片" >
                </div>
            </el-col>
            <el-col :span="18" class="middle"> 
                <h3>电商管理后台系统</h3>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <a class="loginout" @click.prevent="handleSignout()" href="#">退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
            :unique-opened="true"
            :router="true">
            <!-- 1 -->
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                </template> 
                <el-menu-item index="users">
                    <i class="el-icon-location"></i>
                    <span>用户列表</span>
                </el-menu-item>  
            </el-submenu>
            <!-- 2 -->
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                </template> 
                <el-menu-item index="role">
                    <i class="el-icon-location"></i>
                    <span>角色列表</span>
                </el-menu-item>  
                <el-menu-item index="rights">
                    <i class="el-icon-location"></i>
                    <span>权限列表</span>
                </el-menu-item> 
            </el-submenu>
            <!-- 3 -->
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品管理</span>
                </template> 
                <el-menu-item index="1-4-1">
                    <i class="el-icon-location"></i>
                    <span>分类参数</span>
                </el-menu-item>  
                <el-menu-item index="1-4-1">
                    <i class="el-icon-location"></i>
                    <span>商品分类</span>
                </el-menu-item> 
            </el-submenu>
            <!-- 4 -->
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>订单管理</span>
                </template> 
                <el-menu-item index="1-4-1">
                    <i class="el-icon-check"></i>
                    <span>订单列表</span>
                </el-menu-item>  
            </el-submenu>
            <!-- 5 -->
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据统计</span>
                </template> 
                <el-menu-item index="reports">
                    <i class="el-icon-location"></i>
                    <span>数据报表</span>
                </el-menu-item>  
            </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //获取token
  beforeCreate(){
    const token = localStorage.getItem('token')
    if(!token) {     
      //token 没有 -> 登录
      this.$router.push({name:'login'})
    }
      //if token 有 -> 继续渲染组件
  },
  methods: {
    handleSignout() {
      //1、清楚token
      localStorage.clear()
      //2、提示
      this.$message.success('退出成功')
      //来的Login组件
      this.$router.push({name:'login'})
    }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.header .bg-purple img{
  padding-top: 5px;
  width:100px;
  height:50px;
}
.aside {
  background-color: #d3dcd3;
}
.main {
  background-color: #e9eefe;
}
/* 头部样式 */
.middle{
   text-align: center;
}
.loginout{
    line-height: 60px;
    text-decoration: none;
}
</style>