<template>
    <div class="userInfoManage">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>用户管理</span>
          </div>
          <i class="el-icon-plus" v-bind:class="{active:onOffValue}" @click="onOffValue=!onOffValue"></i>
          <el-input
            placeholder="请输入mac查询"
            icon="search"
            v-model="idnumber_or_phone"
            :on-icon-click="handleIconClick">
          </el-input>
          <div class="triangle-up" v-show="onOffValue"></div>
        </div>
        <div class="content">
          <div class="addUserLocator" v-show="onOffValue">
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
                      <el-button type="primary" >立即创建</el-button>
                      <el-button @click="onOffValue=false">取消</el-button>
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
                      label="用户id">
                    </el-table-column>
                    <el-table-column
                      prop="username"
                      label="用户名">
                    </el-table-column>
                    <el-table-column
                      prop="realname"
                      label="真实姓名">
                    </el-table-column>
                    <el-table-column
                      prop="sex"
                      label="性别">
                    </el-table-column>
                    <el-table-column
                      prop="birthday"
                      label="出生年月">
                    </el-table-column>
                    <el-table-column
                      prop="telephone"
                      label="手机号">
                    </el-table-column>
                    <el-table-column
                      prop="idcardnumber"
                      label="身份证号">
                    </el-table-column>
                    <el-table-column
                      prop="idcard_frontpic"
                      label="身份证正面">
                    </el-table-column>
                    <el-table-column
                      prop="idcard_backpic"
                      label="身份证背面">
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
import searchBox from '@/components/searchBox/searchBox';
import addUserLocator from '@/components/addUserLocator/addUserLocator';
export default {
  name: 'userInfoManage',
  components:{
      searchBox,
      addUserLocator
  },
  mounted:function(){

  },
  methods:{
    searchUser:function(){
      this.$http.post(this.urlSearchUser,{
        idnumber_or_phone:this.idnumber_or_phone
      },{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            console.log("数据",res.data.data.list);
            this.tableData=[];
            this.tableData[0]=(res.data.data.list);
            console.log(this.tableData)
          }
      },(res)=>{
        console.log(res.status);
      })
    },
    handleIconClick(ev) {
      console.log(this.tableData);
      this.searchUser();
    }
  },
  data:function(){
      return {
          urlSearchUser:this.global.port + '/langyang/Home/Police/searchUser',
          urlModifyCar:this.global.port + '/langyang/Home/Police/modifyCar',
          urlDeleteCar:this.global.port + '/langyang/Home/Police/deleteCar',
          tableData:[],
          idnumber_or_phone:"18768379083",
          onOffValue:false,
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
      }
  }
}
</script>
<style lang="less" scoped>
    .userInfoManage{
        width: 100%;
        height: 95%;
        // padding-top: 22px;
        position: relative;
        .header {
            height: 64px;
            margin-left: 15px;
            margin-right: 15px;
            background-color: #e6e6eb;
            line-height: 64px;
            font-size: 24px;
            margin-top: 15px;
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
            }
            .active{
              color: red;
              transform: rotate(45deg);
            }
            .el-input{
              float: right;
              width: 200px;
              margin-top: 15px;
              margin-right: 40px;
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
            padding: 0px;
            background-color: #fff;
            position: relative;
            height: 90%;
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
