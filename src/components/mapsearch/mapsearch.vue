<template>
  <div class="mapsearch">
      <div class="header">
          <div class="title">
              <i class="icon iconfont">&#xe612;</i>
              <span>实时地图查询</span>
          </div>
          <div class="search-box">
              <input class="search-input" type="text" name="" value="">
              <button class="search-button button" type="button" name="button">进入</button>
          </div>
      </div>
      <div class="content">
         <div class="real-time-map" id="real-time-map">

         </div>
         <div class="info-box">
             <div class="user-info">
                 <div class="title">
                     <span>用户信息</span>
                 </div>
                 <table>
                     <tr>
                         <th>姓名</th>
                         <td>张三</td>
                     </tr>
                     <tr>
                         <th>手机号</th>
                         <td>15155620677</td>
                     </tr>
                     <tr>
                         <th>身份证号</th>
                         <td>340828199403237010</td>
                     </tr>
                     <tr>
                         <th>性别</th>
                         <td>女</td>
                     </tr>
                     <tr>
                         <th>生日</th>
                         <td>1994-09-20</td>
                     </tr>
                     <tr>
                         <th>地址</th>
                         <td>杭州市余杭区仓前镇连具塘村39组张家桥41号</td>
                     </tr>
                 </table>
             </div>
             <div class="module-ionfo">
                 <div class="title">
                     <span>模块信息</span>
                 </div>
                 <table border="1">
                     <tr>
                         <th>定位物mac</th>
                         <td>9728A5B6B7D89525</td>
                     </tr>
                     <tr>
                         <th>定位物类型</th>
                         <td>助动车</td>
                     </tr>
                     <tr>
                         <th>当前经度</th>
                         <td>120.0135407484</td>
                     </tr>
                     <tr>
                         <th>当前纬度</th>
                         <td>120.0135407484</td>
                     </tr>
                     <tr>
                         <th>地区编码</th>
                         <td>330110</td>
                     </tr>
                     <tr>
                         <th>点击地址</th>
                         <td>浙江省杭州市余杭区五常街道浙江海外高层次人才创新园3幢浙江海外高层次人才创新园</td>
                     </tr>
                 </table>
             </div>
         </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'mapsearch',
  mounted:function(){
      this.initMap();
  },
  methods: {
      initMap:function(){
        var mapOptions = {
          zoom: 16,
          center:[120.01335374840001,30.2846277638],    //定位到海创园
          resizeEnable:true
        }

        var amap = new AMap.Map('real-time-map',mapOptions);
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale'],function () {
          amap.addControl(new AMap.ToolBar());
          amap.addControl(new AMap.Scale());
        });
      }
  }
}
</script>

<style lang="less" scoped>
    .mapsearch{
        width: 100%;
        height: 95%;
        // background-color: blue;
        padding-top: 22px;
        position: relative;
        .header{
            height: 64px;
            margin-left: 22px;
            margin-right: 22px;
            background-color: #e6e6eb;
            line-height: 64px;
            font-size: 24px;
            .title{
                margin-left: 15px;
                display: inline-block;
                .icon{
                    font-size: 28px;
                    position: relative;
                    top: 4px;
                }
                span{
                    margin-left: 5px;
                }
            }
            .search-box{
                display: inline-block;
                float: right;
                .button{
                    top: -3px;
                    left: -8px;
                }
            }
        }
        .content{
            margin-left: 22px;
            margin-right: 22px;
            padding-top: 10px;
            background-color: #fff;
            height: 85%;
            .real-time-map{
                 width: 73%;
                 height: 98%;
                 margin-left: 10px;
                 display: inline-block;
            }
            .info-box{
                width: 25%;
                height: 98%;
                display: inline-block;
                vertical-align: top;
                .module-ionfo{
                    margin-top: 20px;
                }
                .title{
                    span{
                        width:80px;
                        display: block;
                        font-size: 18px;
                        border-bottom: 3px solid #03003a;
                        line-height: 30px;
                    }
                }
                table{
                    background-color: #e6e6eb;
                    margin-top: 12px;
                    font-size: 13px;
                    tr{
                        th{
                            border: 3px solid #fff;
                            // border-radius: 8px;
                            line-height: 30px;
                            width: 100px;
                        }
                        td{
                            border: 3px solid #fff;
                            // border-radius: 2px;
                            padding-left: 10px;
                        }
                    }

                }
            }
        }
    }

    // ====================media==================
    // @media only screen and (max-width:1100px){
    //     .info-box{
    //         display: block;
    //     }
    //     .real-time-map{
    //         width: 100%;
    //     }
    // }
</style>
