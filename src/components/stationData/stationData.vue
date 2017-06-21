<template>
    <div class="stationData">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>基站数据</span>
          </div>
          <div class="addStation" >
            <el-tooltip class="item" effect="dark" content="添加基站" placement="top">
              <i class="el-icon-plus" v-bind:class="{active:addValue}" @click="addValue=!addValue"></i>
            </el-tooltip>
          </div>
          <el-input
            placeholder="请输入关键字查询"
            icon="search"
            class="el-input"
            v-model="mac"
            :on-icon-click="searchStation"
            @change="searchStation">
          </el-input>
          <div class="triangle-up" v-show="addValue"></div>
        </div>
        <div class="content">
            <div class="table-data">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <!-- <el-table-column
                      prop="id"
                      label="id"
                      width="90">
                    </el-table-column> -->
                    <el-table-column
                      prop="mac"
                      label="基站mac">
                    </el-table-column>
                    <el-table-column
                      prop="altitude"
                      label="海拔"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="longitude"
                      label="经度">
                    </el-table-column>
                    <el-table-column
                      prop="latitude"
                      label="纬度">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                    </el-table-column>
                    <el-table-column
                      prop="adcode"
                      label="地区编码">
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      prop="type"
                      label="操作"
                      width="120">
                      <template scope="scope">
                        <el-tooltip class="item" effect="dark" content="删除基站" placement="top">
                          <el-button @click="openMessageBoxDelete(scope.$index)" type="danger" icon="delete" size="small"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="修改基站" placement="top">
                          <el-button type="warning" size="small" icon="edit" @click="getChangeStaionPost(scope.$index)"></el-button>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <el-dialog
          title="修改基站信息"
          :visible.sync="dialogVisible"
          size="tiny">
          <el-form ref="form" :model="changeStationPost" label-width="80px">
            <el-form-item label="基站mac">
              <el-input v-model="changeStationPost.mac"></el-input>
            </el-form-item>
            <el-form-item label="经度">
              <el-input v-model="changeStationPost.longitude"></el-input>
            </el-form-item>
            <el-form-item label="纬度">
              <el-input v-model="changeStationPost.latitude"></el-input>
            </el-form-item>
            <el-form-item label="海拔">
              <el-input v-model="changeStationPost.altitude"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeStaion(tableDataIndex)">确 定</el-button>
          </span>
        </el-dialog>

        <div class="addForm" v-show="addValue">
            <el-form ref="form" :model="addStationPost" label-width="80px">
              <el-form-item label="基站mac">
                <el-input v-model="addStationPost.mac"></el-input>
              </el-form-item>
              <el-form-item label="经度">
                <el-input v-model="addStationPost.longitude"></el-input>
              </el-form-item>
              <el-form-item label="纬度">
                <el-input v-model="addStationPost.latitude"></el-input>
              </el-form-item>
              <el-form-item label="海拔">
                <el-input v-model="addStationPost.altitude"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary" @click="openMessageBoxAdd">添加基站</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import searchBox from '@/components/searchBox/searchBox'
