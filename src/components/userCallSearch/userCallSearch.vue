<template>
    <div class="userCallSearch">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>报警记录查询</span>
          </div>
          <i class="el-icon-plus" @click="switchValue=!switchValue"></i>
          <el-input
            placeholder="请输入关键字查询"
            icon="search"
            class="el-input"
            v-model="mac"
            @change="searchRecord">
          </el-input>
        </div>
        <div class="content">
          <div class="addUserLocator" v-show="switchValue">
              <el-col :span="12">
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="身份证号">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="出生年月">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="性别">
                      <el-switch on-text="女" off-text="男" v-model="form.delivery"></el-switch>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">立即创建</el-button>
                      <el-button>取消</el-button>
                    </el-form-item>
                  </el-form>
              </el-col>
              <el-col :span="12">
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="定位物mac">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="定位物标识">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="定位物类型">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证照片">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload"
                          style="display:inline-block">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
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
                      prop="realname"
                      label="姓名">
                      height
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
                      label="查看"
                      >
                      <template scope="scope">
                        <el-button
                          type="text"
                          size="small" @click="showMap(scope.$index)">
                          显示
                        </el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- <div class="table-map" id="table-map"></div> -->
        </div>
    </div>
</template>

<script>
import searchBox from '@/components/searchBox/searchBox'
export default {
  name: 'userInfoManage',
  mounted:function(){
      this.getAlarms();
  },
  methods:{
      getAlarms:function(){
          this.$http.post(this.url,{
            page:1
          },{
            emulateJSON: true
        }).then((res) => {
            if(res.data.lp==0&&res.data.data.msg=="请求成功"){
                this.alarms = res.data.data.list.alarmid;
                this.tableData = this.alarms;
            }
        }, (res) => {
            console.log(res.status)
        })
      },
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
      showMap:function(index){
        var location = {};
        location.latitude = this.tableData[index].latitude;
        location.longitude = this.tableData[index].longitude;
        this.global.bus.$emit("arrIndex",index)
        this.$router.push('mapsearch')
      },
      onSubmit() {
        console.log('submit!');
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },
  data:function() {
      return {
          url:this.global.port+"/langyang/Home/Police/getAlarms",
          tableData:[],
          mac:"",
          alarms:[],
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
          },
          imageUrl: '',
          switchValue:true

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
              &:hover{
                color: red;
              }
            }
            .el-input{
              float: right;
              width: 200px;
              margin-top: 15px;
              margin-right: 30px;
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
            .table-map{
              width: 100px;
              height: 100px;
              background-color: red;
              top: 0;
              position: absolute;
            }
            .addUserLocator {
                border: 1px solid #eee;
                position: absolute;
                z-index: 100;
                background-color: #fff;
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
