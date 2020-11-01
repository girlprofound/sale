<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{level2}}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'my-bread',
    data(){
        return {
            /* level1: "",
            level2: "" */
        }
    },
    /* 
        1、props 值字符串、数组
        2、props中的值用法和data数据用法一样
        3、props中的数据的值来源于使用组件时传来的值
        4、props中的数据也是该组件的属性  <child-a :msg="adb">
    */ 
    props:['level1','level2']
}

</script>
<style scoped>
</style>