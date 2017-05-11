<template>
<div class="stationmap">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>用户电子围栏</span>
    </div>
  </div>
  <div class="content">
    <div class="base-station-map" id="base-station-map">
        <el-input
          placeholder="请输入基站mac"
          icon="search"
          class="el-input"
          v-model="id"
          :on-icon-click="searchEleFence">
        </el-input>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'stationmap',
  mounted: function() {
    this.initMap();
    this.getUserInfo();
    this.searchUser();
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
    //电子围栏
    getEleFence: function() {
      this.$http.post(this.urlEleFence, {
        userid: this.id
      }, {
        emulateJSON: true
      }).then((res) => {
        if (res.data.lp == 0 && res.data.data.msg == "请求成功") {
          if (res.data.data.list) {
            this.eleFenceData = res.data.data.list;
            console.log("eleFence",this.eleFenceData)
            if (this.eleFenceData.length !== 0) {
              this.eleFenceData.forEach((item,idex) => {
                this.drawCircle(item)
              })
            }

          }
        } else {
          alert('找不到用户');
        }
      }, (res) => {
        console.log(res.status)
      })
    },
    //获取用户信息
    getUserInfo: function() {
      this.$http.post(this.urlUserInfo, {
        id: "66"
      }, {
        emulateJSON: true
      }).then((res) => {
        if (res.data.lp == 0 && res.data.data.msg == "请求成功") {
          if (res.data.data.list) {
            this.eleFence = res.data.data.list;
            console.log("userinfo",this.eleFence)
          }
        } else {
          alert('找不到用户');
        }
      }, (res) => {
        console.log(res.status)
      })
    },
    //查找电子围栏
    searchEleFence: function(){
      this.getEleFence();

    },
    //draw circle
    drawCircle: function(data,index){
      var lnglat = new AMap.LngLat(data.longitude,data.latitude);
      AMap.convertFrom(lnglat,"gps",(status,result)=>{
        //创建标记
        this.circle = new AMap.Circle({
          center: result.locations[0],
          map: this.amap,
          radius: data.radius,
          fillOpacity:0.3
        });
        this.amap.setCenter(result.locations[0]);
        this.circles[index] = this.circle;

        //点击事件
        AMap.event.addListener(this.circle, 'click',(e) => {
            this.amap.setCenter(this.amap.setCenter(result.locations[0]));
            this.amap.setZoom(16);
         });
         //划过事件
        AMap.event.addListener(this.circle,'mouseover',(e) => {
              this.global.lonlatToAddr(result.locations[0],this.mouseoverData);
             setTimeout(() => {
                 AMap.plugin('AMap.AdvancedInfoWindow',() => {
                     //实例化信息窗体
                    var title = 'id: '+data.id,
                    content = [];
                    content.push('<span class="info-span" style="font-weight:bold">海拔：</span>'+data.adcode);
                    content.push('<span class="info-span" style="font-weight:bold">经度：</span>'+data.latitude);
                    content.push('<span class="info-span" style="font-weight:bold">纬度：</span>'+data.longitude);
                    content.push('<span class="info-span" style="font-weight:bold">位置：</span>'+this.mouseoverData.address)
                    var infoWindow = new AMap.InfoWindow({
                        isCustom: true,  //使用自定义窗体
                        content: this.global.createInfoWindow(title, content.join("<br/>")),
                        offset: new AMap.Pixel(16, -45)
                    });
                    infoWindow.open(this.amap,result.locations[0])
                });
            },200);

         });
         //划出事件
        AMap.event.addListener(this.circle,'mouseout',()=>{
            this.amap.clearInfoWindow();
        });
      });
    },
    searchUser:function(){
      this.$http.post(this.urlSearchUser, {
        idnumber_or_phone:"18768379083"
      }, {
        emulateJSON: true
      }).then((res) => {
        if (res.data.lp == 0 && res.data.data.msg == "请求成功") {
          if (res.data.data.list) {
            console.log("userinfo",res.data.data.list)
          }
        } else {
          alert('找不到用户');
        }
      }, (res) => {
        console.log(res.status)
      })
    }
  },
  data() {
    return {
      id: "2",
      amap:{},
      mouseoverData:{},
      markers:[],
      circle:{},
      circles:[],
      eleFenceData: [],
      stationMac:[],
      urlEleFence: this.global.port+"/langyang/Home/Police/watchElectronicFences",
      urlUserInfo: this.global.port+"/langyang/Home/Police/watchInfo",
      urlSearchUser: this.global.port+"/langyang/Home/Police/searchUser",
      user: {},
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
