<template>
  <div class="sidebar">
      <div class="avatar">
          <router-link to="/userinfo"><img src="./avatar.png" alt="" width="64" height="64"></router-link>
          <div class="text">
              <span class="police">警员：</span>
              <span class="name">张某某</span>
          </div>
      </div>
      <div class="divider"></div>
      <div class="tab" ref="tab">
          <ul class="menu">
              <li class="menu-item">
                  <div class="menu-item-title" @click="toggleSidebar1" :class="{active:sidebarActive1}" >
                      <i class="icon iconfont">&#xe615;</i>
                      <span>定位物管理</span>
                  </div>
                  <transition name="slide">
                      <ul class="submenu" v-show="submenuActive1">
                          <li class="submenu-item"><router-link to="/userinfo">用户与定位物登记</router-link></li>
                          <li class="submenu-item"><router-link to="/login">信息查询与修改</router-link></li>
                          <li class="submenu-item"><router-link to="/userinfo">实时地图查询</router-link></li>
                          <li class="submenu-item">实时轨迹查询</li>
                      </ul>
                  </transition>
              </li>
              <li class="menu-item">
                  <div class="menu-item-title" @click="toggleSidebar2" :class="{active:sidebarActive2}">
                      <i class="icon iconfont">&#xe607;</i>
                      <span>报警管理</span>
                  </div>
                  <ul class="submenu" v-show="submenuActive2">
                      <li class="submenu-item">用户报警登记</li>
                      <li class="submenu-item">报警记录查询</li>
                  </ul>
              </li>
              <li class="menu-item">
                  <div class="menu-item-title" @click="toggleSidebar3" :class="{active:sidebarActive3}">
                      <i class="icon iconfont">&#xe6a3;</i>
                      <span>基站管理</span>
                  </div>
                  <ul class="submenu" v-show="submenuActive3">
                      <li class="submenu-item">基站数据</li>
                      <li class="submenu-item">基站状态查询</li>
                  </ul>
              </li>
              <li class="menu-item">
                  <div class="menu-item-title" @click="toggleSidebar4" :class="{active:sidebarActive4}">
                      <i class="icon iconfont">&#xe612;</i>
                      <span>历史纪录查询</span>
                  </div>
                  <ul class="submenu" v-show="submenuActive4">
                      <li class="submenu-item">助动车行驶记录查询</li>
                      <li class="submenu-item">助动车行驶轨迹查询</li>
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
              <span class="mess">上周郎阳科技有限公司</span>
              <span class="mess">版权所有</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
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
    }
  },
  methods: {
      toggleSidebar1: function(){
          this.sidebarActive1 = !this.sidebarActive1;
          this.submenuActive1 = !this.submenuActive1;
      },
      toggleSidebar2: function(){
          this.sidebarActive2 = !this.sidebarActive2;
          this.submenuActive2 = !this.submenuActive2;
      },
      toggleSidebar3: function(){
          this.sidebarActive3 = !this.sidebarActive3;
          this.submenuActive3 = !this.submenuActive3;
      },
      toggleSidebar4: function(){
          this.sidebarActive4 = !this.sidebarActive4;
          this.submenuActive4 = !this.submenuActive4;
      },
  },
  mounted:function(){
      this.$refs.tab.style.height = (window.innerHeight-381)+"px";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.sidebar{
    position: relative;
    padding-top: 82px;
    .avatar{
        position: relative;
        width: 240px;
        height: 158px;
        background-color: #4e4c75;
        // border-bottom: 1px solid #fff;
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
            top: 110px;
            left: 50%;
            margin-left: -51px;
            color: #fff;
            .police{
            }
        }

    }
    .divider{
        background-image: linear-gradient(left, transparent, #fff, transparent);
        height: 2px;
        // margin: 3px 0;
        overflow: hidden;
        width: 240px;
        background-color: #4e4c75;
    }
    .tab{
        width: 240px;
        // height: 100%;
        background-color:#4e4c75;
        overflow-x: hidden;
        .menu{
            margin-bottom: 220px;
            .menu-item{
                display: block;
                width: 240px;
                background-color:#4e4c75;
                color: #fff;
                line-height: 52px;
                .menu-item-title{
                    border-top:1px solid #4e4c75;
                    border-bottom: 1px solid #4e4c75;

                    .iconfont{
                        margin-right: 15px;
                        margin-left: 24px;
                        font-size: 20px;
                    }
                    &:hover{
                        border-top:1px solid #e6e6eb;
                        border-bottom: 1px solid #e6e6eb;
                    }
                    &.active{
                        // background-color: #03003a;
                    }
                }

                .submenu{
                    background-color: #03003a;
                    &.active{
                        display: block;
                    }
                    &.slide-enter-active, &.slide-leave-active{
                    }
                    &.slide-enter, &.slide-leave-active{
                    }
                    .submenu-item{
                        width: 176px;
                        height: 39px;
                        line-height: 39px;
                        padding-left: 64px;
                        border-top: 1px solid #03003a;
                        border-bottom: 1px solid #03003a;
                        &:hover{
                            border-top: 1px solid #fff;
                            border-bottom: 1px solid #fff;
                        }
                        a{
                            color: #fff;
                        }
                        .router-link-active{
                            color: #b3acac;
                        }
                    }

                }
            }
        }
    }
    .copyright{
        width: 240px;
        height: 140px;
        position: fixed;
        background-color: #03003a;
        bottom: 0;
        .messBox{
            margin-top: 42px;
            .mess{
                display: block;
                text-align: center;
                margin-top: 8px;
                font-size: 13px;
                color: #fff;
            }
        }

    }
}

</style>
