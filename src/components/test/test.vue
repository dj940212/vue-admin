<template>
    <div class="header">
      <button type="button" name="button" @click="increment">增加</button>

      <div style="margin: 15px;">
        <el-input placeholder="请输入内容" v-model="input5">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="search"></el-button>
        </el-input>
      </div>

      <el-button v-popover:popover5>删除</el-button>
      <div>
      现在数字为: {{count}}
    </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name:'test',
  computed:{
    ...mapGetters([
      'count'
    ])
  },
  methods:{
    ...mapActions([
      'increment'
    ])
  },
  data(){
    return{
      visible2:false,
      input5:"",
      select: ''
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
