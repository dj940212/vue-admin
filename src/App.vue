<template>
  <div id="app">
    <router-view class="myloginView" name="mylogin"></router-view>
    <v-header></v-header>
    <div class="sidebarBox" id="sidebarBox">
      <sidebar></sidebar>
    </div>
    <div class="routerView" id="routerView">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import header from './components/header/header'
import sidebar from './components/sidebar/sidebar'
export default {
  name: 'app',
  //进入页面时
  created: function(){
      // this.checkLogin();
      this.localCheckLogin();
  },
  mounted:function(){

  },
  //监听路由变化
  watch:{
      '$route':'localCheckLogin'
  },
  components:{
      "vHeader":header,
      sidebar
  },
  methods:{
      localCheckLogin:function(){
        if (sessionStorage.getItem("langyang_telephone")&&sessionStorage.getItem("langyang_password")) {
          console.log("存在local信息")
        }else {
          this.$router.push('/');
          console.log("没有lcoal信息")
        }
      }
  }
}
</script>

<style lang="less">
@import "common/less/index.less";

#app {
    position: relative;
    font-family: "微软雅黑";
    // @sideWidth 180px;
    .routerView{
        float: left;
        display: inline-block;
        // margin-top: 50px;
        background-color: #f2f2f2;
        overflow:auto;
        // z-index: 2000;
        // width: 60%;
    }
}
</style>
