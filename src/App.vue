<template>
  <div id="app">
    <top></top>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import top from './components/Top'
export default {
  name: 'app',
  components:{
      top
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
