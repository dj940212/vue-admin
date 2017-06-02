<template>
<div class="trackQuery">
  <div class="header" id="map-header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>行驶轨迹查询</span>
    </div>
    <el-button type="button" name="button" @click="toggleMarkers">显示标记</el-button>
    <span class="tableDataOnOff" @click="tableDataToggle = !tableDataToggle"><i class="icon iconfont" >&#xe742;</i></span>
  </div>
  <div class="content" id="map-content">
    <div class="trackQuery-map" id="trackQuery-map">
        <div class="element-input">
            <el-popover
              ref="popover1"
              placement="bottom"
              width="200"
              trigger="click">
              <el-date-picker
                v-model="dateValue1"
                class="el-data"
                type="datetime"
                placeholder="选择起始时间">
              </el-date-picker>
              <el-date-picker
                v-model="dateValue2"
                class="el-date"
                type="datetime"
                placeholder="选择结束时间">
              </el-date-picker>
            </el-popover>
            <el-input
              placeholder="请输入车牌号查询"
              icon="search"
              class="el-input"
              v-model="carnumber"
              v-popover:popover1
              @keyup.enter.native="submit"
              :on-icon-click="submit"
              :maxlength="8">
            </el-input>
        </div>
        <el-tooltip class="item" effect="dark" content="全屏地图" placement="top">
          <i class="el-icon-more" @click="myFullScreen"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="测距工具" placement="top">
          <i class="el-icon-search my-el-icon-search" @click="rangingTool"></i>
        </el-tooltip>
        <div class="block" v-show="false">
           <el-date-picker
             v-model="dateValue1"
             class="el-data"
             type="datetime"
             placeholder="选择起始时间">
           </el-date-picker>
           <el-date-picker
             v-model="dateValue2"
             class="el-date"
             type="datetime"
             placeholder="选择结束时间">
           </el-date-picker>
        </div>
    </div>
    <div class="tableData" v-show="tableDataToggle">
        <el-table
            :data="tableData"
            height="400"
            empty-text="请先输入mac查询"
            :default-sort = "{prop: 'time', order: 'descending'}">
            <el-table-column
                prop="id"
                label="id">
            </el-table-column>
            <el-table-column
                prop="latitude"
                label="经度">
            </el-table-column>
            <el-table-column
                prop="longitude"
                label="纬度">
            </el-table-column>
            <el-table-column
                prop="time"
                label="时间">
            </el-table-column>
            <el-table-column
                prop="adcode"
                label="地区编码">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </div>
  </div>

</div>
</template>

