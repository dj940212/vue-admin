<template>
  <div class="breadcrumb">
      <div class="breadBox">
          <span><i class="icon iconfont">&#xe604;</i>首页</span> &nbsp;/&nbsp;
          <span><i class="icon iconfont">&#xe630;</i>警员信息</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .breadcrumb{
        height: 50px;
        width: 100%;
        background-color: #4e4c75;
        border-left: 1px solid #fff;
        margin-left: 240px;
        position: absolute;
        .breadBox{
            color: #fff;
            font-size: 16px;
            line-height: 50px;
            margin-left: 20px;
            .icon{
                font-size: 20px;
                margin-right: 2px;
            }
        }
    }
</style>
