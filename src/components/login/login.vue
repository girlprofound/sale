<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handLogin()" class="login-btn" type="primary">
        登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    //登录请求
    async handLogin() {
      /* 
      把异步操作的代码看起来像同步代码
      ES7 async+await
      1、在异步操作有结果的前面加上await函数
      2、在距离该异步操作最近的函数前面加一个async函数
       */
      //把异步操作的代码变成像同步代码
      const res = await this.$http.post("login", this.formdata)
        //console.log(res);
        const {
          //对象结构赋值的写法
          data,
          //意思是：在等号右侧的res.data中找到mate的值
          meta: { msg, status },
        } = res.data;

        //登录成功
        if (status === 200) {
          //1、跳转home
          this.$router.push({ name: "home" });
          //2、提示成功
          this.$message.success(msg);
        } else {
          //不成功
          //1、提示原因
          this.$message.error(msg);
        }

      //异步操作代码
      /*  this.$http.post("login", this.formdata).then((res) => {
        //console.log(res);
        const {
          //对象结构赋值的写法
          data,
          //意思是：在等号右侧的res.data中找到mate的值
          meta: { msg, status },
        } = res.data;

        //解释meta的获取 meta获取的是obj的值，也就是等号右侧{}的值
        //const {meta:obj} = {meta:{msg:"11",status:200}}
        //obj= {msg:"11",status:200}
        // {msg,status} = {msg:"11",status:200}

        //登录成功
        if (status === 200) {
          //1、跳转home
          this.$router.push({ name: 'home' });
          //2、提示成功
          this.$message.success(msg);
        } else {
          //不成功
          //1、提示原因
          this.$message.error(msg);
        }
      }); */
    },
  },
};
</script>
<style >
.login-wrap {
  height: 100%;
  background-color: #324152;
  /* 弹性盒布局 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap h2 {
  text-align: center;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>