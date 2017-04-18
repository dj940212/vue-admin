<template>
<div class="mapsearch">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>实时地图查询</span>
    </div>
    <div class="search-box">
      <input class="search-input" type="text" name="" v-model="mac">
      <button class="search-button class-button" type="button" name="button" @click="submit">搜索</button>
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
            <td>{{user.realname}}</td>
          </tr>
          <tr>
            <th>手机号</th>
            <td>{{user.telephone}}</td>
          </tr>
          <tr>
            <th>身份证号</th>
            <td>{{user.idcardnumber}}</td>
          </tr>
          <tr>
            <th>性别</th>
            <td>{{(user.sex=1)?"女":"男"}}</td>
          </tr>
          <tr>
            <th>生日</th>
            <td>{{user.birthday}}</td>
          </tr>
          <tr>
            <th>地址</th>
            <td>{{user.address}}</td>
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
            <td>{{user.mac}}</td>
          </tr>
          <tr>
            <th>定位物类型</th>
            <td>{{(user.device_type==1)?'助动车':(user.device_type==2)?'老人':(user.device_type==3)?'小孩':(user.device_type==4)?'宠物':""}}</td>
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
  mounted: function() {
    this.initMap();
    // this.keepsocket();
  },
  methods: {
    //   初始化地图
    initMap: function() {
      var mapOptions = {
        zoom: 16,
        center: [120.01335374840001, 30.2846277638], //定位到海创园
        resizeEnable: true
      }

      this.amap = new AMap.Map('real-time-map', mapOptions);
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        this.amap.addControl(new AMap.ToolBar());
        this.amap.addControl(new AMap.Scale());
      });
    },
    //获取用户信息
    getUserInfo: function() {
      this.$http.post(this.apiUrl, {
        mac: this.mac
      }, {
        emulateJSON: true
      }).then((res) => {
        console.log(res.data)
        if (res.data.lp == 0 && res.data.data.msg == "请求成功") {
          if (res.data.data.list) {
            this.user = res.data.data.list[0];
            console.log(this.user)
          }

        } else {
          alert('找不到该设备，请重新输入！');
        }
      }, (res) => {
        console.log(res.status)
      })
    },
    // 提交搜索
    submit: function() {
      console.log(this.mac);
      this.getUserInfo();
    },
    //建立websocket链接
    keepsocket: function() {
      var socket = io('ws://127.0.0.1:3002'); //121.196.194.14:3002
      socket.on('connect', function() {
        console.log('连接成功！');

      });
      socket.on('message', function(data) {
        console.log("收到数据", data.devEUI);
      });
    },
    //添加标记
    addMarker: function(){
        // var amap = new AMap.Map('trackQuery-map');
        this.amap.clearMap();
        this.track.forEach((data,index) => {
            //高德地址转换
            var lnglat = new AMap.LngLat(data.longitude,data.latitude)
            AMap.convertFrom(lnglat,"gps",(status,result) => {
                //初始化marker
                var marker = new AMap.Marker({
                   title:index,
                   position:result.locations[0],
                   map:this.amap,
                   animation:"AMAP_ANIMATION_DROP"
                });
                AMap.event.addListener(marker, 'click',() => {
                     this.clickData = data;
                     this.lonlatToAddr(result.locations[0],clickData);
                     console.log("clickData",data);
                     alert(this.clickData.address)
                 });
                AMap.event.addListener(marker,'mouseover',(e) => {
                     this.mouseoverData = data;
                     this.lonlatToAddr(result.locations[0],this.mouseoverData);
                     setTimeout(() => {
                         AMap.plugin('AMap.AdvancedInfoWindow',() => {
                             //实例化信息窗体
                            var title = '姓名：'+this.user.realname+'<span class="info-span" style="font-size:11px;">手机号:'+this.user.telephone+'</span>',
                            content = [];
                            content.push('<span class="info-span" style="font-weight:bold">定位物mac：</span>'+this.mac);
                            content.push('<span class="info-span" style="font-weight:bold">当前位置：</span>'+this.mouseoverData.address)
                            this.infoWindow = new AMap.InfoWindow({
                                isCustom: true,  //使用自定义窗体
                                content: this.createInfoWindow(title, content.join("<br/>")),
                                offset: new AMap.Pixel(16, -45)
                            });
                            this.infoWindow.open(this.amap,e.target.getPosition())
                        });
                    },100);

                 });
                AMap.event.addListener(marker,'mouseout',()=>{
                    this.amap.clearInfoWindow();
                })

                //表格数据
                this.lonlatToAddr(result.locations[0],data)
                // this.allData.push(data);
            })
        })
        console.log(this.allData)
        this.tableData = this.allData;
    },
  },
  data() {
    return {
      mac: "",
      urlUser: this.global.port+"/langyang/Home/Police/searchUserDeviceInfo",
      urlTrack: this.global.port+"/langyang/Home/Police/getRouteByMac",
      user: {},
    }
  }
}
</script>

<style lang="less" scoped>
.mapsearch {
    width: 100%;
    height: 95%;
    padding-top: 22px;
    position: relative;
    .header {
        height: 64px;
        margin-left: 22px;
        margin-right: 22px;
        background-color: #e6e6eb;
        line-height: 64px;
        font-size: 24px;
        .title {
            margin-left: 15px;
            display: inline-block;
            .icon {
                font-size: 28px;
                position: relative;
                top: 4px;
            }
            span {
                margin-left: 5px;
            }
        }
        .search-box {
            // display: inline-block;
            float: right;
            .class-button {
                top: -3px;
                left: -8px;
            }
        }
    }
    .content {
        margin-left: 22px;
        margin-right: 22px;
        padding-top: 10px;
        background-color: #fff;
        height: 89%;
        .real-time-map {
            width: 73%;
            // width: 98%;
            height: 98%;
            margin-left: 10px;
            display: inline-block;
        }
        .info-box {
            width: 24%;
            height: 98%;
            display: inline-block;
            vertical-align: top;
            margin-left: 15px;
            .module-ionfo {
                margin-top: 20px;
            }
            .title {
                span {
                    width: 80px;
                    display: block;
                    font-size: 18px;
                    border-bottom: 3px solid #03003a;
                    line-height: 30px;
                }
            }
            table {
                background-color: #e6e6eb;
                margin-top: 12px;
                font-size: 13px;
                width: 95%;
                tr {
                    th {
                        border: 3px solid #fff;
                        // border-radius: 8px;
                        // line-height: 30px;
                        padding: 8px 10px;
                        width: 100px;
                    }
                    td {
                        border: 3px solid #fff;
                        // border-radius: 2px;
                        padding: 8px 10px;
                    }
                }

            }
        }
    }
}

// ====================media==================
@media only screen and (max-width:1350px){
    .real-time-map{
        width: 98% !important;
    }
    .info-box{
        margin-top: 30px;
        .module-ionfo{
            display: inline-block;
            vertical-align: top;
        }
        .user-info{
            // display: inline-block;
        }
    }
}
</style>
