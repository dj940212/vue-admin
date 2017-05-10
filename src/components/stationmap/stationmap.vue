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
            height="550"
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
import imgOffUrl from "@/components/stationmap/station_off.png"
import imgOnUrl from "@/components/stationmap/station.png"
export default {
  name: 'stationmap',
  mounted: function() {
    this.initMap();
    this.getBaseStation();
    this.keepsocket();
    // this.drawLocalStorage();
  },
  methods: {
    //初始化地图
    initMap: function() {
      var mapOptions = {
        zoom: 15,
        center: [119.9404736224, 30.2667629326], //定位到海创园
        resizeEnable: true,
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
          console.log(this.stationsInfo)
          this.stationsInfo.forEach((item,arrIndex) => {
              this.addNewMarker(item,arrIndex);
              this.stationMac.push(item.mac);
          });
          console.log(this.markers)

        } else {
          console.log('基站数据请求失败');
        }
      }, (res) => {
        console.log(res.status)
      })
    },
    checkOnline:function(data){
      setInterval(()=>{
        data.forEach((item,index)=>{
          if (!item.time) {
            var time = Date.now() - new Date(item.time).getTime();
            if (time > 1000*60) {
              this.markers(index).setIcon(imgOffUrl)
            }
          }else {
            console.log("没有时间信息")
          }
        })
      },2000)
    },
    //localStorage
    drawLocalStorage:function(){
      this.getLocalStation().forEach((item,index) => {
        this.addNewMarker(item,this.markers.length);
      })
    },
    //获取本地数据
    getLocalStation:function(){
      var arrData = JSON.parse(localStorage.getItem("stationDatas"));
      for(var i = 0; i < arrData.length; i++){
        arrData[i] = JSON.parse(arrData[i]);
      }
      console.log(arrData);
      return arrData;
    },
    //建立websocket链接
    keepsocket: function() {
        var socket = io('ws://121.196.194.14:3003');

        socket.on('connect',function () {
          console.log('建立链接');
        });
        socket.on('message',(data) => {
          console.log("基站====>",data.mac.slice(12),data);
          console.log("markerIndex",this.markers[this.stationMac.indexOf(data.mac)]);
          if (this.stationMac.indexOf(data.mac) === -1) {
              this.addNewMarker(data,this.markers.length)
          }else{
              setTimeout(() => {
                this.markers[this.stationMac.indexOf(data.mac)].setIcon(imgOnUrl)
              },100)

          }
          // console.log(this.stationMac)
        });
    },
    //添加新标记
    addNewMarker:function(data,index){
        var lnglat = new AMap.LngLat(data.longitude,data.latitude);
        var _this = this;
        //闭包
        (function(){
          AMap.convertFrom(lnglat,"gps",(status,result)=>{
            //创建标记
            _this.marker = new AMap.Marker({
              icon: imgOffUrl,
              position: result.locations[0],
              title: data.mac,
              map: _this.amap
            });
            _this.markers[index]= _this.marker;
            //点击事件
            AMap.event.addListener(_this.marker, 'click',(e) => {
                _this.amap.setCenter(e.target.getPosition());
                _this.amap.setZoom(16);
             });
             //划过事件
            AMap.event.addListener(_this.marker,'mouseover',(e) => {
                  _this.global.lonlatToAddr(result.locations[0],_this.mouseoverData);
                 setTimeout(() => {
                     AMap.plugin('AMap.AdvancedInfoWindow',() => {
                         //实例化信息窗体
                        var title = '基站mac : '+data.mac,
                        content = [];
                        content.push('<span class="info-span" style="font-weight:bold">海拔：</span>'+data.altitude);
                        content.push('<span class="info-span" style="font-weight:bold">经度：</span>'+data.latitude);
                        content.push('<span class="info-span" style="font-weight:bold">纬度：</span>'+data.longitude);
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
             //划出事件
            AMap.event.addListener(_this.marker,'mouseout',()=>{
                _this.amap.clearInfoWindow();
            });
          });
        }());
    },
    //基站数据搜索
    searchData:function(){
        this.getBaseStation();
        this.tableData = this.stationsInfo;
        this.toggleValue = !this.toggleValue;
    },
    //输入框搜索
    handleIconClick(ev) {
        var sliceMacs = [];
        this.stationMac.forEach(function(item,index){
          sliceMacs.push(item.slice(12));
        })
        console.log(sliceMacs)
        if (sliceMacs.indexOf(this.mac) !== -1) {
          this.amap.setCenter(this.markers[sliceMacs.indexOf(this.mac)].getPosition());
          this.amap.setZoom(16);
        }else {
          if (this.stationMac.indexOf(this.mac) !== -1 ) {
              this.amap.setCenter(this.markers[this.stationMac.indexOf(this.mac)].getPosition());
              this.amap.setZoom(16);
          }else {
            alert("找不到基站")
          }
        }

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
      stationMac:[],
      urlStation: this.global.port+"/langyang/Home/Police/getBaseStations",
      user: {},
      tableData:[],
      toggleValue:false,
      resultLocations:{}
    }
  }
}
</script>

<style lang="less" scoped>
.stationmap {
    width: 100%;
    height: 95%;
    padding-top: 15px;
    position: relative;
    .header {
        height: 64px;
        margin-left: 15px;
        margin-right: 15px;
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
        margin-left: 15px;
        margin-right: 15px;
        padding-top: 5px;
        padding-right: 10px;
        padding-bottom: 5px;
        background-color: #fff;
        position: relative;
        height: 90%;
        .base-station-map {
            width: 100%;
            height: 100%;
            margin-left: 5px;
            display: inline-block;
            .el-input{
                z-index: 110;
                width: 200px;
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
            z-index: 1000;
        }
    }
}
// ====================media==================
@media only screen and (max-width:1350px){
    .base-station-map{
        width: 100% !important;
    }
}
</style>
