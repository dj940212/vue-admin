<template>
    <div class="header">
      <button type="button" name="button" @click="increment">增加</button>
      <div>
      现在数字为: {{count}}
    </div>
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name:'test',
  computed:{
    ...mapGetters([
      'count'
    ])
  },
  methods:{
    ...mapActions([
      'increment'
    ])
  }
}
</script>

<style lang="less" scoped>

</style>
