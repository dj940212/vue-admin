<template>
  <div class="header" id="header">
      <i class="fa fa-bars" @click="toggleSidebar"></i>
      <el-input icon="search" placeholder="在此输入"></el-input>
      <div class="top-right">
          <div class="rightIcon">
            <div class="button" @click="reload"><i class="fa fa-refresh" aria-hidden="true"></i></div>
            <div class="button"><i class="fa fa-bell-o"></i></div>
            <div class="button"><i class="fa fa-envelope-o"></i></div>
            <!-- <div class="button" @click="logout"><span class="text out"><i class="fa fa-sign-out" aria-hidden="true"></i></span></div> -->
            <div class="button button-user" @mouseover="dropDownValue=true" @mouseout="dropDownValue=false"><i class="fa fa-user" aria-hidden="true"></i><span class="text out">police</span></div>
          </div>
          <div class="drop-down" v-show="dropDownValue" @mouseout="dropDownValue=false" @mouseover="dropDownValue=true">
            <router-link to="/userinfo"><div class="icon-box"><i class="fa fa-address-book-o" aria-hidden="true"></i><span>信息</span></div></router-link>
            <div class="icon-box"><i class="fa fa-cog" aria-hidden="true"></i><span>设置</span></div>
            <div class="icon-box" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i><span>退出</span></div>
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
      sidebarValue:true,
      dropDownValue:false
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
    padding-left: 16px;
    color: #444;
    font-size: 20px;
    line-height: 50px;
    cursor: pointer;
    border-right:1px solid #eee;
    padding-right:18px;
    &:hover{
      background-color:#424f63;
      color: #65CEA7;
    }
  }
  .top-right {
    float: right;
    // display: inline-block;
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
      margin-right: 10px;
      .button{
        color: #444;
        display: inline-block;
        width: 40px;
        height: 50px;
        text-align: center;
        cursor: pointer;
        line-height: 50px;
        &:hover{
          background-color:#424f63;
          color: #65CEA7;
        }
      }
      .button-user{
        width: 100px;
        .text{
          line-height: 50px;
          margin-left: 10px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
          width: 60px;
        }
      }
    }
    .drop-down{
      background-color: #65CEA7;
      width: 180px;
      height: 90px;
      position: absolute;
      top: 50px;
      z-index: 200;
      right: 10px;
      border-radius: 2px;
      .icon-box{
         height: 30px;
         line-height: 30px;
         padding-left: 15px;
         color: #fff;
         cursor: pointer;
         span{
          margin-left: 10px;
          font-size: 12px;
         }
         &:hover{
          background-color:#424f63;
          color: #65CEA7;
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
  .box{
    width:200px;
    height: 100px;
  }
}
</style>
