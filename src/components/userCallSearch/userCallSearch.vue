<template>
    <div class="userCallSearch">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>报警记录查询</span>
          </div>
          <transition name="rotate">
            <i class="el-icon-plus" v-bind:class="{active:switchValue}" @click="switchValue=!switchValue"></i>
          </transition>
          <el-input
            placeholder="请输入关键字查询"
            icon="search"
            class="el-input"
            v-model="mac"
            @change="searchRecord">
          </el-input>
          <div class="triangle-up" v-show="switchValue"></div>
        </div>
        <div class="content">
          <div class="addUserLocator" v-show="switchValue">
              <el-col :span="12">
                  <el-form ref="form" :model="addAlarmPost" label-width="80px">
                    <el-form-item label="姓名">
                      <el-input v-model="addAlarmPost.realname"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                      <el-input v-model="addAlarmPost.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                      <el-input v-model="addAlarmPost.idcard_number"></el-input>
                    </el-form-item>
                    <el-form-item label="mac">
                      <el-input v-model="addAlarmPost.mac"></el-input>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="定位物类型">
                        <el-input v-model="addAlarmPost.device_type"></el-input>
                    </el-form-item>
                    <el-form-item label="报警信息">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="addAlarmPost.message">
                      </el-input>
                    </el-form-item>
                  </el-form>
              </el-col>
              <el-col :span="12">
                  <el-form ref="form" :model="addAlarmPost" label-width="80px">
                    <el-form-item label="经度">
                      <el-input v-model="addAlarmPost.longitude"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度">
                      <el-input v-model="addAlarmPost.latitude"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                      <el-input v-model="addAlarmPost.address"></el-input>
                    </el-form-item>
                    <el-form-item label="地区编码">
                      <el-input v-model="addAlarmPost.adcode"></el-input>
                    </el-form-item>
                    <el-form-item label="案发时间">
                        <el-date-picker type="date" placeholder="选择日期" v-model="addAlarmPost.heppen_time" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                      <br>
                      <el-button type="primary" @click="openMessageBox">立即创建</el-button>
                      <el-button @click="switchValue=false">取消</el-button>
                    </el-form-item>
                  </el-form>
              </el-col>
          </div>
          <div class="table-data">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="id"
                      label="id">
                    </el-table-column>
                    <el-table-column
                      prop="realname"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="idcard_number"
                      label="身份证号">
                    </el-table-column>
                    <el-table-column
                      prop="telephone"
                      label="电话号码">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="发生地点">
                    </el-table-column>
                    <el-table-column
                      prop="call_time"
                      label="报警时间">
                    </el-table-column>
                    <el-table-column
                      prop="heppen_time"
                      label="发生时间">
                    </el-table-column>
                    <el-table-column
                      prop="mac"
                      label="mac">
                    </el-table-column>
                    <el-table-column
                      prop="device_type"
                      label="定位物类型">
                    </el-table-column>
                    <el-table-column
                      prop="call_type"
                      label="报警方式">
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      label="报警状态">
                    </el-table-column>
                    <el-table-column
                      prop="message"
                      label="报警备注">
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <el-button
                          type="text"
                          size="small" @click="showMap(scope.$index)">
                          显示
                        </el-button>
                        <el-button
                          type="text"
                          size="small">
                          编辑
                        </el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
               layout="prev, pager, next"
               :total="1000"
               :page-size="18">
             </el-pagination>
        </div>
    </div>
</template>

