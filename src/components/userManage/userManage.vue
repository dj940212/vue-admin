<template>
    <div class="userInfoManage">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>用户管理</span>
          </div>
          <el-tooltip class="item" effect="dark" content="注册用户" placement="bottom">
            <i class="el-icon-plus" v-bind:class="{active:onOffValue}" @click="onOffValue=!onOffValue"></i>
          </el-tooltip>
          <el-input
            placeholder="请输入mac查询"
            icon="search"
            v-model="idnumber_or_phone"
            :on-icon-click="searchUser">
          </el-input>
          <div class="triangle-up" v-show="onOffValue"></div>
        </div>
        <div class="content">
          <div class="addUserLocator" v-show="onOffValue">
              <el-col :span="12">
                  <el-form ref="form" :model="addUserPost" label-width="100px">
                    <el-form-item label="姓名">
                      <el-input v-model="addUserPost.realname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                      <el-input v-model="addUserPost.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                      <el-input v-model="addUserPost.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证正面">
                        <el-upload
                          class="avatar-uploader"
                          action= "http://121.196.194.14/langyang/Home/Police/uploadIdCardFrontPic"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccessFront"
                          :before-upload="beforeAvatarUpload"
                          style="display:inline-block">
                          <img v-if="addUserPost.idcard_frontpic" :src="addUserPost.idcard_frontpic" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                  </el-form>
              </el-col>
              <el-col :span="12">
                  <el-form ref="form" :model="addUserPost" label-width="100px">
                    <el-form-item label="地址">
                      <el-input v-model="addUserPost.address"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                      <el-input v-model="addUserPost.birthday"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                      <el-input v-model="addUserPost.idcard_number"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证背面">
                        <el-upload
                          class="avatar-uploader"
                          action="http://121.196.194.14/langyang/Home/Police/uploadIdCardBackPic"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccessBack"
                          :before-upload="beforeAvatarUpload"
                          style="display:inline-block">
                          <img v-if="addUserPost.idcard_backpic" :src="addUserPost.idcard_backpic" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="openMessageBoxAddUser">注册用户</el-button>
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
                    <el-table-column
                      fixed="right"
                      prop="type"
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <el-popover
                          ref="popover1"
                          placement="bottom-start"
                          title=" "
                          width="400"
                          trigger="click">
                          <el-col :span="24">
                              <el-form ref="form" :model="bindDevicePost" label-width="100px">
                                <el-form-item label="用户id">
                                  <el-input v-model="bindDevicePost.userid"></el-input>
                                </el-form-item>
                                <el-form-item label="mac">
                                  <el-input v-model="bindDevicePost.mac"></el-input>
                                </el-form-item>
                                <el-form-item label="定位物类型">
                                  <el-input v-model="bindDevicePost.type"></el-input>
                                </el-form-item>
                                <el-form-item label="定位物标识">
                                  <el-input v-model="bindDevicePost.label"></el-input>
                                </el-form-item>
                                <el-form-item>
                                  <el-button type="primary" @click="openMessageBoxBindDevice">绑定设备</el-button>
                                  <el-button v-popover:popover1>取消</el-button>
                                </el-form-item>
                              </el-form>
                          </el-col>
                        </el-popover>
                        <el-button type="text" size="small" >修改</el-button>
                        <el-button type="text" size="small" v-popover:popover1>绑定</el-button>
                      </template>
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
    addUser:function(cb1,cb2){
      this.$http.post(this.urlAddUser,this.addUserPost,{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            cb1();
          }
          if (res.data.lp==1&&res.data.data.msg=="该号码已被注册") {
            cb2();
          }
      },(res)=>{
        console.log(res.status);
      })
    },
    bindDevice:function(cb){
      this.$http.post(this.urlBindDevice,this.bindDevicePost,{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            cb()
          }
      },(res)=>{
        console.log(res.status);
      })
    },
    handleAvatarSuccessFront(res, file) {
      this.addUserPost.idcard_frontpic = URL.createObjectURL(file.raw);

      console.log(res.data,this.imageUrlFront)
    },
    handleAvatarSuccessBack(res, file) {
      this.addUserPost.idcard_backpic = URL.createObjectURL(file.raw);

      console.log(res.data,this.imageUrlBack)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //弹出对话框
    openMessageBoxBindDevice() {
      this.$confirm('确定绑定设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.bindDevice(()=>{
          this.$message({
            type: 'success',
            message: '绑定成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消绑定'
        });
      });
    },
    //弹出对话框
    openMessageBoxAddUser() {
      this.$confirm('确定添加新用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.addUser(()=>{
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        },()=>{
          this.$message({
            type: 'error',
            message: '该号码已被注册!'
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
  data:function(){
      return {
          urlSearchUser:this.global.port + '/langyang/Home/Police/searchUser',
          urlAddUser:this.global.port + '/langyang/Home/Police/registerUser',
          urlDeleteCar:this.global.port + '/langyang/Home/Police/deleteCar',
          urlBindDevice:this.global.port + '/langyang/Home/Police/bindDevice',
          tableData:[],
          idnumber_or_phone:"18768379083",
          onOffValue:false,
          imageUrlFront:"",
          imageUrlBack:"",
          addUserPost:{
            realname:"",
            idcardnumber:"",
            sex:"",
            birthday:"",
            idcard_frontpic:"",
            idcard_backpic:"",
            address:"",
            telephone:""
          },
          bindDevicePost:{
            mac:"",
            type:"",
            userid:"",
            label:""
          }
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
              cursor: pointer;
              &:hover{
                color: red;
              }
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
