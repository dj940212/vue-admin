<template>
    <div class="userCallSearch">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>报警记录查询</span>
          </div>
          <transition name="rotate">
            <el-tooltip class="item" effect="dark" content="添加报警记录" placement="top">
              <i class="el-icon-plus" v-bind:class="{active:switchValue}" @click="switchValue=!switchValue"></i>
            </el-tooltip>
          </transition>
          <el-input
            placeholder="请输入手机号或姓名"
            icon="search"
            class="el-input"
            v-model="telephone_or_realname"
            :on-icon-click="submit"
            @keyup.enter.native="submit">
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
                      <el-button type="primary" @click="openMessageBox">立即报警</el-button>
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
                    <el-table-column type="expand">
                        <template scope="props">
                          <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="id">
                              <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="地区编码">
                              <span>{{ props.row.adcode }}</span>
                            </el-form-item>
                            <el-form-item label="地址">
                              <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="报警时间">
                              <span>{{ props.row.call_time }}</span>
                            </el-form-item>
                            <el-form-item label="发生时间">
                              <span>{{ props.row.heppen_time }}</span>
                            </el-form-item>
                            <el-form-item label="报警类型">
                              <span>{{ props.row.call_type }}</span>
                            </el-form-item>
                            <el-form-item label="省份证号码">
                              <span>{{ props.row.idcard_number }}</span>
                            </el-form-item>
                            <el-form-item label="经度">
                              <span>{{ props.row.longitude }}</span>
                            </el-form-item>
                            <el-form-item label="纬度">
                              <span>{{ props.row.latitude }}</span>
                            </el-form-item>
                            <el-form-item label="mac">
                              <span>{{ props.row.mac }}</span>
                            </el-form-item>
                            <el-form-item label="报警备注">
                              <span>{{ props.row.message }}</span>
                            </el-form-item>
                            <el-form-item label="姓名">
                              <span>{{ props.row.realname }}</span>
                            </el-form-item>
                            <el-form-item label="报警状态">
                              <span>{{ props.row.status }}</span>
                            </el-form-item>
                            <el-form-item label="手机号">
                              <span>{{ props.row.telephone }}</span>
                            </el-form-item>
                          </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="id"
                      label="id"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="realname"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="telephone"
                      label="电话号码">
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
                      prop="status"
                      label="报警状态"
                      width="120"
                      :filters="[{ text: '未处理', value: '未处理' }, { text: '处理中', value: '处理中' },{ text: '已完成', value: '已完成' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                      <template scope="scope">
                        <el-tag
                          :type="scope.row.status === '未处理' ? 'danger' : scope.row.status === '处理中' ? 'warning':'success'"
                          close-transition>{{scope.row.status}}</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="180">
                      <template scope="scope">
                        <el-popover
                          ref="popover1"
                          placement="bottom-start"
                          width="220"
                          trigger="click">
                          <el-radio-group v-model="alarmStatus">
                            <el-radio-button label="未处理"></el-radio-button>
                            <el-radio-button label="处理中"></el-radio-button>
                            <el-radio-button label="已完成"></el-radio-button>
                          </el-radio-group>
                          <div style="text-align: center; margin-top:10px">
                            <el-button type="success" size="small" @click="changeAlarmsStatus(scope.$index)">确定更改</el-button>
                          </div>
                        </el-popover>
                        <el-tooltip class="item" effect="dark" content="查看报警车辆位置" placement="top">
                          <el-button type="info" size="small" icon="search" @click="showMap(scope.$index)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="处理报警" placement="top">
                          <el-button type="warning" size="small" icon="edit" v-popover:popover1 @click="getAlarmStatusAndId(scope.$index)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除报警记录" placement="top">
                          <el-button type="danger" size="small" icon="delete" @click="openMessageBox2(scope.$index)"></el-button>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                </el-table>
          </div>
          <el-pagination
             layout="prev, pager, next"
             :page-count="pageNum"
             :page-size="18"
             @current-change="paging">
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
      getAlarms:function(nowpage=1){
        this.$http.post(this.urlGetAlarms,{
            page:nowpage
          },{
            emulateJSON: true
        }).then((res) => {
            if(res.data.lp==0&&res.data.data.msg=="请求成功"){
                this.alarms = res.data.data.list.alarmid;
                this.alarmsData = res.data.data.list;
                this.tableData = this.alarms;
                this.pageNum = res.data.data.page_number;
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
      //删除报警记录
      deleteAlarm:function(nowAlarmId,cb){
        this.$http.post(this.urlDeleteAlarm,{alarmid:nowAlarmId},{
          emulateJSON:true
        }).then((res)=>{
          if (res.data.lp===0&&res.data.data.msg==="请求成功") {
            cb(res)
          }
        },(res)=>{
          this.$message.error("删除失败")
        })
      },
      //修改报警状态
      changeAlarmsStatus:function(index){
        this.$http.post(this.urlChangeAlarmsStatus,{
          status:this.alarmStatus,
          id:this.alarmID
        },{
          emulateJSON:true
        }).then((res)=>{
          if (res.data.lp===0&&res.data.data.msg==="修改成功") {
            this.$message({
              type: 'success',
              message: '更改报警状态成功!'
            });
            this.tableData[index].status = this.alarmStatus;
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
      //筛选
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.status === value;
      },
      //报警记录查询
      searchAlarms:function(searchAlarmsPost){
        this.$http.post(this.urlSearchAlarms,searchAlarmsPost,{
            emulateJSON: true
        }).then((res) => {
            if(res.data.lp==0&&res.data.data.msg=="请求成功"){
              this.tableData = res.data.data.list;
            }else if (res.data.lp===1&&res.data.data.msg==="无符合的报警记录") {
              this.$message.error("没有找到报警记录");
            }else if (res.data.lp===1&&res.data.data.msg==="搜索条件为空") {
              this.$message.warning("搜索条件为空");
            }
        }, (res) => {
            this.$message.error("数据请求出现错误");
        })
      },
      //提交搜索
      submit:function(){
        if (this.telephone_or_realname.length>=11) {
          this.searchAlarms({telephone:this.telephone_or_realname});
        }else {
          this.searchAlarms({realname:this.telephone_or_realname});
        }
      },
      //翻页
      paging:function(currentPage){
        this.getAlarms(currentPage)
      },
      //在地图上显示
      showMap:function(index){
        var location = {};
        location.latitude = this.tableData[index].latitude;
        location.longitude = this.tableData[index].longitude;
        this.global.bus.$emit("arrIndex",index)
        this.$router.push('mapsearch')
      },
      //获取当前记录的状态
      getAlarmStatusAndId:function(index){
        this.alarmStatus = this.tableData[index].status;
        this.alarmID = this.tableData[index].id;
      },
      //打开报警对话框
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
      //删除报警记录对话框
      openMessageBox2(index) {
        this.$confirm('确定删除该报警记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(() => {
          this.deleteAlarm(this.tableData[index].id,()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          this.tableData.splice(index,1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });
        });
      }
  },
  data:function() {
      return {
          urlGetAlarms:this.global.port+"/langyang/Home/Police/getAlarms",
          urlAddAlarm:this.global.port+"/langyang/Home/Police/giveAlarm",
          urlChangeAlarmsStatus:this.global.port+"/langyang/Home/Police/changeAlarmsStatus",
          urlSearchAlarms:this.global.port+"/langyang/Home/Police/searchAlarms",
          urlDeleteAlarm:this.global.port+"/langyang/Home/Police/deleteAlarm",
          tableData:[],
          alarmsData:[],
          mac:"",
          visible:false,
          alarms:[],
          alarmStatus:"",
          alarmID:"",
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
          switchValue:false,
          pageNum:1,
          telephone_or_realname:""
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
              text-align: center;
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
        .demo-table-expand {
            font-size: 0;
          }
          .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
          }
          .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 30%;
          }
    }
</style>