<script>
import startMarker from "../../images/startMarker.png"
import endMarker from "../../images/endMarker.png"
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'trackQuery',
  mounted: function() {
    this.initMap();
  },
  methods: {
    ...mapActions([
      'fullScreen',
      'toggleSidebar'
    ]),
    myFullScreen:function(){
      this.fullScreen();
      this.toggleSidebar();
    },
    // 初始化地图
    initMap: function() {
      var mapOptions = {
        zoom: 16,
        center: [120.01335374840001, 30.2846277638], //定位到海创园
        resizeEnable: true
      }

      this.amap = new AMap.Map('trackQuery-map', mapOptions);
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
        this.amap.addControl(new AMap.ToolBar());
        this.amap.addControl(new AMap.Scale());
      });

    },
    //显示所有标记
    showMarker:function(){
      var showMarkerValue = true;
      if (showMarkerValue) {
        this.track.forEach((item,index)=>{
          if (index!==0&&index!==this.track.length-1) {
            this.addNewMarker(item);
          }
        })
      }
    },
    hideMarker:function(){
      this.markers && this.markers.forEach((item,index)=>{
        if (index>1) {
          item.hide();
        }
      })
    },
    toggleMarkers:function(){
      this.showMarkerValue=!this.showMarkerValue;
      if (this.showMarkerValue) {
        this.track.forEach((item,index)=>{
          if (index!==0&&index!==this.track.length-1) {
            this.addNewMarker(item);
          }
        })
      }else {
        this.markers && this.markers.forEach((item,index)=>{
          if (index>1) {
            item.hide();
          }
        })
      }
    },
    //获取轨迹信息
    getTrack: function() {
      this.$http.post(this.urlTrack, {
        mac: this.mac,
        startTime:this.global.formatDate(this.dateValue1),
        endTime:this.global.formatDate(this.dateValue2)
      }, {
        emulateJSON: true
      }).then((res) => {
          if (this.dateValue1==="" || this.dateValue2==="") {
              alert("请选择时间范围")
          }else {
              console.log("getTrack",res.data)
              if (res.data.lp===0&&res.data.data.msg === "success") {
                  this.$message.success("轨迹获取成功");
                  console.log(res.data.data.list.location);
                  this.track = this.unique(res.data.data.list.location);
                  this.tableData = res.data.data.list.location;
                  this.addNewMarker(this.track[0],startMarker)
                  this.drawRoute(this.track);
                  this.tableData.forEach((item,index)=>{
                    //高德地址转换
                    var lnglat = new AMap.LngLat(item.longitude,item.latitude);
                    this.global.lonlatToAddr(lnglat,item);
                  })
                  console.log("初始地址",this.track)
              } else {
                  this.$message.error('数据请求出现错误');
              }
          }
      }, (res) => {
        this.$message.error('数据请求出现错误');
      })
    },
    //删除数组重复的点
    unique:function(array){
      var newArr = [];
      newArr.push(array[0])
      for (var i = 1; i < array.length; i++) {
        if (array[i].latitude!==array[i-1].latitude && array[i].longitude!==array[i-1].longitude) {
          newArr.push(array[i])
        }
      }
      return newArr;
    },
    //获取用户信息
    getUserInfo: function() {
      this.$http.post(this.urlUser, {
        mac: this.mac
      }, {
        emulateJSON: true
      }).then((res) => {
        console.log(res.data)
        if (res.data.lp == 0 && res.data.data.msg == "请求成功") {
          if (res.data.data.list) {
            this.user = res.data.data.list[0];
            console.log("userinfo",this.user)
          }

        } else {
        }
      }, (res) => {
        console.log(res.status)
      })
    },
    //添加新标记
    addNewMarker:function(data,urlIcon){
        var lnglat = new AMap.LngLat(data.longitude,data.latitude);
        var _this = this;
        //闭包
        (function(){
          AMap.convertFrom(lnglat,"gps",(status,result)=>{
            if (urlIcon) {
              //创建标记
              _this.marker = new AMap.Marker({
                position: result.locations[0],
                title: data.mac,
                map: _this.amap,
                offset:new AMap.Pixel(-18,-44),
                icon: urlIcon
              });
            }else {
              //创建标记
              _this.marker = new AMap.Marker({
                position: result.locations[0],
                title: data.mac,
                map: _this.amap
              });
            }

            _this.marker.mac = data.devEUI;
            _this.markers.push(_this.marker);
            console.log(_this.marker)
            //点击事件
            AMap.event.addListener(_this.marker, 'click',(e) => {
                _this.amap.setCenter(e.target.getPosition());
                _this.amap.setZoom(16);
             });
             //划过事件
            AMap.event.addListener(_this.marker,'mouseover',(e) => {
                  _this.global.lonlatToAddr(result.locations[0],_this.mouseoverData);
                  _this.mouseoverData.latitude =data.latitude;
                  _this.mouseoverData.longitude = data.longitude;
                  _this.mouseoverData.time = data.time;
                  // _this.getUserInfo(data.devEUI);
                  setTimeout(() => {
                          AMap.plugin('AMap.AdvancedInfoWindow',() => {
                              //实例化信息窗体
                             var title = '车牌号: '+_this.carUserInfo.car_number,
                             content = [];
                             content.push('<span class="info-span" style="font-weight:bold">颜色：</span>'+_this.carUserInfo.car_color);
                             content.push('<span class="info-span" style="font-weight:bold">类型：</span>'+_this.carUserInfo.car_type);
                             content.push('<span class="info-span" style="font-weight:bold">时间：</span>'+_this.mouseoverData.time);
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
            })
          });
        }());
    },
    //车牌号查找电动车与个人信息
    findDeviceByCarNum:function(cb){
      this.$http.post(this.urlFindDeviceByCarNum,{car_number:this.carnumber},{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            this.carUserInfo = res.data.data.list;
            this.mac = this.carUserInfo.mac;
            cb()
          }else if (res.data.lp==1&&res.data.data.msg=="无符合的助动车") {
            this.$message.warning("找不到助动车")
          }
      },(res)=>{
        console.log(res.status);
        this.$message.error("数据请求出现错误")
      })
    },
    //地图测距工具
    rangingTool:function(){
      var ruler1,ruler2;
      this.amap.plugin(["AMap.RangingTool"], ()=>{
         ruler1 = new AMap.RangingTool(this.amap);
         AMap.event.addListener(ruler1, "end", function(e) {
             ruler1.turnOff();
         });
       })
      ruler1.turnOn();
    },
    // 提交搜索
    submit: function() {
      console.log(this.dateValue1,this.dateValue2)
      this.findDeviceByCarNum(()=>{
        this.getTrack();
      });
      this.getUserInfo();
      this.showMarkerValue=false;
      this.markers=[];
    },
    //绘制轨迹
    drawRoute:function(data){
        AMap.service(["AMap.Walking"],() => {
            this.amap.clearMap();
            var i = 0;
            var timer = setInterval(() => {
                if (i >= data.length-1) {
                    clearInterval(timer);
                    this.addNewMarker(data[data.length-1],endMarker);
                }else {
                    var lnglat1 = new AMap.LngLat(data[i].longitude,data[i].latitude);
                    // console.log("=======>",i);
                    AMap.convertFrom(lnglat1,"gps",(status,result) => {
                        this.newRouteData1 = [result.locations[0].getLng(),result.locations[0].getLat()];
                        var lnglat2 = new AMap.LngLat(data[i+1].longitude,data[i+1].latitude);
                        console.log("=======>",i+1);
                        AMap.convertFrom(lnglat2,"gps",(status,result) => {
                            this.newRouteData2 = [result.locations[0].getLng(),result.locations[0].getLat()];
                            // console.log(this.newRouteData1,this.newRouteData2);
                              new AMap.Walking({map:this.amap,hideMarkers:true}).search(this.newRouteData1,this.newRouteData2,(status,result)=>{
                                  if (status === "complete") {
                                      i++;
                                  }
                              })
                        })
                    })
                }
            },700)
        })
    },
    //绘制轨迹
    drawRoute2:function(data){
        AMap.service(["AMap.Walking"],() => {
            this.amap.clearMap();
            for (var i = 0; i < data.length; i++) {
              var lnglat1 = new AMap.LngLat(data[i].longitude,data[i].latitude);
              console.log("======1111=======",i);
              AMap.convertFrom(lnglat1,"gps",(status,result) => {
                  this.newRouteData1 = [result.locations[0].getLng(),result.locations[0].getLat()];
                  var lnglat2 = new AMap.LngLat(data[i+1].longitude,data[i+1].latitude);
                  console.log("======2222=======",i+1);
                  AMap.convertFrom(lnglat2,"gps",(status,result) => {
                      this.newRouteData2 = [result.locations[0].getLng(),result.locations[0].getLat()];
                      console.log(this.newRouteData1,this.newRouteData2);
                        new AMap.Walking({map:this.amap,hideMarkers:true}).search(this.newRouteData1,this.newRouteData2,(status,result)=>{
                            if (status === "complete") {
                                i++;
                            }
                        })
                  })
              })
            }
        })
    }
  },
  data() {
    return {
      mac:"",
      urlTrack: this.global.port+"/langyang/Home/Police/getRouteByMac2",
      urlUser: this.global.port+"/langyang/Home/Police/searchUserDeviceInfo",
      urlSearchDeviceByNameOrTele: this.global.port+"/langyang/Home/Police/searchDeviceByNameOrTele",
      urlFindDeviceByCarNum:this.global.port + '/langyang/Home/Police/findDeviceByCarNum',
      urlSearchCarByMac:this.global.port + '/langyang/Home/Police/searchCarByMac',
      user: {},
      track:[],
      marker:{},
      markers:[],
      amap: {},
      clickData: {},
      mouseoverData: {},
      showMarkerValue:false,
      carUserInfo:"",
      carnumber:"HZ000006",
      carInfo:{},
      allData:[],
      dateValue1: new Date('Wed May 27 2017 15:30:00 GMT+0800'),
      dateValue2: new Date('Wed May 27 2017 16:00:00 GMT+0800'),
      tableData: [],
      infoWindow:{},
      tableDataToggle: false,
      macList:[],
      nameOrTele:"",
      routeData:[],
      newRouteData1:[],   //高德转换位置
      newRouteData2:[],   //高德转换位置
    }
  }
}
</script>

<style lang="less">
.trackQuery {
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
        .tableDataOnOff{
            float: right;
            margin-right: 20px;
            font-size: 17px;
            cursor: pointer;
            color: #4e4c75;
            &:hover{
                color: #red;
            }
            .icon{
                font-size: 22px;
                // float: right;
                margin-right: 5px;
            }
        }
    }
    .content {
        margin-left: 15px;
        margin-right: 15px;
        padding: 5px;
        padding-right: 5px;
        background-color: #fff;
        height: 91%;
        .trackQuery-map {
            width: 100%;
            height: 100%;
            // margin-right: 8px;
            display: inline-block;
            .element-input{
                .el-input{
                    z-index: 110;
                    width: 200px;
                    float:right;
                    margin-right: 20px;
                    margin-top: 10px;
                    box-shadow: 3px 4px 3px 0px silver;
                    z-index: 5000;
                }
            }
            .block{
                position: relative;
                .el-input{
                    position: absolute;
                    right: 10px;
                    top: 50px;
                    z-index: 110;
                    display: block;
                }
            }
            .my-el-icon-search{
              z-index: 120;
              color: #4d4d4d;
              font-size: 20px;
              font-weight: bold;
              position: absolute;
              right: 20px;
              bottom: 15px;
              background-color: rgba(255, 255, 255, 0.42);
              padding: 6px;
              box-shadow: 3px 4px 3px 0px silver;
              border-radius: 4px;
              cursor: pointer;
            }
            .el-icon-more{
              z-index: 120;
              color: #4d4d4d;
              font-size: 20px;
              font-weight: bold;
              position: absolute;
              right: 20px;
              bottom: 65px;
              background-color: rgba(255, 255, 255, 0.42);
              padding: 6px;
              box-shadow: 3px 4px 3px 0px silver;
              border-radius: 4px;
              cursor: pointer;
            }
        }
        .tableData{
            position: absolute;
            background-color: red;
            top: 150px;
            left: 24px;
            width: 96%;
            z-index: 200;
        }
    }

}
</style>
