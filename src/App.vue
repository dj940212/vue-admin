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
      getCookie(c_name) {
          if (document.cookie.length > 0) {
              var c_start = document.cookie.indexOf(c_name + "=")
              if (c_start != -1) {
                  c_start = c_start + c_name.length + 1
                  var c_end = document.cookie.indexOf(";", c_start)
                  if (c_end == -1) c_end = document.cookie.length
                  return unescape(document.cookie.substring(c_start, c_end))
              }
          }
          return ""
      },
      checkLogin:function(){
        //检查是否存在session
        console.log(this.getCookie('session'))
        if(this.getCookie('session')!=null && this.getCookie('session')!=""){                                     //this.getCookie('session')!=null && this.getCookie('session')!=""
          console.log("-> mapsearch")
        }else{
          this.$router.push('/');
          console.log("djdjdj","-> login")
        }
      },
  }
}
</script>

<style lang="less">
@import "common/less/index.less";

#app {
    position: relative;
    .routerView{
        float: left;
        display: inline-block;
        background-color: #f2f2f2;
        overflow:auto;
    }
}
</style>
