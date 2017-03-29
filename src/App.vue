<template>
  <div id="app">
    <v-header></v-header>
    <img class="logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
export default {
  name: 'app',
  components:{
      "vHeader":header
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  .logo {
      display: block;
      margin: 0 auto;
  }
}
</style>
