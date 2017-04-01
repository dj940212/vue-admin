<template>
  <div class="sidebar">
      <div class="avatar">
          <img src="./avatar.png" alt="" width="64" height="64">
          <div class="text">
              <span class="police">警员：</span>
              <span class="name">张某某</span>
          </div>
      </div>
      <div class="tab">
          <ul class="menu">
              <li class="menu-item">
                  <div class="menu-item-title" @click="toggleSidebar" :class="{active:sidebarActive}" >
                      <i class="icon iconfont">&#xe604;</i>
                      <span>定位物管理</span>
                  </div>
                  <ul class="submenu" :class="{active:submenuActive}">
                      <li class="submenu-item">用户与定位物登记</li>
                      <li class="submenu-item">信息查询与修改</li>
                      <li class="submenu-item">实时地图查询</li>
                      <li class="submenu-item">实时轨迹查询</li>
                  </ul>
              </li>
              <li class="menu-item">
                  <div class="menu-item-title">
                      <i class="icon iconfont">&#xe619;</i>
                      <span>报警管理</span>
                  </div>
                  <ul class="submenu">
                      <li class="submenu-item">用户报警登记</li>
                      <li class="submenu-item">报警记录查询</li>
                  </ul>
              </li>
              <li class="menu-item">
                  <div class="menu-item-title">
                      <i class="icon iconfont">&#xe605;</i>
                      <span>基站管理</span>
                  </div>
                  <ul class="submenu">
                      <li class="submenu-item">基站数据</li>
                      <li class="submenu-item">基站状态查询</li>
                  </ul>
              </li>
              <li class="menu-item">
                  <div class="menu-item-title">
                      <i class="icon iconfont">&#xe612;</i>
                      <span>历史纪录查询</span>
                  </div>
                  <ul class="submenu">
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
          <span class="mess">Copyright @2017</span>
          <span class="mess">上周郎阳科技有限公司</span>
          <span class="mess">版权所有</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      sidebarActive: false,
      submenuActive: false
    }
  },
  methods: {
      toggleSidebar: function(event){
          this.sidebarActive = !this.sidebarActive;
          this.submenuActive = !this.submenuActive;
        //   event.target.style.display = "none";
        // event.target.nextSibling.style.display = "block";
        //   alert(event.target.nextSibling);
        //   alert(document.getElementById('id'));
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.sidebar{
    position: relative;
    .avatar{
        position: relative;
        width: 240px;
        height: 158px;
        background-color: #4e4c75;
        border-bottom: 1px solid #fff;
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
    .tab{
        .menu{
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
                        background-color: #03003a;
                    }
                }

                .submenu{
                    display: none;
                    &.active{
                        display: block;
                    }
                    .submenu-item{
                        width: 240px;
                        height: 39px;
                        background-color: #03003a;
                        line-height: 39px;
                    }

                }
            }
        }
    }
}

</style>