export default {
  name: 'userInfoManage',
  mounted:function(){
     this.getBaseStation();
  },
  data:function(){
      return {
          urlStation:this.global.port+"/langyang/Home/Police/getBaseStations",
          urlAddStation:this.global.port+"/langyang/Home/Police/addBaseStation",
          urlChangeStation:this.global.port+"/langyang/Home/Police/changeBaseStation",
          urlDeleteStation:this.global.port+"/langyang/Home/Police/deleteBaseStation",
          tableData:[],
          stationData:[],
          id:"",
          tableDataIndex:null,
          dialogVisible: false,
          longitude:"",
          latitude:"",
          altitude:"",
          mac:"",
          loading:true,
          addValue:false,
          addStationPost:{
            id:"66",
            longitude:"",
            latitude:"",
            altitude:"",
            mac:""
          },
          changeStationPost:{
            station_id:64,
            id:66,
            longitude:888,
            latitude:888,
            altitude:888,
            mac:888
          }
      }
  },
  methods:{
      //获取基站信息
      getBaseStation: function() {
        this.$http.post(this.urlStation, {
          id: 1
        }, {
          emulateJSON: true
        }).then((res) => {
          console.log(res.data)
          if (res.data.lp == 0 && res.data.data.msg == "请求成功") {
            this.stationData = res.data.data.list;
            this.stationData.forEach((item,index) => {
              var lnglat = new AMap.LngLat(item.longitude,item.latitude);
              this.global.lonlatToAddr2(lnglat,item,()=>{
                this.tableData.push(item);
              });
            })
          } else {
            console.log('基站数据请求失败');
          }
        }, (res) => {
          console.log(res.status)
        })
      },
      //查询基站
      searchStation:function(){
        this.tableData = this.stationData;
        this.tableData = this.tableData.filter((value)=>{
          if (this.mac === "") {
            return true
          }else {
            for(var key in value){
              if (value[key] && value[key].indexOf(this.mac)!==-1) {
                return true
              }
            }
          }
        })
      },
      //添加基站
      addStation:function(cb){
        this.$http.post(this.urlAddStation,this.addStationPost,{
          emulateJSON:true
        }).then((res)=>{
          if (res.data.data.msg === "请求成功" && res.data.lp ===0) {
            console.log("添加基站成功");
            cb();
            let newData = {};
            newData.id = res.data.data.list.basestation_id;
            newData.mac = this.addStationPost.mac;
            newData.latitude = this.addStationPost.latitude;
            newData.longitude = this.addStationPost.longitude;
            newData.altitude = this.addStationPost.altitude;
            this.tableData.unshift(newData)
          }else{
            console.log("添加基站失败");
          }
        },(res)=>{
        })
      },
      //移除基站
      delStation:function(nowid,cb){
        this.$http.post(this.urlDeleteStation,{stationid:nowid,id:66},{
          emulateJSON:true
        }).then((res)=>{
          if (res.data.data.msg === "请求成功" && res.data.lp ===0) {
            console.log("删除基站成功")
            cb();
          }else{
            console.log("删除基站失败");
          }
        },(res)=>{

        })
      },
      //修改基站
      changeStaion:function(index){

        this.$http.post(this.urlChangeStation,this.changeStationPost,{
          emulateJSON:true
        }).then((res)=>{
          if (res.data.data.msg === "请求成功" && res.data.lp ===0) {
            console.log("修改基站成功");
            this.tableData[index].latitude = this.changeStationPost.latitude;
            this.tableData[index].longitude = this.changeStationPost.longitude;
            this.tableData[index].altitude = this.changeStationPost.altitude;
            this.tableData[index].mac = this.changeStationPost.mac;
            this.dialogVisible = false;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
            this.$message.error("修改失败")
          }
        },(res)=>{
          this.$message.error("请求发生错误")
        })
      },
      //请求参数
      getChangeStaionPost:function(index){
        this.tableDataIndex = index;
        this.dialogVisible = true;
        this.changeStationPost.id = "66";
        this.changeStationPost.station_id = this.tableData[index].id;
        this.changeStationPost.latitude = this.tableData[index].latitude;
        this.changeStationPost.longitude = this.tableData[index].longitude;
        this.changeStationPost.altitude = this.tableData[index].altitude;
        this.changeStationPost.mac = this.tableData[index].mac;
        console.log(this.changeStationPost);
      },
      //弹出对话框
      openMessageBoxAdd() {
        this.$confirm('确定添加基站?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.addStation(()=>{
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消添加'
          });
        });
      },
      //弹出对话框
      openMessageBoxDelete(index) {
        this.$confirm('确定移除该基站?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          let nowId = this.tableData[index].id
          this.tableData.splice(index,1);
          this.delStation(nowId,()=>{
            this.$message({
              type: 'success',
              message: '移除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消移除'
          });
        });
      }
  }
}
</script>

<style lang="less" scoped>
    .stationData{
        width: 100%;
        height: 100%;
        position: relative;
        .header {
            position: relative;
            height: 50px;
            margin-left: 22px;
            margin-right: 22px;
            background-color: #f2f2f2;
            line-height: 50px;
            font-size: 20px;
            color: #444;
            letter-spacing: 1px;
            .title {
                margin-left: 10px;
                display: inline-block;
                .icon {
                    font-size: 22px;
                    position: relative;
                    top: 2px;
                }
                span {
                    margin-left: 5px;
                }
            }
            .triangle-up{
              position: absolute;
              width: 0;
              height: 0;
              bottom: 0;
              right: 17px;
              border-left: 15px solid transparent;
              border-right: 15px solid transparent;
              border-bottom: 15px solid #fff;
              z-index: 100;
            }
            .addStation{
              float: right;
              margin-right: 23px;
              font-size: 20px;
              cursor: pointer;
            }
            .active{
              color: red;
              transform: rotate(45deg);
            }
            .el-input{
              float: right;
              width: 200px;
              margin-top: 7px;
              margin-right: 25px;
            }
        }
        .content{
            margin-left: 10px;
            margin-right: 10px;
            padding-top: 0px;
            background-color: #fff;
            height: 88%;
            .el-table__header-wrapper{
              // position: fixed;
            }
        }
        .addForm{
          position: absolute;
          border-bottom: 1px solid #eee;
          border-left: 1px solid #eee;
          border-right: 1px solid #eee;
          width: 350px;
          height: 220px;
          top: 50px;
          right: 22px;
          z-index: 100;
          background: #fff;
          padding: 20px;
          .el-form{
            .el-form-item{
              margin-bottom: 10px;
            }
          }
        }
    }
</style>
