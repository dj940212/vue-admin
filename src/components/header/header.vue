<template>
  <div class="header">
      <div class="top-left">
        <div class="text">
          <img class="brand" src="./brand.png" alt="" width="52" height="52">
          <span class="company">郎阳科技</span>
          <span class="title">助动车管理系统</span>
        </div>
      </div>
      <div class="toggleBox">
          <span class="toggle"><i class="icon iconfont">&#xe606;</i></span>
      </div>
      <div class="top-right">
          <div class="rightIcon">
            <div class="button"><span class="text update"><i class="icon iconfont">&#xe642;</i>刷新</span></div>
            <div class="button"><span class="text message"><i class="icon iconfont">&#xe619;</i>消息</span></div>
            <div class="button"><span class="text setting"><i class="icon iconfont">&#xe605;</i>设置</span></div>
            <div class="button"><span class="text out"><i class="icon iconfont">&#xe643;</i>退出</span></div>
          </div>
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
  /*position: fixed;*/
  .top-left {
    display: inline-block;
    width: 240px;
    height:81px;
    color: #fff;
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
    float: right;
    display: inline-block;
    position: relative;
    /*width: 100%;*/
    height: 82px;
      .toggle{
        /*display: inline-block;*/
        color: #fff;
        font-size: 25px;
        position: absolute;
        top:50%;
        margin-top: -12px;
        margin-left: 15px;
      }
      .rightIcon{
        color: #fff;
        float: right;
        .button{
          color: #fff;
          display: inline-block;
          width: 70px;
          height: 82px;
          text-align: center;
          &:hover{
            background-color:#fff;
            color: #03003a;
          }
          .text{
            line-height: 82px;
          }
        }
      }
  }
  .toggleBox{
    position: relative;
    display: inline-block;
    color: #fff;
    margin-bottom: 30px;
    .toggle{
      position: absolute;
      height: 82px;
      top: -20px;
      .icon{
        font-size: 26px;
        margin-left: 20px;
      }

    }

  }
}
</style>
