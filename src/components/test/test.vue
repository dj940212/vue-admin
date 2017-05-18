<template>
    <div class="header">
      <button type="button" name="button" @click="increment">增加</button>

      <el-popover
        ref="popover5"
        placement="top"
        width="160"
        v-model="visible2">
        <el-radio-group>
          <el-radio-button label="未处理"></el-radio-button>
          <el-radio-button label="处理中"></el-radio-button>
          <el-radio-button label="已完成"></el-radio-button>
        </el-radio-group>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
        </div>
      </el-popover>

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
      visible2:false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
