<template>
  <div class="header">
      <div class="top-left">
        <div class="text">
          <img class="brand" src="./brand.png" alt="" width="52" height="52">
          <span class="company">郎阳科技</span>
          <span class="title">助动车管理系统</span>
        </div>
      </div>
      <div class="top-right">

      </div>
  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style lang="less" scoped>
.header {
  height: 82px;
  width: 100%;
  background-color: #03003a;
  .top-left {
    display: inline-block;
    width: 240px;
    height:81px;
    color: #fff;
    margin-top: 0;
    border-right: 1px solid #fff;
    .text{
      display: inline-block;
      position: absolute;
      width: 240px;
      height: 82px;

      .title{
        display: block;
        position: absolute;
        left: 90px;
        top: 47px;
      }
      .company{
        display: block;
        position: absolute;
        top: 20px;
        left: 90px;
        font-size: 18px;
      }
      .brand{
        position: absolute;
        top: 50%;
        margin-top: -26px;
        margin-left: 24px;
      }
    }
  }
  .top-right {
    display: inline-block;
    height: 82px;

  }
}
</style>
