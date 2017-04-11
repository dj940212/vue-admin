<template>
<div class="trackQuery">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>行驶轨迹查询</span>
    </div>
    <form class="" action="index.html" method="post">
        <label for="">mac地址</label>
        <input type="text" name="" value="">
        <label for="">时间范围</label>
        <input type="text" name="" value="">
        <button type="button" name="button">搜索</button>
    </form>
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
  name: 'trackQuery',
  mounted: function() {
    this.initMap();
  },
  methods: {
    //   初始化地图
    initMap: function() {
      var mapOptions = {
        zoom: 16,
        center: [120.01335374840001, 30.2846277638], //定位到海创园
        resizeEnable: true
      }

      var amap = new AMap.Map('trackQuery-map', mapOptions);
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
        form{
            display: inline-block;
            float: right;
            label{
                font-size: 16px;
                line-height: 64px;
            }
            input{
                width: 30%;
                height: 29px;
                border-radius: 4px;
                font-size: 16px;
                &:focus{
                    outline: none;
                }
            }
            button{
                height: 29px;
                background-color: #03003a;
                color: #fff;
                border: 0;
                border-radius: 5px;
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