<script>
import searchBox from '@/components/searchBox/searchBox'
export default {
  name: 'userCallSearch',
  mounted:function(){
      this.getAlarms();
  },
  methods:{
      //获取记录
      getAlarms:function(){
          this.$http.post(this.urlGetAlarms,{
            page:7
          },{
            emulateJSON: true
        }).then((res) => {
            if(res.data.lp==0&&res.data.data.msg=="请求成功"){
                this.alarms = res.data.data.list.alarmid;
                this.alarmsData = res.data.data.list;
                this.tableData = this.alarms;
            }
        }, (res) => {
            console.log(res.status)
        })
      },
      //添加报警记录
      addAlarm:function(cb){
        this.$http.post(this.urlAddAlarm,this.addAlarmPost,{
          emulateJSON:true
        }).then((res)=>{
          if (res.data.lp===0&&res.data.data.msg==="请求成功") {
            cb()
          }
        },(res)=>{
          console.log(res.status)
        })
      },
      //记录查询，模糊匹配
      searchRecord:function(){
        this.tableData = this.alarms;
        this.tableData = this.alarms.filter((value)=>{
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
      //在地图上显示
      showMap:function(index){
        var location = {};
        location.latitude = this.tableData[index].latitude;
        location.longitude = this.tableData[index].longitude;
        this.global.bus.$emit("arrIndex",index)
        this.$router.push('mapsearch')
      },
      //打开对话框
      openMessageBox() {
        this.$confirm('确定提交报警信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.addAlarm(()=>{
            this.$message({
              type: 'success',
              message: '报警成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消报警'
          });
        });
      },
      //更改报警状态对话框
      openMessageBox2() {
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
  },
  data:function() {
      return {
          urlGetAlarms:this.global.port+"/langyang/Home/Police/getAlarms",
          urlAddAlarm:this.global.port+"/langyang/Home/Police/giveAlarm",
          tableData:[],
          alarmsData:[],
          mac:"",
          alarms:[],
          addAlarmPost:{
            realname:"",
            idcard_number:"",
            device_type:"",
            message:"",
            adcode:"",
            longitude:"",
            latitude:"",
            address:"",
            telephone	:"",
            heppen_time	:""
          },
          imageUrl: '',
          switchValue:false

      }
  }
}
</script>

<style lang="less" scoped>
    .userCallSearch{
        width: 100%;
        height: 95%;
        min-width: 1000px;
        position: relative;
        .header {
            height: 64px;
            margin-left: 15px;
            margin-right: 15px;
            background-color: #e6e6eb;
            line-height: 64px;
            font-size: 24px;
            margin-top: 22px;
            position: relative;
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
            .el-icon-plus{
              float: right;
              margin-top: 20px;
              margin-right: 20px;
              cursor: pointer;
              // &:hover{
              //   color: red;
              //   transform: rotate(45deg);
              // }

            }
            .active{
              color: red;
              transform: rotate(45deg);
            }
            .rotate-enter,.rotate-leave-active{
                transition: opacity .5s;
            }
            .rotate-enter-active,.rotate-leave{
                opacity: 0;
            }
            .el-input{
              float: right;
              width: 200px;
              margin-top: 15px;
              margin-right: 30px;
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
        }
        .content{
            margin-left: 15px;
            margin-right: 15px;
            padding-top: 0px;
            padding-left: 0px;
            padding-right: 0px;
            background-color: #fff;
            height: 91%;
            position: relative;
            .el-pagination{
              margin:0 auto;
            }
            .table-map{
              width: 100px;
              height: 100px;
              background-color: red;
              top: 0;
              position: absolute;
            }
            .addUserLocator {
                border-bottom: 1px solid #eee;
                border-right: 1px solid #eee;
                border-left: 1px solid #eee;
                position: absolute;
                z-index: 100;
                background-color: #fff;
                top: 0;
                right: 0px;
                    .el-form {
                        float: right;
                        // padding-left: 30px;
                        padding-right: 30px;
                        padding-top: 30px;
                        .el-form-item {
                            margin-bottom: 10px;
                            .avatar-uploader .el-upload {
                                display: inline-block;
                                border: 1px solid #d9d9d9 !important;
                                border-radius: 6px;
                                cursor: pointer;
                                position: relative;
                                overflow: hidden;
                            }
                            .avatar-uploader-icon {
                                font-size: 28px;
                                color: #8c939d;
                                width: 178px;
                                height: 178px;
                                line-height: 178px;
                                text-align: center;
                            }
                            .avatar {
                                width: 178px;
                                height: 178px;
                                display: block;
                            }
                            .el-form-item__label{
                              width: 100px !important;
                            }
                        }
                    }
            }
        }
    }
</style>
