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
  mounted:function(){
    this.openFullScreen()
    console.log("加载",this.$loading({text:"拼命加载中",target:"#routerView",lock:this.fullscreenLoading}))
  },
  computed:{
    ...mapGetters([
      'count'
    ])
  },
  methods:{
    ...mapActions([
      'increment'
    ]),
    openFullScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 3000);
    }
  },
  data(){
    return{
      visible2:false,
      input5:"",
      select: '',
      fullscreenLoading:true
    }
  }
}
</script>

<style lang="less" scoped>
  .fa-camera-retro{
      font-size: 25px;
  }
</style>
