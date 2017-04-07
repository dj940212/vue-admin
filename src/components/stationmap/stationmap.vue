<template>
<div class="stationmap">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>基站状态查询</span>
    </div>
    <div class="search-box">
      <input class="search-input" type="text" name="" v-model="mac">
      <button class="search-button button" type="button" name="button" @click="submit">搜索</button>
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
            <td></td>
          </tr>
          <tr>
            <th>经度</th>
            <td></td>
          </tr>
          <tr>
            <th>纬度</th>
            <td></td>
          </tr>
          <tr>
            <th>海拔</th>
            <td></td>
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
    this.keepsocket();
  },
  methods: {
    //   初始化地图
    initMap: function() {
      var mapOptions = {
        zoom: 16,
        center: [120.01335374840001, 30.2846277638], //定位到海创园
        resizeEnable: true
      }

      var amap = new AMap.Map('base-station-map', mapOptions);
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
        amap.addControl(new AMap.ToolBar());
        amap.addControl(new AMap.Scale());
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
    //位置转换
    lonlatToAddr: function(lonlat) {
      AMap.service('AMap.Geocoder', function() { //回调函数
        //实例化Geocoder
        var geocoder = new AMap.Geocoder();

        geocoder.getAddress(lonlat, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            //TODO:获得了有效经纬度，可以做一些展示工作
            console.log(result);
            $scope.clickData.address = result.regeocode.formattedAddress;
            $scope.clickData.adcode = result.regeocode.addressComponent.adcode
            console.log($scope.clickData);
          } else {
            //获取经纬度失败
          }
        });
      });
    },
    addMarker: function(data){
    }

  },
  data() {
    return {
      mac: "",
      apiUrl: "http://121.196.194.14/langyang/Home/Police/searchUserDeviceInfo",
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
    .real-time-map{
        width: 98% !important;
    }
}
</style>
