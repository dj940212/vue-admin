<template>
  <div class="header">
      <div class="top-left">
        <div class="text">
          <img class="brand" src="./brand.png" alt="" width="38" height="38">
          <span class="company">郎阳科技</span>
          <span class="title">助动车管理系统</span>
        </div>
      </div>
      <span class="toggle"><i class="icon iconfont" v-show="false">&#xe606;</i></span>
      <div class="top-right">
          <div class="rightIcon">
            <el-popover
              ref="popover2"
              placement="bottom"
              title="标题"
              width="200"
              trigger="hover"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            </el-popover>
            <!-- <el-button v-popover:popover2>click 激活</el-button> -->
            <div class="button" @click="reload"><span class="text update"><i class="icon iconfont">&#xe642;</i></span></div>
            <div class="button" v-popover:popover2><span class="text message"><i class="icon iconfont">&#xe619;</i></span></div>
            <div class="button"><span class="text setting"><i class="icon iconfont">&#xe605;</i></span></div>
            <div class="button" @click="logout"><span class="text out"><i class="icon iconfont">&#xe643;</i></span></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    reload:function(){
      location.reload(true)
    },
    logout(){
      //删除cookie并跳到登录页
      // this.isLogouting = true;
      //请求后端，比如logout.php
      // this.$http.post('eaxmple.com/logout.php')...
      //成功后删除cookie
      this.delCookie('session');
      //重置loding状态
      // this.isLogouting = false;
      //跳转到登录页
      this.$router.push('/login');
    },
    delCookie:function(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
          document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    getCookie:function(name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
        return (arr[2]);
      else
        return false;
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  width: 100%;
  background-color: #1f2d3d;
  // border: 1px solid #101010;
  position: fixed;
  z-index: 10;
  // box-shadow: 0px 3px 7px #212037;
  .top-left {
    display: inline-block;
    width: 180px;
    // width: 50px;
    height:50px;
    color: #fff;
    border-right: 1px solid #fff;
    .text{
      display: inline-block;
      position: absolute;
      width: 180px;
      height: 64px;
      letter-spacing: 1px;
      .title{
        display: block;
        position: absolute;
        left: 62px;
        top: 29px;
        font-size: 12px;
      }
      .company{
        display: block;
        position: absolute;
        top: 9px;
        left: 62px;
        font-size: 15px;
      }
      .brand{
        position: absolute;
        top: 50%;
        margin-top: -26px;
        margin-left: 10px;
      }
    }
  }
  .min-top-left {
    width: 50px;
    .text{
      .title{
        display: none;
      }
      .company{
        display: none;
      }
      .brand{
        margin-left: 5px;
      }
    }
  }
  .top-right {
    float: right;
    display: inline-block;
    position: relative;
    /*width: 100%;*/
    height: 64px;
      .toggle{
        color: #fff;
        font-size: 25px;
        float: left;
        margin-left: 15px;
        line-height: 50px;
        margin-bottom: 20px;
      }
      .rightIcon{
        color: #fff;
        float: right;
        margin-right: 20px;
        .button{
          color: #fff;
          display: inline-block;
          width: 40px;
          height: 50px;
          text-align: center;
          cursor: pointer;
          &:hover{
            background-color:#fff;
            color: #03003a;
          }
          .text{
            line-height: 50px;
            // font-size: 50px;
          }
        }
      }
  }
  .toggleBox{
    position: relative;
    display: inline-block;
    color: #fff;
    margin-bottom: 40px;
    .toggle{
      position: absolute;
      display: block;
      height: 64px;
      top: -20px;
      cursor: pointer;
      .icon{
        font-size: 26px;
        margin-left: 20px;
      }

    }

  }
}
</style>
