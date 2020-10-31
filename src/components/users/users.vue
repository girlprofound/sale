<template>
  <el-card class="box-card">
      <!-- 1、面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

      <!-- 2、搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input 
        placeholder="请输入内容" 
        v-model="query" 
        class="inputSearch">
            <el-button slot="append" icon="el-icon-search"></el-button>
         </el-input>
         <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
      </el-col>
    </el-row>
      <!-- 3、表格 -->
    <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <!-- 如果单元格内显示的内容不是字符串格式（文本）需要给被显示的内容外层包裹一个template-->
        <!-- template内部要是有数据，设置slot-scope属性  该属性的值要用create_time的数据源userlist-->
        <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist  userlist.row -> 数组中的每个对象-->
        <template slot-scope="userlist">
          {{userlis.row.tcreate_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini"  plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button  size="mini"  plain type="success" icon="el-icon-check" circle></el-button>
          <el-button size="mini"  plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
      <!-- 4、分页 -->
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisibleadd">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.mobile	" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>

  </el-card>
</template>

<script>
export default {
    data(){
        return {
            query: '',
            //表格绑定数据
            userlist: [],
            //分页相关数据
            total: -1,
            pagenum: 1,
            pagesize: 2,
            //添加对话框属性
            dialogFormVisibleadd:false,
            //添加用户的表单数据
            form: {
              username:'',
              password:'',	
              email:'',	
              mobile:''
            }
        }
        
    },
    //created也可以请求数据
    created() {
        this.getUserList()
    },
    methods: {
        //添加用户 添加功能发送请求
        async AddUser() {
          //2、关闭对话框
          dialogFormVisibleadd:false
          //发送请求
          const res = await this.$http.post('users',this.form)
          console.log(res)
          const {meta:{status,msg},data} = res.data
          if(status === 201){
            //1、提示成功
            this.$massage.success(msg)
            //3、更新视图
            this.getUserList()
            //4、清空文本框
            this.form = {}
          }else{
            this.$massage.error(msg)
          }
        },
        //添加用户 显示对话框
        showAddUserDia() {
          this.dialogFormVisibleadd = true
        },
        //分页相关的代码
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        //获取用户列表的请求
        async getUserList(){
           /*  
            query	查询参数	可以为空
            pagenum	当前页码	不能为空
            pagesize	每页显示条数
         */
            //需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
            const AUTH_TOKEN = localStorage.getItem('token')
            console.log(AUTH_TOKEN)
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;

            const res = await this.$http.get('users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}')
            console.log(res)
            const {meta:{status,msg},data:{users,total}} = res.data
            if(status===200){
              //1、给表哥数据赋值
              this.userlist = users
              //2、给total赋值
              this.total = total
              //3、提示
              this.$massage.success(msg)

            }else{
              //提示
              this.$massage.warnind(msg)
            }

        }
    }
}

</script>
<style scoped>
.box-card{
    height: 100%;
}
.inputSearch{
    width: 300px;
}
.searchRow{
    margin-top: 20px;
}
</style>