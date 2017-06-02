<template>
<div class="mapsearch">
  <div class="header" id="map-header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>实时地图查询</span>
    </div>
    <div class="el-switch">
        <el-switch
          v-model="switchValue"
          on-color="#4e4c75"
          off-color="#222222"
          on-text="位置"
          off-text="轨迹"
          @change="switchChange">
        </el-switch>
    </div>
  </div>
  <div class="content" id="map-content">
    <div class="real-time-map" id="real-time-map" ref="realtimeMap">
        <el-input
          placeholder="请输入车牌号查询"
          icon="search"
          v-model="carnumber"
          :on-icon-click="handleIconClick"
          :maxlength="8"
          @keyup.enter.native="handleIconClick">
        </el-input>
        <i class="el-icon-d-arrow-left" @click="toggleInfoBox" ref="elIcon"></i>
        <el-tooltip class="item" effect="dark" content="测距工具" placement="top">
          <i class="fa fa-arrows-h" @click="rangingTool"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="全屏地图" placement="top">
          <i class="fa fa-arrows-alt" @click="myFullScreen"></i>
        </el-tooltip>
    </div>
    <div class="info-box" v-show="toggleInfoBoxValue">
      <div class="user-info">
        <div class="title">
          <span>用户信息</span>
        </div>
        <table>
          <tr>
            <th>姓名</th>
            <td>{{carUserInfo.realname}}</td>
          </tr>
          <tr>
            <th>手机号</th>
            <td>{{carUserInfo.telephone}}</td>
          </tr>
          <tr>
            <th>身份证号</th>
            <td>{{carUserInfo.idcardnumber}}</td>
          </tr>
          <tr>
            <th>性别</th>
            <td>{{carUserInfo.sex=== 1 ? "女":"男"}}</td>
          </tr>
          <tr>
            <th>生日</th>
            <td>{{carUserInfo.birthday}}</td>
          </tr>
          <tr>
            <th>地址</th>
            <td>{{carUserInfo.address}}</td>
          </tr>
        </table>
      </div>
      <div class="module-ionfo">
        <div class="title">
          <span>助动车信息</span>
        </div>
        <table border="1">
          <tr>
            <th>mac</th>
            <td>{{carUserInfo.mac}}</td>
          </tr>
          <tr>
            <th>车牌号</th>
            <td>{{carUserInfo.car_number}}</td>
          </tr>
          <tr>
            <th>标识</th>
            <td>{{carUserInfo.lable}}</td>
          </tr>
          <tr>
            <th>颜色</th>
            <td>{{carUserInfo.car_color}}</td>
          </tr>
          <tr>
            <th>备注</th>
            <td>{{carUserInfo.remark}}</td>
          </tr>
          <tr>
            <th>绑定时间</th>
            <td>{{carUserInfo.setup_time}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import urlIcon  from "../../images/marker.png"
import startMarker from "../../images/startMarker.png"
import endMarker from "../../images/endMarker.png"
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'mapsearch',
  mounted: function() {
    this.initMap();
    this.testSocket();
    // this.keepsocket();
    this.global.bus.$on("arrIndex",(index) => {
        // this.mac = this.tableData[index].mac;
        // console.log(this.tableData[index].mac);
    })
  },
  computed:{
    ...mapGetters([
      'isSidebarOpen',
      'isFullScreen'
    ])
  },
  methods: {
    ...mapActions([
      'fullScreen',
      'toggleSidebar'
    ]),
    //地图全屏
    myFullScreen:function(){
      if (this.isSidebarOpen&&!this.isFullScreen) {
        this.toggleSidebar();
        this.fullScreen();
      }else if(!this.isSidebarOpen&&!this.isFullScreen){
        this.fullScreen();
      }else if (!this.isSidebarOpen&&this.isFullScreen) {
        this.toggleSidebar();
        this.fullScreen();
      }
    },
    //   初始化地图
    initMap: function() {
      var mapOptions = {
        zoom: 16,
        center: [120.01335374840001, 30.2846277638], //定位到海创园
        resizeEnable: true
      }

      this.amap = new AMap.Map('real-time-map', mapOptions);
    },
    //获取用户信息
    getUserInfo: function(userMac) {
      this.$http.post(this.urlUser, {
        mac: userMac
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
    //车牌号查找电动车与个人信息
    findDeviceByCarNum:function(cb){
      this.$http.post(this.urlFindDeviceByCarNum,{car_number:this.carnumber},{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            this.carUserInfo = res.data.data.list;
            cb()
          }else if (res.data.lp==1&&res.data.data.msg=="无符合的助动车") {
            this.$message.warning("找不到助动车")
          }
      },(res)=>{
        console.log(res.status);
        this.$message.error("数据请求出现错误")
      })
    },
    //根据姓名或电话查找定位物
    searchDeviceByNameOrTele: function(cb){
      this.$http.post(this.urlSearchDeviceByNameOrTele, {
        nameOrTele: this.nameOrTele
      }, {
        emulateJSON: true
      }).then((res) => {
        if (res.data.lp == 0 && res.data.message == "请求成功") {
            console.log(res.data.data[0].deviceinfo);
            if (res.data.data[0].deviceinfo) {
              this.macList = res.data.data[0].deviceinfo;
              this.macList.forEach((item,index)=>{
                item.value = item.mac;
              })
              cb()
            }

        } else {
          console.log('找不到该设备，请重新输入！');
        }
      }, (res) => {
        console.log(res.status)
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
    //建立websocket链接
    keepsocket: function() {
      var socket = io('ws://121.196.194.14:3002'); //121.196.194.14:3002
      socket.on('connect', function() {
        console.log('连接成功！');
      });
      socket.on('message', (data) => {
        console.log("收到数据", data);
        data.time = this.global.formatDate(new Date());
        console.log("data.time",data.time);
        let localIndex = this.localRouteDataMac.indexOf(data.devEUI);
        if (localIndex===-1) {
          this.localRouteData.push(data);
          this.localRouteDataMac.push(data.devEUI);
        }else {
          this.localRouteData.splice(localIndex,1,data)
        }
        console.log("本地保存数据",this.localRouteData,this.localRouteDataMac);

        if (this.switchValue) {
            console.log("添加标记")
            this.addMarker(data);
        }else{
            console.log("绘制轨迹")
            this.drawRoute(this.mac,data);
        }
      });
    },
    //测试数据
    testSocket:function(){
      var socket = io('ws://127.0.0.1:3000')
      socket.on('connect', function() {
        console.log('连接成功！');
      });
      socket.on('testData',(testdata)=>{
        console.log("testData数据接收")
        testdata.time = this.global.formatDate(new Date());
        //保存数据
        let localIndex = this.localRouteDataMac.indexOf(testdata.devEUI);
        if (localIndex===-1) {
          this.localRouteData.push(testdata);
          this.localRouteDataMac.push(testdata.devEUI);
        }else {
          this.localRouteData.splice(localIndex,1,testdata)
        }
        console.log("本地保存数据",this.localRouteData,this.localRouteDataMac);

        if (this.switchValue) {
           this.addMarker(testdata);
        }else {
            this.drawRoute(this.mac,testdata);
        }

      })
    },
    //绘制轨迹
    drawRoute:function(mac,data){
      if (data.devEUI === mac) {
        console.log(data.devEUI,mac);
        // this.addNewMarker(data);
        AMap.service(["AMap.Walking"],() => {
            var lnglat = new AMap.LngLat(data.longitude,data.latitude);
            AMap.convertFrom(lnglat,"gps",(status,result) => {
                if (this.routeData1.length === 0) {
                    this.addNewMarker(data,startMarker);
                    console.log("起始坐标",this.marker);
                    this.routeData1 = [result.locations[0].getLng(),result.locations[0].getLat()];
                }else {
                  this.addNewMarker(data);
                  this.routeData2 = [result.locations[0].getLng(),result.locations[0].getLat()];
                  new AMap.Walking({map:this.amap,hideMarkers:true}).search(this.routeData1,this.routeData2,()=>{
                      this.routeData1 = this.routeData2;
                  })
                }
            })
        })
      }else {
        console.log("mac不匹配")
      }
    },
    //添加新标记
    addNewMarker:function(data,urlIcon){
        var lnglat = new AMap.LngLat(data.longitude,data.latitude);
        var _this = this;
        //闭包
        (function(){
          AMap.convertFrom(lnglat,"gps",(status,result)=>{
            //创建标记
            if (urlIcon) {
              var marker = new AMap.Marker({
                position: result.locations[0],
                title: data.mac,
                map: _this.amap,
                offset:new AMap.Pixel(-18,-44),
                icon: urlIcon
              });
            }else{
              var marker = new AMap.Marker({
                position: result.locations[0],
                title: data.mac,
                map: _this.amap,
                // label:{content:data.car_number,offset:new AMap.Pixel(-25,-25)}
              });
            }
            marker.time = data.time;
            if (_this.switchValue) {
              _this.mouseOverCarInfo(data.devEUI,function(res){
                marker.setLabel({content:res.data.data.list.car_number,offset:new AMap.Pixel(-25,-22)})
              })
              _this.markers.push(marker);
            }else {
              _this.routeMarkers.push(marker);
            }
            // _this.marker.mac = data.devEUI;
            console.log("markers",_this.markers)
            //点击事件
            AMap.event.addListener(marker, 'click',(e) => {
                _this.amap.setCenter(e.target.getPosition());
                _this.amap.setZoom(16);
             });
             //划过事件
            AMap.event.addListener(marker,'mouseover',(e) => {
                  _this.global.lonlatToAddr(result.locations[0],_this.mouseoverData);
                  _this.mouseoverData.latitude =data.latitude;
                  _this.mouseoverData.longitude = data.longitude;
                  // _this.getUserInfo(data.devEUI);
                  _this.mouseoverData.time = data.time;
                  _this.mouseOverCarInfo(data.devEUI,function(res){
                    setTimeout(() => {
                        AMap.plugin('AMap.AdvancedInfoWindow',() => {
                            //实例化信息窗体
                           var title = '车牌号: '+_this.carInfo.car_number,
                           content = [];
                           content.push('<span class="info-span" style="font-weight:bold">颜色：</span>'+_this.carInfo.color);
                           content.push('<span class="info-span" style="font-weight:bold">类型：</span>'+_this.carInfo.car_type);
                           content.push('<span class="info-span" style="font-weight:bold">时间：</span>'+marker.time);
                           content.push('<span class="info-span" style="font-weight:bold">位置：</span>'+_this.mouseoverData.address)
                           var infoWindow = new AMap.InfoWindow({
                               isCustom: true,  //使用自定义窗体
                               content: _this.global.createInfoWindow(title, content.join("<br/>")),
                               offset: new AMap.Pixel(16, -45)
                           });
                           infoWindow.open(_this.amap,e.target.getPosition())
                       });
                     },200);
                     _this.carnumber = _this.carInfo.car_number;
                     _this.findDeviceByCarNum(()=>{});
                  });
             });
             //划出事件
            AMap.event.addListener(marker,'mouseout',()=>{
                _this.amap.clearInfoWindow();
            })
          });
        }());
        return this.marker;
    },
    //输入框搜索
    handleIconClick:function(){
        this.findDeviceByCarNum(()=>{
          this.mac = this.carUserInfo.mac;
          //开关处在位置
          if (this.switchValue) {
            let markerIndex = this.devEUIs.indexOf(this.carUserInfo.mac);
            if (markerIndex===-1) {
              this.$message.warning("地图上还未显示此标记");
            }else {
              this.amap.setCenter(this.markers[markerIndex].getPosition());
              this.amap.setZoom(18);
            }
          }else {          //开关处在轨迹
            this.amap.clearMap();
            this.markers = [];
            this.routeData1 = [];
            this.routeMarkers=[];
            let localRouteIndex = this.localRouteDataMac.indexOf(this.mac);

            if (localRouteIndex!==-1) {
              this.drawRoute(this.mac,this.localRouteData[localRouteIndex]);
              setTimeout(()=>{
                this.amap.setCenter(this.routeMarkers[0].getPosition());
                this.amap.setZoom(18);
              },500)

            }else {
              this.$message.info("正在显示轨迹");
            }
          }
        });
    },
    //开关切换事件
    switchChange:function() {
        this.amap.clearMap();
        this.markers=[];
        this.devEUIs=[];
        this.routeMarkers=[];
        this.routeData1=[];
        console.log("开关切换");
        //在地图上显示本地数据
        if (this.switchValue) {
          this.localRouteData.forEach((item,index)=>{
            this.addMarker(item)
          })
        }

    },
    //信息表格
    toggleInfoBox:function(){
        this.toggleInfoBoxValue = !this.toggleInfoBoxValue;
        console.log(this.toggleInfoBoxValue);
        if (this.toggleInfoBoxValue) {
            this.$refs.realtimeMap.style.width = "73%";
            this.$refs.elIcon.className = "el-icon-d-arrow-right";
        }else {
            this.$refs.realtimeMap.style.width = "100%";
            this.$refs.elIcon.className = "el-icon-d-arrow-left";
            console.log(this.$refs.realtimeMap)
        }
    },
    //添加标记
    addMarker:function(data){
        //添加覆盖物
      var arrIndex = this.devEUIs.indexOf(data.devEUI);
       if (!this.devEUIs.length || arrIndex === -1) {
          this.addNewMarker(data);
          this.devEUIs.push(data.devEUI);
          console.log("this.devEUIs",this.devEUIs)
       }else {
         this.update(data,arrIndex);
       }
    },
    //鼠标划过显示车辆信息
    mouseOverCarInfo:function(Mac,cb){
      this.$http.post(this.urlSearchCarByMac,{mac:Mac},{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            this.carInfo = res.data.data.list;
            cb(res);
          }
      },(res)=>{
        console.log(res.status);
        this.$message.error("数据请求出现错误")
      })
    },
    //更新地图覆盖物的位置
    update:function (data,i) {
        var lnglat = new AMap.LngLat(data.longitude,data.latitude);
        AMap.convertFrom(lnglat,"gps",(status,result) => {
          console.log("marker",i);
          var lnglatMove = new AMap.LngLat(result.locations[0].getLng(),result.locations[0].getLat());
          this.markers[i].moveTo(lnglatMove,3000);
          this.markers[i].setTitle(data.devEUI);
          this.markers[i].setMap(this.amap);
          this.markers[i].time=data.time;
        });
    },
  },
  data() {
    return {
      urlUser: this.global.port+"/langyang/Home/Police/searchUserDeviceInfo",
      urlTrack: this.global.port+"/langyang/Home/Police/getRouteByMac",
      urlSearchDeviceByNameOrTele:this.global.port+"/langyang/Home/Police/searchDeviceByNameOrTele",
      urlFindDeviceByCarNum:this.global.port + '/langyang/Home/Police/findDeviceByCarNum',
      urlSearchCarByMac:this.global.port + '/langyang/Home/Police/searchCarByMac',
      mac:"",
      carInfo:{},//用于显示鼠标划过车辆信息
      carUserInfo: {},
      switchValue:true,
      toggleInfoBoxValue:false,
      localRouteData:[],
      localRouteDataMac:[],
      amap:{},
      markers:[],
      routeMarkers:[],
      routeData1:[],
      routeData2:[],
      devEUIs:[],
      mouseoverData:[],
      userCallMac:"",
      tableData:[],
      nameOrTele:"",
      macList:[],
      input5:"",
      select:'',
      carnumber:"HZ000001"
    }
  }
}
</script>

<style lang="less" scoped>
.mapsearch {
    width: 100%;
    height: 97%;
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
            .el-button{
              float: right;
              margin-top: 15px;
              margin-left: 30px;
            }
            span {
                margin-left: 5px;
            }
        }
        .el-switch{
            float: right;
            top: 10px;
            right: 20px;
            .el-switch__core{
                width: 70px;
            }
        }
        .el-input{
          width: 300px;
          .el-input-group__prepend{
            .el-select{
              .el-input {
                // width: 110px !important;
              }
            }
          }

        }

    }
    .content {
        margin-left: 15px;
        margin-right: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 9px;
        background-color: #fff;
        height: 90%;
        .real-time-map {
            // width: 73%;
            width: 100%;
            height: 100%;
            margin-left: 5px;
            display: inline-block;
            transition: width .4s;
            .el-icon-d-arrow-right,.el-icon-d-arrow-left{
                z-index: 120;
                color: #4d4d4d;
                font-size: 20px;
                font-weight: bold;
                position: absolute;
                right: 20px;
                top: 10px;
                background-color: rgba(255, 255, 255, 0.42);
                padding: 6px;
                box-shadow: 3px 4px 3px 0px silver;
                border-radius: 4px;
                cursor: pointer;
                // transition: all 1s;
            }
            .fa-arrows-h{
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
            .fa-arrows-alt{
              z-index: 120;
              color: #4d4d4d;
              font-size: 20px;
              font-weight: bold;
              position: absolute;
              right: 20px;
              bottom: 55px;
              background-color: rgba(255, 255, 255, 0.42);
              padding: 6px;
              box-shadow: 3px 4px 3px 0px silver;
              border-radius: 4px;
              cursor: pointer;
            }
            .el-input{
                z-index: 110;
                width: 200px;
                float:left;
                margin-left: 20px;
                margin-top: 10px;
                box-shadow: 3px 4px 3px 0px silver;
            }
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
                    width: 90px;
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
    .info-box{
        margin-top: 30px;
        .module-ionfo{
            display: inline-block;
            vertical-align: top;
        }
        .user-info{
        }
    }
}
</style>
