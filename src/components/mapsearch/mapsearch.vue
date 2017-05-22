<template>
<div class="mapsearch">
  <div class="header">
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
  <div class="content">
    <div class="real-time-map" id="real-time-map" ref="realtimeMap">
        <el-autocomplete
          class="inline-input"
          v-model="nameOrTele"
          :fetch-suggestions="querySearch"
          placeholder="请输入手机号码查询"
          :trigger-on-focus="true"
          @select="handleSelect"
        ></el-autocomplete>
        <i class="el-icon-d-arrow-left" @click="toggleInfoBox" ref="elIcon"></i>
    </div>
    <div class="info-box" v-show="toggleInfoBoxValue">
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
            <td>{{(user.sex===1)?"女":"男"}}</td>
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
            <td>{{mouseoverData.latitude}}</td>
          </tr>
          <tr>
            <th>当前纬度</th>
            <td>{{mouseoverData.longitude}}</td>
          </tr>
          <tr>
            <th>地区编码</th>
            <td>{{mouseoverData.adcode}}</td>
          </tr>
          <tr>
            <th>点击地址</th>
            <td>{{mouseoverData.address}}</td>
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
    this.keepsocket();
    this.testSocket();
    this.global.bus.$on("arrIndex",(index) => {
        // this.mac = this.tableData[index].mac;
        // console.log(this.tableData[index].mac);
    })
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
    //建立websocket链接
    keepsocket: function() {
      var socket = io('ws://121.196.194.14:3002'); //121.196.194.14:3002
      socket.on('connect', function() {
        console.log('连接成功！');
      });
      socket.on('message', (data) => {
        console.log("收到数据", data);
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
        console.log("testData",testdata)
        if (this.switchValue) {
           this.addMarker(testdata);
        }else {
            this.drawRoute(this.mac,testdata)
        }

      })
    },
    //绘制轨迹
    drawRoute:function(mac,data){
      if (data.devEUI === mac) {
        console.log(data.devEUI,mac);
        AMap.service(["AMap.Walking"],() => {
            var lnglat = new AMap.LngLat(data.longitude,data.latitude);
            AMap.convertFrom(lnglat,"gps",(status,result) => {
                if (this.routeData1.length === 0) {
                    this.routeData1 = [result.locations[0].getLng(),result.locations[0].getLat()];
                }else {
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
    addNewMarker:function(data){
        var lnglat = new AMap.LngLat(data.longitude,data.latitude);
        var _this = this;
        //闭包
        (function(){
          AMap.convertFrom(lnglat,"gps",(status,result)=>{
            //创建标记
            _this.marker = new AMap.Marker({
              position: result.locations[0],
              title: data.mac,
              map: _this.amap
            });
            _this.marker.mac = data.devEUI;
            _this.markers.push(_this.marker);
            console.log(_this.marker)
            //点击事件
            AMap.event.addListener(_this.marker, 'click',(e) => {
                _this.amap.setCenter(e.target.getPosition());
                _this.amap.setZoom(16);
                _this.getUserInfo(data.devEUI);
             });
             //划过事件
            AMap.event.addListener(_this.marker,'mouseover',(e) => {
                  _this.global.lonlatToAddr(result.locations[0],_this.mouseoverData);
                  _this.mouseoverData.latitude =data.latitude;
                  _this.mouseoverData.longitude = data.longitude;
                  _this.getUserInfo(data.devEUI);
                 setTimeout(() => {
                     AMap.plugin('AMap.AdvancedInfoWindow',() => {
                         //实例化信息窗体
                        var title = 'mac : '+data.devEUI,
                        content = [];
                        // content.push('<span class="info-span" style="font-weight:bold">海拔：</span>'+data.altitude);
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
            })
          });
        }());
    },
    //输入框搜索
    handleIconClick:function(){
        this.getUserInfo(this.mac);

        this.amap.setCenter(this.markers[this.devEUIs.indexOf(this.mac)].getPosition());
        this.amap.setZoom(16);
    },
    //开关切换事件
    switchChange:function() {
        this.amap.clearMap();
        console.log("开关切换")
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
      console.log(!this.devEUIs.length);
       if (!this.devEUIs.length) {
          this.addNewMarker(data);
          this.devEUIs.push(data.devEUI);
          console.log("this.devEUIs",this.devEUIs)
       }else {
         var arrIndex = this.devEUIs.indexOf(data.devEUI);
         if(arrIndex !== -1){
              this.update(data,arrIndex);
         }else {
           this.addNewMarker(data);
           this.devEUIs.push(data.devEUI);
           console.log("this.devEUIs",this.devEUIs)
         }
       }
    },
    //更新地图覆盖物的位置
    update : function (data,i) {
        var lnglat = new AMap.LngLat(data.longitude,data.latitude);
        AMap.convertFrom(lnglat,"gps",(status,result) => {
          console.log("marker",i);
          this.markers[i].setPosition(result.locations[0]);
          this.markers[i].setTitle(data.devEUI);
          this.markers[i].setMap(this.amap);
          console.log("更新位置完成")
        });
    },
    //输入框获取mac
    querySearch(queryString, cb) {
        // var restaurants = this.restaurants;
        this.searchDeviceByNameOrTele(()=>{
          var results = this.macList
          cb(results);
          console.log("results",results);
        })
    },
    //选择建议项
    handleSelect(item) {
      console.log(item);
      this.mac =item.mac;
      this.getUserInfo(this.mac);
      if (this.devEUIs.indexOf(this.mac) !== -1) {
        this.amap.setCenter(this.markers[this.devEUIs.indexOf(this.mac)].getPosition());
        this.amap.setZoom(16);
      }else {
        this.$message.error('地图上没有该标记');
      }
     }
  },
  data() {
    return {
      urlUser: this.global.port+"/langyang/Home/Police/searchUserDeviceInfo",
      urlTrack: this.global.port+"/langyang/Home/Police/getRouteByMac",
      urlSearchDeviceByNameOrTele:this.global.port+"/langyang/Home/Police/searchDeviceByNameOrTele",
      mac:"",
      user: {},
      switchValue:true,
      toggleInfoBoxValue:false,
      amap:{},
      markers:[],
      routeData1:[],
      routeData2:[],
      devEUIs:[],
      mouseoverData:[],
      userCallMac:"",
      tableData:[],
      nameOrTele:"",
      macList:[],
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
            .el-autocomplete{
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
    // .real-time-map{
    //     width: 100% !important;
    // }
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
