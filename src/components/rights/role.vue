<template>
  <el-card>
      <!-- 1、面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!-- 2、按钮 -->
    <el-row class="addclebtn">
      <el-col>
        <el-button type="primary">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 3、表格 -->
    <el-table
      :data="rolelist"
      style="width: 100%">
        <!-- 展开表格 -->
      <el-table-column
        type="expand"
        width="50">
        <template slot-scope="scope">
            <el-row v-for="(item1,i) in scope.row.children" :key="i">

                <el-col :span="4">
                    <!-- 传角色id 和 权限id -->
                    <el-tag @close="deleRight(scope.row.id,item1.id)" closable type="succes">{{item1.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                </el-col>

                <el-col :span="20">
                    <el-row v-for="(item2,i) in scope.row.children" :key="i">
                        <el-col :span="4">
                            <el-tag @close="deleRight(scope.row.id,item2.id)" closable type="info">{{item2.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="4">
                            <el-tag @close="deleRight(scope.row.id,item3.id)" closable type="warning" v-for="(item3,i) in scope.row.children" :key="i">{{item3.authName}}</el-tag>
                        </el-col>
                    </el-row>
                </el-col>

            </el-row>
            <!-- 无权限显示 -->
            <span v-if="scope.row.children.length===0">未分配权限</span>
        </template>
      </el-table-column>

      <el-table-column
        type="index"
        label="#"
        width="150">
      </el-table-column>

      <el-table-column
        prop="roleDesc"
        label="角色名称"
        width="260">
      </el-table-column>

      <el-table-column
        prop="roleName"
        label="角色描述"
        >
      </el-table-column>

      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini"  plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button  size="mini"  plain type="danger" icon="el-icon-delete" circle></el-button>
          <el-button size="mini"  plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>

    </el-table>
  </el-card>
</template>

<script>
export default {
    data(){
      return {
        rolelist:[]
      }
    },
    created(){
      this.getRolelist()
    },
    methods:{
        //取消权限
        //roles/:roleId/rights/:rightId  
        //roleId 当前角色的ID
        //rightId 要删除的权限id
        async deleRight(roleId,rightId){
            console.log(arguments[1]); 
            const res = await this.$http.delete('roles/${roleId}/rights/${rightId}')
            console.log(res)
        },
      async getRolelist(){
        //除了登录之外的所有请求，都需要设置头部
        const res = await this.$http.get('roles')
        this.rolelist =  res.data.data
      }
    }

}

</script>
<style scoped>
.addclebtn{
    margin-top: 20px;
}
</style>

//布局是行列布局 -> for嵌套

//请在控制台输出以下图形
        *
    *         * 
*       *       *
//for循环