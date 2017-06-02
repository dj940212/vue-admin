<template>
    <div class="header">
      <button type="button" name="button" @click="increment">增加</button>

      <i class="fa fa-camera-retro"></i>
      <i class="icon iconfont">&#xe612;</i>

      <p>现在数字为: {{count}}</p>
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
  .fa-camera-retro{
      font-size: 25px;
  }
</style>
