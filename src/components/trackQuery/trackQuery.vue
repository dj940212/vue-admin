<template>
<div class="trackQuery">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>行驶轨迹查询</span>
    </div>
    <div class="dataPicker">
        <div class="mac">
            <label for="">macID:</label>
            <input type="text" name="" value="" v-model="mac">
        </div>
        <div class="block">
           <span class="demonstration">时间范围:</span>
           <el-date-picker
             v-model="dateValue1"
             type="datetime"
             placeholder="选择起始时间">
           </el-date-picker>
        </div>
        <span style="color:#888;">-</span>
        <div class="block" style="display:inline-block">
           <el-date-picker
             v-model="dateValue2"
             type="datetime"
             placeholder="选择结束时间">
           </el-date-picker>
        </div>
        <button type="button" name="button" @click="submit">查询</button>
    </div>

  </div>
  <div class="content">
    <div class="trackQuery-map" id="trackQuery-map">
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
            <td>{{clickData.longitude}}</td>
          </tr>
          <tr>
            <th>当前纬度</th>
            <td>{{clickData.latitude}}</td>
          </tr>
          <tr>
            <th>地区编码</th>
            <td>{{clickData.adcode}}</td>
          </tr>
          <tr>
            <th>点击地址</th>
            <td>{{clickData.addr}}</td>
          </tr>
          <tr>
            <th>时间</th>
            <td>{{clickData.time}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'trackQuery',
  mounted: function() {
    this.initMap();
  },
  created:function(){
  },
  methods: {
    //   初始化地图
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
    //格式化日期
    formatDate:function(value){
        if(value){
            var year = value.getFullYear();
            var month = value.getMonth() + 1;
            var date = value.getDate();
            if (month >=1 && month <= 9) {
                month = "0"+month;
            }
            if (date >= 0 && date <= 9) {
                date = "0"+date;
            }
            return year+"-"+month+"-"+date;
        }
        return
    },
    //获取轨迹信息
    getTrack: function() {
      this.$http.post(this.urlTrack, {
        mac: this.mac,
        startTime: this.formatDate(this.dateValue1),
        endTime:this.formatDate(this.dateValue2)
      }, {
        emulateJSON: true
      }).then((res) => {
        console.log("getTrack",res.data)
        if (res.data.data.msg == "success") {
          this.track = res.data.data.list.location;
          console.log("位置数据",this.track);
          this.addMarker();

        } else {
          alert('getTrack找不到该设备，请重新输入！');
        }
      }, (res) => {
        console.log(res.status)
      })
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
          alert('getUserInfo找不到该设备，请重新输入！');
        }
      }, (res) => {
        console.log(res.status)
      })
    },
    // 提交搜索
    submit: function() {
      console.log(this.mac);
      this.getTrack();
      this.getUserInfo();
      console.log(this.amap)
    },
    //位置转换
    lonlatToAddr: function(lonlat) {
      AMap.service('AMap.Geocoder', () => { //回调函数
        //实例化Geocoder
        var geocoder = new AMap.Geocoder();
        geocoder.getAddress(lonlat, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            //TODO:获得了有效经纬度，可以做一些展示工作
            // console.log(result);
            this.clickData.address = result.regeocode.formattedAddress;
            this.clickData.adcode = result.regeocode.addressComponent.adcode
            console.log(this.clickData);
          } else {
            //获取经纬度失败
          }
        });
      });
    },
    //绘制轨迹
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
                     this.lonlatToAddr(lnglat);
                 })

            })
        })
    }
  },
  data() {
    return {
      mac: "3148369587325565",
      urlTrack: this.global.port+"/langyang/Home/Police/getRouteByMac",
      urlUser: this.global.port+"/langyang/Home/Police/searchUserDeviceInfo",
      user: {},
      track:[],
      amap: {},
      clickData: {},
      dateValue1: '',
      dateValue2: '',
    }
  }
}
</script>

<style lang="less" scoped>
.trackQuery {
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
        .dataPicker{
            display: inline-block;
            float: right;
            margin-right: 50px;
            position: relative;
            top: -4px;
            .mac{
                display: inline-block;
                margin-right: 50px;
                position: relative;
                top: 3px;
                label{
                    font-size: 16px;
                    font-size: #333;
                }
                input{
                    width: 200px;
                    height: 28px;
                    border-radius: 4px;
                    border: 1px solid #bfcbd9;
                    font-size: 14px;
                    padding: 3px 10px;
                }
            }
            button{
                height: 34px;
                width: 100px;
                background-color: #4e4c75;
                margin-left: 50px;
                border: 0;
                border-radius: 2px;
                color: #fff;
            }
            .block{
                display: inline-block;
                .demonstration{
                    font-size: 16px;
                }
            }
        }
    }
    .content {
        margin-left: 22px;
        margin-right: 22px;
        padding-top: 10px;
        background-color: #fff;
        height: 89%;
        .trackQuery-map {
            width: 73%;
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
    .trackQuery-map{
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
