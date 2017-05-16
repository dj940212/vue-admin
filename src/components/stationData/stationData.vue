<template>
    <div class="stationData">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>基站数据</span>
          </div>
          <div class="addStation" >
            <i class="el-icon-plus" v-bind:class="{active:addValue}" @click="addValue=!addValue"></i>
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
                    <el-table-column
                      prop="mac"
                      label="基站mac">
                    </el-table-column>
                    <el-table-column
                      prop="altitude"
                      label="海拔">
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
                      label="工作状态">
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      prop="type"
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <el-button @click="delStation" type="text" size="small">移除</el-button>
                        <el-button @click="openMessageBox" type="text" size="small">编辑</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
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
                <el-button type="primary" @click="openMessageBox">添加基站</el-button>
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
          tableData:[],
          stationData:[],
          id:"",
          longitude:"",
          latitude:"",
          altitude:"",
          mac:"",
          addValue:false,
          addStationPost:{
            id:"66",
            longitude:"27.73594",
            latitude:"109.186925",
            altitude:"11",
            mac:"aa555a0000003333"
          },
          changeStaionPost:{
            id:"66",
            station_id:"50",
            longitude:"99999999",
            latitude:"999999999",
            altitude:"999999999",
            mac:"aa555a0000002222"
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
            console.log("添加基站成功")
            cb();
          }else{
            console.log("添加基站失败");
          }
        },(res)=>{

        })
      },
      //移除基站
      delStation:function(){
        alert(1);
      },
      //修改基站
      changeStaion:function(){
        this.$http.post(this.urlChangeStation,this.changeStaionPost,{
          emulateJSON:true
        }).then((res)=>{
          if (res.data.data.msg === "请求成功" && res.data.lp ===0) {
            console.log("修改基站成功")
          }else{
            console.log("修改基站失败");
          }
        },(res)=>{
          console.log(res.status);
        })
      },
      //弹出对话框
      openMessageBox() {
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
      }
  }
}
</script>

<style lang="less" scoped>
    .stationData{
        width: 100%;
        height: 95%;
        // padding-top: 22px;
        position: relative;
        .header {
            position: relative;
            height: 64px;
            margin-left: 22px;
            margin-right: 22px;
            background-color: #e6e6eb;
            line-height: 64px;
            font-size: 24px;
            margin-top: 22px;
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
              margin-top: 15px;
              margin-right: 30px;
            }
        }
        .content{
            margin-left: 22px;
            margin-right: 22px;
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
          top: 64px;
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
