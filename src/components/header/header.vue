<template>
  <div class="header" id="header">
      <!-- <span class="toggle"><i class="icon iconfont" v-show="false">&#xe606;</i></span> -->
      <!-- <i class="el-icon-menu" ></i> -->
      <i class="fa fa-bars" @click="toggleSidebar"></i>
      <!-- <input type="button" value="增加" @click="increment"> -->
      <el-input icon="search" placeholder="在此输入"></el-input>
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
            <div class="button" @click="reload"><span class="text update"><i class="fa fa-refresh" aria-hidden="true"></i></span></div>
            <div class="button" v-popover:popover2><span class="text message"><i class="fa fa-bell-o"></i></span></div>
            <div class="button"><span class="text setting"><i class="fa fa-envelope-o"></i></span></div>
            <div class="button" @click="logout"><span class="text out"><i class="fa fa-sign-out" aria-hidden="true"></i></span></div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'header',
  computed:{
    ...mapGetters([
      'isSidebarOpen'
    ])
  },
  methods: {
    ...mapActions([
      'toggleSidebar'
    ]),
    reload:function(){
      location.reload(true)
    },
    logout(){
      sessionStorage.removeItem("langyang_telephone");
      sessionStorage.removeItem("langyang_password")
      //跳转到登录页
      this.$router.push('/');
    }
  },
  data:function(){
    return{
      sidebarValue:true
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  width: 100%;
  // background-color: #1f2d3d;
  background-color:#fff;
  border-bottom: 1px solid #eee;
  float: right;
  z-index: 10;
  .el-input{
    width: 250px;
    margin-left: 20px;
    margin-top:7px;
    .el-input__inner{
        height: 30px;
    }
  }
  .fa-bars{
    float: left;
    margin-left: 15px;
    color: #444;
    font-size: 20px;
    line-height: 50px;
    cursor: pointer;
    border-right:1px solid #eee;
    padding-right:18px;
  }
  .top-right {
    float: right;
    display: inline-block;
    position: relative;
    /*width: 100%;*/
    height: 50px;
      .toggle{
        color: #fff;
        font-size: 30px;
        float: left;
        margin-left: 15px;
        line-height: 50px;
        margin-bottom: 20px;
      }
      .rightIcon{
        float: right;
        margin-right: 20px;
        .button{
          color: #444;
          display: inline-block;
          width: 40px;
          height: 50px;
          text-align: center;
          cursor: pointer;
          &:hover{
            background-color:#424f63;
            color: #65CEA7;
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
