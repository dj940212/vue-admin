<template>
  <div id="app">
    <v-header></v-header>
    <!-- <breadcrumb></breadcrumb> -->
    <div class="sidebarWrapper" >
        <sidebar></sidebar>
    </div>
    <div class="routerView" id="routerView">
        <router-view></router-view>
    </div>
    <router-view class="login" name="login"></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
import sidebar from './components/sidebar/sidebar'
import breadcrumb from './components/breadcrumb/breadcrumb'
export default {
  name: 'app',
  components:{
      "vHeader":header,
      sidebar,
      breadcrumb
  },
}
</script>

<style lang="less">
@import "common/less/index.less";

#app {
    position: relative;
    // width: 100%;
    // height: 100%;
    .routerView{
        position: absolute;
        display: inline-block;
        top: 64px;
        left: 180px;
        background-color: #f2f2f2;
        overflow-y:scroll;

    }
    .login{
        
    }
}
</style>
