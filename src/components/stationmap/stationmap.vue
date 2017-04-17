<template>
<div class="stationmap">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>基站状态查询</span>
    </div>
    <div class="search-box">
      <input class="search-input" type="text" name="" v-model="mac">
      <button class="search-button button" type="button" name="button" >搜索</button>
    </div>
  </div>
  <div class="content">
    <div class="base-station-map" id="base-station-map">

    </div>
    <div class="info-box">
      <div class="user-info">
        <div class="title">
          <span>基站信息</span>
        </div>
        <table>
          <tr>
            <th>基站mac</th>
            <td>{{stationsInfo.mac}}</td>
          </tr>
          <tr>
            <th>经度</th>
            <td>{{stationsInfo.latitude}}</td>
          </tr>
          <tr>
            <th>纬度</th>
            <td>{{stationsInfo.longitude}}</td>
          </tr>
          <tr>
            <th>海拔</th>
            <td>{{stationsInfo.altitude}}</td>
          </tr>
          <tr>
            <th>地址</th>
            <td></td>
          </tr>
          <tr>
            <th>工作状态</th>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'stationmap',
  mounted: function() {
    this.initMap();
    this.getBaseStation();
    // this.keepsocket();
  },
  methods: {
    //   初始化地图
    initMap: function() {
      var mapOptions = {
        zoom: 13.4,
        center: [119.937516, 30.2752000], //定位到海创园
        resizeEnable: true

      }

      this.amap = new AMap.Map('base-station-map', mapOptions);
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
        this.amap.addControl(new AMap.ToolBar());
        this.amap.addControl(new AMap.Scale());
      });
    },
    //获取基站信息
    getBaseStation: function() {
      this.$http.post(this.urlStation, {
        id: 1
      }, {
        emulateJSON: true
      }).then((res) => {
        console.log(res.data)
        if (res.data.lp == 0 && res.data.data.msg == "请求成功") {
          this.stationsInfo = res.data.data.list;
          this.addMarker();

        } else {
          console.log('基站数据请求失败');
        }
      }, (res) => {
        console.log(res.status)
      })
    },
    //建立websocket链接
    keepsocket: function() {
        var socket = io('ws://127.0.0.1:3003');

        socket.on('connect',function () {
          console.log('正在打开！');
        });
        socket.on('message',function (data) {
          console.log(socket);
          console.log("基站数据",data);
          $scope.base_Station(data);
        });
    },
    //位置转换
    lonlatToAddr: function(lonlat,data) {
      AMap.service('AMap.Geocoder', () => { //回调函数
        //实例化Geocoder
        var geocoder = new AMap.Geocoder();
        geocoder.getAddress(lonlat, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            //TODO:获得了有效经纬度，可以做一些展示工作
            data.address = result.regeocode.formattedAddress;
            data.adcode = result.regeocode.addressComponent.adcode;
          } else {
            //获取经纬度失败
          }
        });
      });
    },
    //编辑地图
    addMarker: function () {

        this.amap.clearMap();
        for (var i = 0; i < this.stationsInfo.length; i++) {
          var lnglat = new AMap.LngLat(this.stationsInfo[i].longitude,this.stationsInfo[i].latitude);
          var _this = this;
          //闭包
          (function(i){
            AMap.convertFrom(lnglat,"gps",(status,result)=>{
              //创建标记
              _this.marker = new AMap.Marker({
                icon: "src/components/stationmap/station.png",
                position: result.locations[0],
                title: _this.stationsInfo[i].mac,
                map: _this.amap
              });

              //   console.log(i,"基站高德地址转换");

              AMap.event.addListener(_this.marker, 'click',() => {
                   this.clickData = data;
                   this.lonlatToAddr(result.locations[0],clickData);
                   console.log("clickData",data);
                   alert(this.clickData.address)
               });
              AMap.event.addListener(_this.marker,'mouseover',(e) => {
                   _this.lonlatToAddr(result.locations[0],_this.mouseoverData);
                   setTimeout(() => {
                       AMap.plugin('AMap.AdvancedInfoWindow',() => {
                           //实例化信息窗体
                          var title = '基站mac : '+_this.stationsInfo[i].mac,
                          content = [];
                          content.push('<span class="info-span" style="font-weight:bold">海拔：</span>'+_this.stationsInfo[i].altitude);
                          content.push('<span class="info-span" style="font-weight:bold">经度：</span>'+_this.stationsInfo[i].latitude);
                          content.push('<span class="info-span" style="font-weight:bold">纬度：</span>'+_this.stationsInfo[i].longitude);
                          content.push('<span class="info-span" style="font-weight:bold">位置：</span>'+_this.mouseoverData.address)
                          var infoWindow = new AMap.InfoWindow({
                              isCustom: true,  //使用自定义窗体
                              content: _this.createInfoWindow(title, content.join("<br/>")),
                              offset: new AMap.Pixel(16, -45)
                          });
                          infoWindow.open(_this.amap,e.target.getPosition())
                      });
                  },200);

               });
              AMap.event.addListener(_this.marker,'mouseout',()=>{
                  _this.amap.clearInfoWindow();
              })
            });
          }(i));
          this.markers.push(_this.marker);
        }

        console.log(this.markers);
    },
    //构建自定义信息窗体
    createInfoWindow: function(title,content){
        var info = document.createElement("div");
        info.className = "info-window";

        //可以通过下面的方式修改自定义窗体的宽高
        info.style.width = "270px";
        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        // var closeX = document.createElement("img");
        top.className = "info-window-top";
        titleD.innerHTML = title;
        // closeX.src = "http://webapi.amap.com/images/close2.gif";
        // closeX.onclick = closeInfoWindow;

        top.appendChild(titleD);
        // top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-window-middle";
        middle.style.backgroundColor = 'white';
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-window-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "http://webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    },

  },
  data() {
    return {
      mac: "",
      amap:{},
      mouseoverData:{},
      markers:[],
      marker:{},
      stationsInfo: [],
      urlStation: this.global.port+"/langyang/Home/Police/getBaseStations",
      user: {},
    }
  }
}
</script>

<style lang="less" scoped>
.stationmap {
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
            display: inline-block;
            float: right;
            .button {
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
        height: 85%;
        .base-station-map {
            // width: 73%;
            width: 99%;
            height: 98%;
            margin-left: 10px;
            display: inline-block;
        }
        .info-box {
            display: none;
            width: 24%;
            height: 98%;
            // display: inline-block;
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
                        line-height: 30px;
                        width: 100px;
                    }
                    td {
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
@media only screen and (max-width:1350px){
    .base-station-map{
        width: 98% !important;
    }
}
</style>
