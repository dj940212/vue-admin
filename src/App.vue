<template>
  <div id="app">
    <v-header></v-header>
    <breadcrumb></breadcrumb>
    <div class="sidebarWrapper">
        <sidebar></sidebar>
    </div>
    <router-view></router-view>
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
  }
}
</script>

<style lang="less">
@import "common/less/index.less";

#app {
  .sidebarWrapper{
    //   margin-top: 82px;

  }
}
</style>
