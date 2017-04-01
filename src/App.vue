<template>
  <div id="app">
    <v-header></v-header>
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
import sidebar from './components/sidebar/sidebar'
export default {
  name: 'app',
  components:{
      "vHeader":header,
      sidebar
  }
}
</script>

<style lang="less">
@import "common/less/icon.less";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  .logo {
      display: block;
      margin: 0 auto;
  }
}
</style>
