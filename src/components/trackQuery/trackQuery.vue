<template>
<div class="trackQuery">
  <div class="header">
    <div class="title">
      <i class="icon iconfont">&#xe612;</i>
      <span>行驶轨迹查询</span>
    </div>
    <span class="tableDataOnOff" @click="showTableData"><i class="icon iconfont" >&#xe742;</i>全部数据</span>
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
              placeholder="请输入基站mac"
              icon="search"
              class="el-input"
              v-model="mac"
              v-popover:popover1
              :on-icon-click="handleIconClick">
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
  </div>
  <div class="tableData" v-show="tableDataToggle">
      <el-table
          :data="tableData"
          height="500"
          style="width: 100%;"
          empty-text="请先输入mac查询"
          :default-sort = "{prop: 'time', order: 'descending'}">
          <el-table-column
              prop="id"
              label="id"
              width="180">
          </el-table-column>
          <el-table-column
              prop="latitude"
              label="经度"
              width="180">
          </el-table-column>
          <el-table-column
              prop="longitude"
              label="纬度"
              width="180">
          </el-table-column>
          <el-table-column
              prop="time"
              label="时间"
              width="180">
          </el-table-column>
          <el-table-column
              prop="adcode"
              label="地区编码"
              width="180">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              width="180">
          </el-table-column>
      </el-table>
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
      this.getTrack();
      this.getUserInfo();
    },
    //绘制轨迹
    addMarker: function(){
        this.amap.clearMap();
        this.track.forEach((data,index) => {
            //高德地址转换
            var lnglat = new AMap.LngLat(data.longitude,data.latitude)
            AMap.convertFrom(lnglat,"gps",(status,result) => {
                //初始化marker
                var marker = new AMap.Marker({
                   title:index,
                   position:result.locations[0],
                   map:this.amap
                //    animation:"AMAP_ANIMATION_DROP"
                });
                this.routeData.push([result.locations[0].getLng(),result.locations[0].getLat()])

                AMap.event.addListener(marker,'mouseover',(e) => {
                     this.mouseoverData = data;
                     this.global.lonlatToAddr(result.locations[0],this.mouseoverData);
                     setTimeout(() => {
                         AMap.plugin('AMap.AdvancedInfoWindow',() => {
                             //实例化信息窗体
                            var title = '姓名：'+this.user.realname+'<span class="info-span" style="font-size:11px;">手机号:'+this.user.telephone+'</span>',
                            content = [];
                            content.push('<span class="info-span" style="font-weight:bold">定位物mac：</span>'+this.mac);
                            content.push('<span class="info-span" style="font-weight:bold">经纬度：</span>'+result.locations[0]);
                            content.push('<span class="info-span" style="font-weight:bold">当前位置：</span>'+this.mouseoverData.address)
                            this.infoWindow = new AMap.InfoWindow({
                                isCustom: true,  //使用自定义窗体
                                content: this.global.createInfoWindow(title, content.join("<br/>")),
                                offset: new AMap.Pixel(16, -45)
                            });
                            this.infoWindow.open(this.amap,e.target.getPosition())
                        });
                    },100);

                 });
                AMap.event.addListener(marker,'mouseout',()=>{
                    this.amap.clearInfoWindow();
                })

                //表格数据
                this.global.lonlatToAddr(result.locations[0],data)
                // this.allData.push(data);
            })
        })
        // console.log(this.allData)
        // this.tableData = this.allData;

    },
    //显示关闭数据表格
    showTableData: function(){
        // this.tableDataToggle = !this.tableDataToggle;
        // this.addMarker();
        this.amap.clearMap();
        this.mydriving();
        console.log("routeData",this.routeData.length);
        console.log("track",this.track.length);
    },
    handleIconClick: function(){
        this.submit();
        // setTimeout(()=>{
        //     this.mydriving();
        // },20000)
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
      mouseoverData: {},
      allData:[],
      dateValue1: '2017-04-01',
      dateValue2: '2017-04-01',
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
      routeData:[]
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
    }
    .tableData{
        position: absolute;
        background-color: red;
        top: 140px;
        left: 120px;
        z-index: 200;
    }
}
</style>
