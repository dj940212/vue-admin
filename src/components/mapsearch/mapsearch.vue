<template>
<div class="mapsearch">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>实时地图查询</span>
    </div>
    <div class="search-box" v-show="false">
      <input class="search-input" type="text" name="" v-model="mac">
      <button class="search-button class-button" type="button" name="button" @click="submit">搜索</button>
    </div>
    <div class="el-switch">
        <el-switch
          v-model="switchValue"
          on-color="#4e4c75"
          off-color="#222222"
          on-text="位置"
          off-text="轨迹">
        </el-switch>
    </div>
  </div>
  <div class="content">
    <div class="real-time-map" id="real-time-map" ref="realtimeMap">
        <el-input
          placeholder="请输入mac查询"
          icon="search"
          class="el-input"
          v-model="mac"
          :on-icon-click="handleIconClick">
        </el-input>
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
    this.getData();
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
            console.log(this.user)
          }

        } else {
          alert('找不到该设备，请重新输入！');
        }
      }, (res) => {
        console.log(res.status)
      })
    },
    //mock
    getData:function(){
        this.$http.get('data.json').then((res) => {
            console.log(res.data)
        },(res) => {

        })
    },
    //获取轨迹信息
    getTrack: function() {
      this.$http.post(this.urlTrack, {
        mac: this.mac,
        startTime:this.dateValue1,   //this.global.formatDate(this.dateValue1),
        endTime:this.dateValue2     //this.global.formatDate(this.dateValue2)
      }, {
        emulateJSON: true
      }).then((res) => {
          if (this.dateValue1==="" || this.dateValue2==="") {
              alert("请选择时间范围")
          }else {
              console.log("getTrack",res.data)
              if (res.data.data.msg == "success") {
                  this.track = res.data.data.list.location;
                  this.tableData = res.data.data.list.location;
                  this.addMarker();
              } else {
                  alert('找不到该设备，请重新输入！');
              }
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
    addNewMarker:function(data){
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
            _this.markers.push(_this.marker);
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
                        content.push('<span class="info-span" style="font-weight:bold">位置：</span>'+data.address)
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
    handleIconClick:function(){
        this.getUserInfo();
    },
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
    updateMarker:function(){

    }
  },
  data() {
    return {
      mac: "3148369587325565",
      dateValue1:"2017-04-01",
      dateValue2:"2017-04-01",
      urlUser: this.global.port+"/langyang/Home/Police/searchUserDeviceInfo",
      urlTrack: this.global.port+"/langyang/Home/Police/getRouteByMac",
      user: {},
      switchValue:true,
      toggleInfoBoxValue:false,
      amap:{}
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
        height: 89%;
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
        width: 100% !important;
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
