<template>
  <div id="app">
    <v-header></v-header>
    <div class="sidebarWrapper" >
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
      delCookie:function(name){
          var exp = new Date();
          exp.setTime(exp.getTime() - 1);
          var cval = getCookie(name);
          if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
      },
      checkLogin:function(){
        //检查是否存在session
        console.log(this.getCookie('session'))
        if(!this.getCookie('session')){
          this.$router.push('/mylogin');
          console.log("-> login")
        }else{
          this.$router.push('/mapsearch');
          console.log("-> mapsearch")
        }
      }
  }
}
</script>

<style lang="less">
@import "common/less/index.less";

#app {
    position: relative;
    .routerView{
        position: absolute;
        display: inline-block;
        top: 64px;
        left: 180px;
        background-color: #f2f2f2;
        overflow:auto;
    }
    .myloginView{

    }
}
</style>
