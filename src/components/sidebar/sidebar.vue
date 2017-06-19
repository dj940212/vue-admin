<template>
  <div class="sidebar" id="sidebar" v-show="isSidebarOpen">
      <div class="top-left">
        <div class="text">
          <img class="brand" src="./brand.png" alt="" width="38" height="38">
          <span class="company">朗阳科技</span>
          <!-- <span class="title">助动车管理系统</span> -->
        </div>
      </div>
      <!-- <div class="avatar">
          <router-link to="/userinfo"><img src="./avatar.png" alt="" width="64" height="64"></router-link>
          <div class="text">
              <span class="police">警员：</span>
              <span class="name">{{username}}</span>
          </div>
      </div> -->
      <div class="divider"></div>
      <div class="tab" ref="tab" id="tab">
          <ul class="menu">
              <li class="menu-item">
                  <div class="menu-item-title" @click="toggleSidebar1" :class="{active:sidebarActive1}" >
                      <i class="icon iconfont">&#xe615;</i>
                      <span>用户车辆管理</span>
                  </div>
                  <transition name="slide">
                      <ul class="submenu">
                          <router-link to="/eleFence"><li class="submenu-item">用户电子围栏</li></router-link>
                          <router-link to="/mapsearch"><li class="submenu-item">实时地图查询</li></router-link>
                          <router-link to="/user"><li class="submenu-item">用户信息管理</li></router-link>
                          <router-link to="/car"><li class="submenu-item">车辆信息管理</li></router-link>
                      </ul>
                  </transition>
              </li>
              <li class="menu-item">
                  <div class="menu-item-title" @click="toggleSidebar2" :class="{active:sidebarActive2}">
                      <i class="icon iconfont">&#xe607;</i>
                      <span>报警管理</span>
                  </div>
                  <ul class="submenu">
                      <!-- <li class="submenu-item"><router-link to="/userCallReg">用户报警登记</router-link></li> -->
                      <router-link to="/userCallSearch"><li class="submenu-item">报警记录管理</li></router-link>
                  </ul>
              </li>
              <li class="menu-item">
                  <div class="menu-item-title" @click="toggleSidebar3" :class="{active:sidebarActive3}">
                      <i class="icon iconfont">&#xe6a3;</i>
                      <span>基站管理</span>
                  </div>
                  <ul class="submenu">
                      <router-link to="/stationData"><li class="submenu-item">基站数据</li></router-link>
                      <router-link to="/stationmap"><li class="submenu-item">基站状态查询</li></router-link>
                  </ul>
              </li>
              <li class="menu-item">
                  <div class="menu-item-title" @click="toggleSidebar4" :class="{active:sidebarActive4}">
                      <i class="icon iconfont">&#xe612;</i>
                      <span>历史纪录查询</span>
                  </div>
                  <ul class="submenu">
                      <router-link to="/trackQuery"><li class="submenu-item">助动车行驶轨迹查询</li></router-link>
                      <li class="submenu-item">相关视频调用</li>
                      <li class="submenu-item">低电量电子车牌查询</li>
                      <li class="submenu-item">操作日志查询</li>
                  </ul>
              </li>
          </ul>
      </div>
      <div class="copyright">
          <div class="messBox">
              <span class="mess">Copyright @2017</span>
              <span class="mess">杭州朗阳科技有限公司</span>
              <span class="mess">版权所有</span>
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'sidebar',
  created:function(){

  },
  data () {
    return {
      sidebarActive1: false,
      submenuActive1: false,
      sidebarActive2: false,
      submenuActive2: false,
      sidebarActive3: false,
      submenuActive3: false,
      sidebarActive4: false,
      submenuActive4: false,
      username:"police",
    }
  },
  computed:{
    ...mapGetters([
      'isSidebarOpen'
    ])
  },
  methods: {
      toggleSidebar1: function(event){
          this.sidebarActive1 = !this.sidebarActive1;
          this.submenuActive1 = !this.submenuActive1;

          if (!this.submenuActive1) {
              event.currentTarget.nextSibling.nextSibling.style.height=0+"px";
          }else {
              event.currentTarget.nextSibling.nextSibling.style.height=148+"px";
          }

      },
      toggleSidebar2: function(event){
          this.sidebarActive2 = !this.sidebarActive2;
          this.submenuActive2 = !this.submenuActive2;

          if (!this.submenuActive2) {
              event.currentTarget.nextSibling.nextSibling.style.height=0+"px";
          }else {
              event.currentTarget.nextSibling.nextSibling.style.height=37+"px";
          }
      },
      toggleSidebar3: function(event){
          this.sidebarActive3 = !this.sidebarActive3;
          this.submenuActive3 = !this.submenuActive3;


          if (!this.submenuActive3) {
              event.currentTarget.nextSibling.nextSibling.style.height=0+"px";
          }else {
              event.currentTarget.nextSibling.nextSibling.style.height=74+"px";
          }
      },
      toggleSidebar4: function(event){
          this.sidebarActive4 = !this.sidebarActive4;
          this.submenuActive4 = !this.submenuActive4;


          if (!this.submenuActive4) {
              event.currentTarget.nextSibling.nextSibling.style.height=0+"px";
          }else {
              event.currentTarget.nextSibling.nextSibling.style.height=146+"px";
          }
      },
  },
  mounted:function(){
      this.$refs.tab.style.height = (window.innerHeight-132)+"px";

      this.global.bus.$on("username",function(id){
        this.username = id;
        console.log(id)
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.sidebar{
    float: left;
    width: 181px;
    height: 100%;
    background-color: #424f63;
    z-index: 20;
    // overflow: hidden;
    .top-left {
      display: inline-block;
      width: 181px;
      background-color: #424f63;
      height:50px;
      color: #fff;
      border-right: 1px solid #fff;
      z-index: 20;
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
          top: 14px;
          left: 66px;
          font-size: 18px;
          letter-spacing:2px;
        }
        .brand{
          position: absolute;
          top: 50%;
          margin-top: -26px;
          margin-left: 10px;
        }
      }
    }
    .avatar{
        position: relative;
        width: 180px;
        height: 158px;
        background-color: #424f63;
        img{
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -33px;
            margin-top: -43px;
            display: inline-block;
            border: 1px solid #fff;
            border-radius: 32px;
            background-color: #fff;
        }
        .text{
            display: inline-block;
            position: absolute;
            width: 102px;
            top: 115px;
            left: 50%;
            margin-left: -46px;
            color: #fff;
            font-size: 14px;
            .name{
              display: inline-block;
              width: 50px;
              background-color: #424f63;
              color: #fff;
            }
        }

    }
    .divider{
        background-image: -webkit-linear-gradient(left, transparent, #fff, transparent);
        background-image: -moz-linear-gradient(left, transparent, #fff, transparent);
        background-image: -o-linear-gradient(left, transparent, #fff, transparent);
        background-image: linear-gradient(left, transparent, #fff, transparent);
        height: 2px;
        // margin: 3px 0;
        overflow: hidden;
        width: 180px;
        background-color: #424f63;
    }
    .tab{
        width: 180px;
        background-color:#424f63;
        overflow-x: hidden;
        height: 1000px;
        .menu{
            width: 180px;
            .menu-item{
                display: block;
                width: 180px;
                background-color:#424f63;
                color: #fff;
                line-height: 40px;
                margin-top: 10px;
                .menu-item-title{
                    font-size: 13px;
                    cursor: pointer;
                    letter-spacing:1px;
                    .iconfont{
                        margin-right: 10px;
                        margin-left: 15px;
                        font-size: 20px;
                    }
                    &:hover{
                      background-color:#353f4f;
                      color:#65CEA7;
                    }
                    &.active{
                      background-color:#353f4f;
                      color:#65CEA7;
                    }
                }
                .submenu{
                    background-color: #353f4f;
                    height: 0;
                    overflow: hidden;
                    transition: height 0.4s;
                    &.active{
                        display: block;
                    }
                    a{
                      color: #fff;
                    }
                    a.router-link-active{
                      display: block;
                      color:#65CEA7;
                      background-color:#2a323f;
                    }
                    .submenu-item{
                        width: 176px;
                        height: 35px;
                        line-height: 35px;
                        padding-left: 50px;
                        font-size: 13px;
                        letter-spacing:1px;
                        cursor: pointer;
                        &:hover{
                          background-color:#2a323f;
                          color:#65CEA7;
                        }
                        &.active{
                          background-color:#2a323f;
                        }
                    }

                }
            }
        }
    }
    .copyright{
        width: 181px;
        height: 80px;
        position: fixed;
        background-color: #424f63;
        bottom: 0;
        .messBox{
            margin-top: 15px;
            .mess{
                display: block;
                text-align: center;
                margin-top: 8px;
                font-size: 10px;
                color: #fff;
            }
        }

    }
}
</style>
