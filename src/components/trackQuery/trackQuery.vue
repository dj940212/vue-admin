<template>
<div class="trackQuery">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>行驶轨迹查询</span>
    </div>
    <span class="tableDataOnOff" @click="showTableData"><i class="icon iconfont" >&#xe742;</i>查看数据</span>
  </div>
  <div class="content">
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
              placeholder="请输入mac查询"
              icon="search"
              class="el-input"
              v-model="mac"
              v-popover:popover1
              :on-icon-click="handleIconClick"
              :fetch-suggestions="getMac">
            </el-input>
        </div>
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
            height="500"
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
export default {
  name: 'trackQuery',
  mounted: function() {
    this.initMap();
  },
  created:function(){
  },
  methods: {
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
              if (res.data.data.msg == "success") {
                  this.track = res.data.data.list.location;
                  this.tableData = res.data.data.list.location;
                    // this.addMarker();
                  this.drawRoute(this.track);
                  this.track.forEach((item,index)=>{
                    //高德地址转换
                    var lnglat = new AMap.LngLat(item.longitude,item.latitude);
                    this.global.lonlatToAddr(lnglat,item);
                    // console.log(item)
                  })

                  console.log("初始地址",this.track)
              } else {
                  alert('找不到该设备，请重新输入！');
              }
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
    //获取mac来查询
    getMac:function(){

    },
    // 提交搜索
    submit: function() {
      this.getTrack();
      this.getUserInfo();
    },
    //绘制轨迹
    drawRoute:function(data){
        AMap.service(["AMap.Walking"],() => {
            this.amap.clearMap();
            var i = 0;
            var timer = setInterval(() => {
                if (i >= data.length-1) {
                    clearInterval(timer);
                    //显示起终标记
                    console.log(document.querySelectorAll(".amap-lib-marker-to"));
                    var endMarkers = document.querySelectorAll(".amap-lib-marker-to");
                    var startMarkers = document.querySelectorAll(".amap-lib-marker-from")
                    endMarkers[endMarkers.length-1].style.display = "block";
                    startMarkers[0].style.display="block";
                }else {
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
            },700)
        })
    },
    //绘制轨迹
    drawRoute2:function(data){
        AMap.service(["AMap.Walking"],() => {
            this.amap.clearMap();
            let i = 0;
            while (i < data.length-1) {
              var lnglat1 = new AMap.LngLat(data[i].longitude,data[i].latitude);
              console.log("======1111=======",i);
              AMap.convertFrom(lnglat1,"gps",(status,result) => {
                  this.newRouteData1 = [result.locations[0].getLng(),result.locations[0].getLat()];
                  var lnglat2 = new AMap.LngLat(data[i+1].longitude,data[i+1].latitude);
                  console.log("======2222=======",i+1);
                  AMap.convertFrom(lnglat2,"gps",(status,result) => {
                      this.newRouteData2 = [result.locations[0].getLng(),result.locations[0].getLat()];
                      console.log(this.newRouteData1,this.newRouteData2);
                        new AMap.Walking({map:this.amap,hideMarkers:false}).search(this.newRouteData1,this.newRouteData2,(status,result)=>{
                            if (status === "complete") {
                                i++;
                            }
                        })
                  })
              })
            }
        })
    },
    //显示关闭数据表格
    showTableData: function(){
        this.tableDataToggle = !this.tableDataToggle;
        // this.addMarker();
        // this.amap.clearMap();
        // this.mydriving();
        // console.log("routeData",this.routeData.length);
        // console.log("track",this.track.length);
    },
    handleIconClick: function(){
        this.submit();
    },
    mydriving:function(){
        //步行导航
        this.amap.clearMap();
        AMap.service(["AMap.Walking"], () => {
            for (var i = 0; i < this.routeData.length-1; i++) {
                new AMap.Walking({map:this.amap,hideMarkers:true}).search(this.routeData[i],this.routeData[i+1])
            }
        })
        console.log("线路规划");

    },
  },
  data() {
    return {
      mac: "3148369587325565",
      urlTrack: this.global.port+"/langyang/Home/Police/getRouteByMac2",
      urlUser: this.global.port+"/langyang/Home/Police/searchUserDeviceInfo",
      urlGetMac: this.global.port+"/langyang/Home/Police/searchDeviceByNameOrTele",
      user: {},
      track:[],
      amap: {},
      clickData: {},
      mouseoverData: {},
      allData:[],
      dateValue1: new Date('Sat Apr 01 2017 19:00:30 GMT+0800'),
      dateValue2: new Date('Sat Apr 01 2017 19:02:30 GMT+0800'),
      tableData: [],
      infoWindow:{},
      tableDataToggle: false,
      testRouteData:[
          [120.016444,30.279617],
          [120.017597,30.279954],
          [120.018322,30.280239],
          [120.018171,30.281146],
          [120.017827,30.28271],
          [120.01775,30.283475],
          [120.019013,30.283011]
      ],
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
        }
        .tableData{
            position: absolute;
            background-color: red;
            top: 130px;
            left: 40px;
            width: 94%;
            z-index: 200;
        }
    }

}
</style>
