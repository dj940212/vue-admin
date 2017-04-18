<template>
<div class="stationmap">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>基站状态查询</span>
    </div>
    <button class="button-stationData" type="button" name="button" @click="searchData">基站数据</button>
  </div>
  <div class="content">
    <div class="base-station-map" id="base-station-map">
        <el-input
          placeholder="请输入基站mac"
          icon="search"
          class="el-input"
          v-model="mac"
          :on-icon-click="handleIconClick">
        </el-input>
    </div>
    <div class="table-data" v-show="toggleValue">
        <el-table
            :data="tableData"
            border
            height="600"
            style="width: 100%">
            <el-table-column
              prop="mac"
              label="基站mac">
            </el-table-column>
            <el-table-column
              prop="altitude"
              label="经度">
            </el-table-column>
            <el-table-column
              prop="longitude"
              label="纬度">
            </el-table-column>
            <el-table-column
              prop="altitude"
              label="海拔">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="type"
              label="工作状态">
            </el-table-column>
        </el-table>
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
                // icon: "station.png",
                position: result.locations[0],
                title: _this.stationsInfo[i].mac,
                map: _this.amap
              });

              _this.markers.push(_this.marker);
              //   console.log(i,"基站高德地址转换");

              AMap.event.addListener(_this.marker, 'click',(e) => {
                  _this.amap.setCenter(e.target.getPosition());
                  _this.amap.setZoom(16);
               });
              AMap.event.addListener(_this.marker,'mouseover',(e) => {
                    _this.global.lonlatToAddr(result.locations[0],_this.mouseoverData);
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
                              content: _this.global.createInfoWindow(title, content.join("<br/>")),
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

        }

        console.log(this.markers);
    },
    //基站数据搜索
    searchData:function(){
        this.getBaseStation();
        this.tableData = this.stationsInfo;
        this.toggleValue = !this.toggleValue;
    },
    //查询定位
    handleIconClick(ev) {
        this.stationsInfo.forEach((data,index) => {
            if (data.mac === this.mac) {
                this.amap.setCenter(this.markers[index].getPosition());
                this.amap.setZoom(16);
            }

        })
    }


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
      tableData:[],
      toggleValue:false
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
            .input{
                line-height: 10px;
                padding: 3px 5px;
                font-size: 16px;
            }
        }
        .button-stationData{
            height: 34px;
            background-color: #4e4c75;
            border: 0;
            color: #fff;
            border-radius: 3px;
            -moz-border-radius: 3px;
            -o-border-radius: 3px;
            -webkit-border-radius: 3px;
            line-height: 34px;
            width: 100px;
            float: right;
            margin-top: 15px;
            margin-right: 20px;
        }
    }
    .content {
        margin-left: 22px;
        margin-right: 22px;
        padding-top: 10px;
        background-color: #fff;
        position: relative;
        height: 89%;
        .base-station-map {
            // width: 73%;
            width: 99%;
            height: 98%;
            margin-left: 10px;
            display: inline-block;
            .el-input{
                z-index: 110;
                width: 15%;
                float:right;
                margin-right: 20px;
                margin-top: 10px;
                box-shadow: 3px 4px 3px 0px silver;
            }
        }
        .table-data{
            position: absolute;
            top: 3px;
            width: 100%;
            // height: 100%;
            z-index: 1000;
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
