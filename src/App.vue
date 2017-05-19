<template>
  <div id="app">
    <v-header></v-header>
    <div class="sidebarBox" id="sidebarBox">
      <sidebar></sidebar>
    </div>
    <div class="routerView" id="routerView">
        <router-view></router-view>
    </div>
    <router-view class="myloginView" name="mylogin"></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
import sidebar from './components/sidebar/sidebar'
import breadcrumb from './components/breadcrumb/breadcrumb'
export default {
  name: 'app',
  //进入页面时
  created: function(){
      this.checkLogin();
  },
  mounted:function(){

  },
  //监听路由变化
  watch:{
      '$route':'checkLogin'
  },
  components:{
      "vHeader":header,
      sidebar,
      breadcrumb
  },
  methods:{
      setCookie: function(c_name, value, expiredays){
        var exdate = new Date();　　　　
        exdate.setDate(exdate.getDate() + expiredays);　　　　
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
      },
      getCookie:function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return (arr[2]);
        else
          return false;
      },
      checkLogin:function(){
        //检查是否存在session
        console.log(this.getCookie('session'))
        if(!this.getCookie('session')){
          this.$router.push('/login');
          console.log("-> login")
        }else{
          // this.$router.push('/mapsearch');
          console.log("-> mapsearch")
        }
      },
      checkRouteChange:function(){
        if(!this.getCookie('session')){
          this.$router.push('/login');
          console.log("-> login")
        }else {
          return
        }
      },
  }
}
</script>

<style lang="less">
@import "common/less/index.less";

#app {
    position: relative;
    // @sideWidth 180px;
    .routerView{
        float: left;
        display: inline-block;
        margin-top: 50px;
        background-color: #f2f2f2;
        overflow:auto;
        // z-index: 2000;
        // width: 60%;
    }
}
</style>
