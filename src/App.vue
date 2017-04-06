<template>
  <div id="app">
    <v-header></v-header>
    <breadcrumb></breadcrumb>
    <div class="sidebarWrapper" >
        <sidebar></sidebar>
    </div>
    <div class="routerView" ref="routerView" id="routerView">
        <router-view></router-view>
    </div>
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
  // mounted:function () {
  //     console.log(this.$refs.routerView);
  //     console.log(document.body.clientHeight);
  //     this.$refs.routerView.style.width = (window.innerWidth-180)+"px";
  //     this.$refs.routerView.style.height = (window.innerHeight-116)+"px";
  //
  // }
}
// this.changeHeiWid()
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
        top: 114px;
        left: 180px;
        background-color: #f2f2f2;
        overflow-x:hidden;

    }
}
</style>
