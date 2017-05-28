<template>
    <div class="userInfoManage">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>车辆信息</span>
          </div>
          <el-tooltip class="item" effect="dark" content="注册用户" placement="bottom">
            <i class="el-icon-plus" v-bind:class="{active:onOffValue}" @click="onOffValue=!onOffValue"></i>
          </el-tooltip>
          <el-input
            placeholder="请输入手机号或车牌号查询"
            icon="search"
            v-model="carnumber_or_phone"
            :on-icon-click="submitSearch"
            @keyup.enter.native="submitSearch">
          </el-input>
          <div class="triangle-up" v-show="onOffValue"></div>
        </div>
        <div class="content">
          <!-- 注册用户表单 -->
          <div class="addUserLocator" v-show="onOffValue">
              <el-col :span="12">
                  <el-form ref="form" :model="addUserPost" label-width="100px">
                    <el-form-item label="姓名">
                      <el-input v-model="addUserPost.realname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                      <!-- <el-input v-model="addUserPost.sex"></el-input> -->
                      <el-select v-model="addUserPost.sex" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="手机号">
                      <el-input v-model="addUserPost.telephone" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证正面">
                        <el-upload
                          class="avatar-uploader"
                          action= "http://121.196.194.14/langyang/Home/Police/uploadIdCardFrontPic"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccessFront"
                          :before-upload="beforeAvatarUpload"
                          style="display:inline-block">
                          <img v-if="addUserPost.idcard_frontpic" :src="addUserPost.idcard_frontpic" class="avatar" width="160px" height="100px">
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
                      <el-input v-model="addUserPost.idcardnumber"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证背面">
                        <el-upload
                          class="avatar-uploader"
                          action="http://121.196.194.14/langyang/Home/Police/uploadIdCardBackPic"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccessBack"
                          :before-upload="beforeAvatarUpload"
                          style="display:inline-block">
                          <img v-if="addUserPost.idcard_backpic" :src="addUserPost.idcard_backpic" class="avatar" width="160px" height="100px">
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
          <!-- 用户列表 -->
          <div class="table-data" v-show="showUserInfo">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <!-- 扩展项 -->
                    <el-table-column type="expand">
                      <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="性别">
                            <span>{{ props.row.sex===1 ? "男" : "女" }}</span>
                          </el-form-item>
                          <el-form-item label="出生年月">
                            <span>{{ props.row.birthday }}</span>
                          </el-form-item>
                          <el-form-item label="地址">
                            <span>{{ props.row.address }}</span>
                          </el-form-item>
                          <el-form-item label="身份证号">
                            <span>{{ props.row.idcardnumber }}</span>
                          </el-form-item>
                          <el-form-item label="身份证正面">
                            <img v-bind:src="props.row.idcard_frontpic" width="160px" height="100px">
                          </el-form-item>
                          <el-form-item label="身份证背面">
                            <img v-bind:src="props.row.idcard_backpic" width="160px" height="100px">
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="id"
                      label="用户id">
                    </el-table-column>
                    <el-table-column
                      prop="idcardnumber"
                      label="身份证号">
                    </el-table-column>
                    <el-table-column
                      prop="realname"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="telephone"
                      label="手机号">
                    </el-table-column>
                    <!-- 编辑删除操作项 -->
                    <el-table-column
                      fixed="right"
                      prop="type"
                      label="操作"
                      width="160">
                      <template scope="scope">
                        <!-- 绑定电动车表单 -->
                        <el-popover
                          ref="popover1"
                          placement="bottom-start"
                          title=" "
                          width="600"
                          trigger="click">
                          <el-col :span="12">
                              <el-form ref="form" :model="bindDetailDevicePost" label-width="100px">
                                <el-form-item label="mac">
                                  <el-input v-model="bindDetailDevicePost.mac"></el-input>
                                </el-form-item>
                                <el-form-item label="定位物标识">
                                  <el-input v-model="bindDetailDevicePost.lable"></el-input>
                                </el-form-item>
                                <el-form-item label="车牌号">
                                  <el-input v-model="bindDetailDevicePost.car_number" :maxlength="8" :minlength="3"></el-input>
                                </el-form-item>
                                <el-form-item label="车辆照片">
                                    <el-upload
                                      class="avatar-uploader"
                                      action= "http://121.196.194.14/langyang/Home/Police/uploadCarPic"
                                      :show-file-list="false"
                                      :on-success="handleAvatarSuccessCarPic"
                                      :before-upload="beforeAvatarUpload"
                                      style="display:inline-block">
                                      <img v-if="bindDetailDevicePost.car_pic" :src="bindDetailDevicePost.car_pic" class="avatar" width="160px" height="100px">
                                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                              </el-form>
                          </el-col>
                          <el-col :span="12">
                            <el-form ref="form" :model="bindDetailDevicePost" label-width="100px">
                              <el-form-item label="车辆型号">
                                <el-input v-model="bindDetailDevicePost.car_type"></el-input>
                              </el-form-item>
                              <el-form-item label="车辆颜色">
                                <el-input v-model="bindDetailDevicePost.color"></el-input>
                              </el-form-item>
                              <el-form-item label="车辆昵称">
                                <el-input v-model="bindDetailDevicePost.nickname"></el-input>
                              </el-form-item>
                              <el-form-item label="车辆备注">
                                <el-input v-model="bindDetailDevicePost.remark" type="textarea"></el-input>
                              </el-form-item>

                              <el-button type="primary" @click="openMessageBoxBindDevice(scope.$index)">绑定车辆</el-button>
                              </el-form>
                          </el-col>
                          <!-- <el-button v-popover:popover1>取消</el-button> -->
                        </el-popover>
                        <!-- 修改用户信息表单 -->
                        <el-popover
                          ref="popover2"
                          placement="bottom-start"
                          title=" "
                          width="600"
                          trigger="click">
                          <el-col :span="12">
                              <el-form ref="form" :model="addUserPost" label-width="100px">
                                <!-- <el-form-item label="用户id">
                                  <el-input v-model="addUserPost.id"></el-input>
                                </el-form-item> -->
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
                                      <img v-if="addUserPost.idcard_frontpic" :src="addUserPost.idcard_frontpic" class="avatar" width="160px" height="100px">
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
                                  <el-input v-model="addUserPost.birthday" placeholder="0000-00-00"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号">
                                  <el-input v-model="addUserPost.idcardnumber"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证背面">
                                    <el-upload
                                      class="avatar-uploader"
                                      action="http://121.196.194.14/langyang/Home/Police/uploadIdCardBackPic"
                                      :show-file-list="false"
                                      :on-success="handleAvatarSuccessBack"
                                      :before-upload="beforeAvatarUpload"
                                      style="display:inline-block">
                                      <img v-if="addUserPost.idcard_backpic" :src="addUserPost.idcard_backpic" class="avatar" width="160px" height="100px">
                                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item>
                                  <el-button type="primary" @click="openMessageBoxModifyUser">修改用户</el-button>
                                  <el-button @click="onOffValue=false">取消</el-button>
                                </el-form-item>
                              </el-form>
                          </el-col>
                        </el-popover>
                        <!-- <el-button type="success" size="small" @click="searchDevice">设备</el-button> -->
                        <el-button type="warning" size="small" v-popover:popover2 @click="getModifyPost(scope.$index)">修改</el-button>
                        <el-button type="info" size="small" v-popover:popover1>绑定</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 助动车列表 -->
            <!-- <div class="d">设备</div> -->
          <!-- 页码 -->
          <!-- 电动车列表 -->
          <div class="table-data" v-show="showCarInfo">
                <el-table
                    :data="tableDataCar"
                    border
                    style="width: 100%">
                    <!-- 扩展项 -->
                    <el-table-column type="expand">
                      <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="定位物标识">
                            <span>{{ props.row.lable }}</span>
                          </el-form-item>
                          <el-form-item label="车辆类型">
                            <span>{{ props.row.car_type }}</span>
                          </el-form-item>
                          <!-- <el-form-item label="定位物类型">
                            <span>{{ props.row.device_type }}</span>
                          </el-form-item> -->
                          <el-form-item label="备注">
                            <span>{{ props.row.remark }}</span>
                          </el-form-item>
                          <el-form-item label="车辆昵称">
                            <span>{{ props.row.nickname }}</span>
                          </el-form-item>
                          <el-form-item label="车辆颜色">
                            <span>{{ props.row.color }}</span>
                          </el-form-item>
                          <el-form-item label="车辆照片">
                            <img v-bind:src="props.row.car_pic" width="160px" height="100px">
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="car_number"
                      label="车牌号">
                    </el-table-column>
                    <!-- <el-table-column
                      prop="id"
                      label="车辆id">
                    </el-table-column> -->
                    <el-table-column
                      prop="mac"
                      label="mac">
                    </el-table-column>
                    <el-table-column
                      prop="color"
                      label="颜色">
                    </el-table-column>
                    <el-table-column
                      prop="setup_time"
                      label="绑定时间">
                    </el-table-column>
                    <!-- 用户 -->
                    <!-- 编辑删除操作 -->
                    <el-table-column
                      fixed="right"
                      prop="type"
                      label="操作"
                      width="120">
                      <template scope="scope">
                        <el-popover
                          ref="popover5"
                          placement="bottom-start"
                          title=" "
                          width="600"
                          trigger="click">
                          <el-col :span="12">
                              <el-form ref="form" :model="modifyCarInfoPost" label-width="100px">
                                <el-form-item label="车牌号">
                                  <el-input v-model="modifyCarInfoPost.car_number"></el-input>
                                </el-form-item>
                                <el-form-item label="车辆型号">
                                  <el-input v-model="modifyCarInfoPost.car_type"></el-input>
                                </el-form-item>
                                <el-form-item label="车辆照片">
                                  <el-upload
                                    class="avatar-uploader"
                                    action= "http://121.196.194.14/langyang/Home/Police/uploadCarPic"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccessModifyCarPic"
                                    :before-upload="beforeAvatarUpload"
                                    style="display:inline-block">
                                    <img v-if="modifyCarInfoPost.car_pic" :src="modifyCarInfoPost.car_pic" class="avatar" width="160px" height="100px">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                  </el-upload>
                                </el-form-item>
                              </el-form>
                          </el-col>
                          <el-col :span="12">
                              <el-form ref="form" :model="modifyCarInfoPost" label-width="100px">
                                <el-form-item label="备注">
                                  <el-input v-model="modifyCarInfoPost.remark"></el-input>
                                </el-form-item>
                                <el-form-item label="车昵称">
                                  <el-input v-model="modifyCarInfoPost.nickname" placeholder="0000-00-00"></el-input>
                                </el-form-item>
                                <el-form-item label="车辆颜色">
                                  <el-input v-model="modifyCarInfoPost.car_color"></el-input>
                                </el-form-item>
                                <el-form-item>
                                  <el-button type="primary" @click="openMessageBoxModifyCar">修改车辆</el-button>
                                  <el-button @click="onOffValue=false">取消</el-button>
                                </el-form-item>
                              </el-form>
                          </el-col>
                        </el-popover>
                        <!-- <el-button type="success" size="small" @click="searchUser">用户</el-button> -->
                        <el-button type="warning" icon="edit" size="small" v-popover:popover5 @click="getModifyCarInfoPost(scope.$index)"></el-button>
                        <el-button type="danger" icon="delete" size="small" @click="openMessageBoxDelCar(scope.$index)"> </el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
          <!-- 翻页 -->
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
import addUserLocator from '@/components/addUserLocator/addUserLocator';
export default {
  name: 'userManage',
  components:{
      addUserLocator,
      // image
  },
  mounted:function(){
    this.getCarList(1);
  },
  methods:{
    //查找用户
    searchUser:function(){
      this.$http.post(this.urlSearchUser,{
        idnumber_or_phone:this.carnumber_or_phone
      },{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            console.log("数据",res.data.data.list);
            this.tableData=[];
            this.tableDataCar=[];
            this.tableData[0]=res.data.data.list;
            // this.showUserInfo = true;
            this.searchDevice();
          }
      },(res)=>{
        console.log(res.status);
      })
    },
    //查找机动车
    searchDevice:function(){
      this.$http.post(this.urlSearchDevice,{
        name_or_phone:this.carnumber_or_phone
      },{
        emulateJSON: true
      }).then((res)=>{
          console.log("数据",res.data.data.list);
          if (res.data.lp===0&&res.data.data.msg==="请求成功") {
            this.tableDataCar = res.data.data.list;
            this.showCarInfo = true;
          }else if (res.data.lp===1&&res.data.data.msg==="该用户未绑定设备") {
            this.$message.warning("该用户未绑定设备")
          }

      },(res)=>{

      })
    },
    //获取用户列表
    getUserList:function(page=1){
      this.$http.post(this.urlGetUserList,{
        page:page
      },{
        emulateJSON:true
      }).then((res)=>{
        if (res.data.lp===0&&res.data.data.msg==="请求成功") {
          this.tableData = res.data.data.list;
          this.pageNum = res.data.data.page;
        }
      },(res)=>{
        console.log(res.status)
      })
    },
    //获取车辆列表
    getCarList:function(page=1){
      this.$http.post(this.urlGetCarList,{
        page:page
      },{
        emulateJSON:true
      }).then((res)=>{
        if (res.data.lp===0&&res.data.data.msg==="请求成功") {
          this.tableDataCar = res.data.data.list;
          this.pageNum = res.data.data.page;
        }
      },(res)=>{
        console.log(res.status)
      })
    },
    //翻页
    paging:function(currentPage){
      this.getCarList(currentPage)
    },
    //给指定行
    tableRowClassName(row, index) {
        if (index === 0) {
          return 'positive-row';
        }
        return '';
    },
    //提交搜索
    submitSearch:function(){
      if (this.carnumber_or_phone.length >= 11) {
        this.searchUser();
      }else {
        this.findDeviceByCarNum();
      }
    },
    //添加用户
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
    //绑定模块
    bindDevice:function(cb){
      this.$http.post(this.urlBindDevice,this.bindDevicePost,{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            cb()
          }else {

          }
      },(res)=>{
        console.log(res.status);
      })
    },
    //绑定助动车
    bindDetailDevice:function(cb1,cb2){
      this.$http.post(this.urlBindDetailDevice,this.bindDetailDevicePost,{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            cb1()
          }else if(res.data.lp==1&&res.data.data.msg=="该模块已绑定"){
            cb2()
          }
      },(res)=>{
        console.log(res.status);
        this.$message({
          type:"error",
          message:"绑定失败"
        })
      })
    },
    //删除电动车
    deleteDeviceAndCar:function(cb1,cb2){
      this.$http.post(this.urlDeleteDeviceAndCar,{mac:this.mac},{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="删除成功"){
            cb1();
          }else if(res.data.lp==1&&res.data.data.msg=="删除失败"){
            cb2();
          }
      },(res)=>{
        console.log(res.status);
      })
    },
    //修改电动车信息
    modifyCarInfo:function(cb1,cb2){
      this.$http.post(this.urlModifyCarInfo,this.modifyCarInfoPost,{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="修改成功"){
            cb1()
          }else if(res.data.lp==1&&res.data.data.msg=="该助动车不存在"){
            cb2()
          }
      },(res)=>{
        console.log(res.status);
        this.$message({
          type:"error",
          message:"绑定失败"
        })
      })
    },
    //修改用户信息
    modifyUser:function(cb){
      this.$http.post(this.urlModifyUser,this.addUserPost,{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            // this.$message.info("修改用户信息成功")
            cb()
          }
      },(res)=>{
        console.log(res.status);
        this.$message.error("数据请求出现错误")
      })
    },
    //车牌号查找电动车与个人信息
    findDeviceByCarNum:function(){
      this.$http.post(this.urlFindDeviceByCarNum,{car_number:this.carnumber_or_phone},{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            this.tableDataCar=[];
            this.tableDataCar.push(res.data.data.list);
            this.showCarInfo = true;
          }else if (res.data.lp==1&&res.data.data.msg=="无符合的助动车") {
            this.$message.warning("找不到助动车")
          }
      },(res)=>{
        console.log(res.status);
        this.$message.error("数据请求出现错误")
      })
    },
    //获取修改用户信息提交参数
    getModifyPost(index){
      this.addUserPost = this.tableData[index];
      this.addUserPost.id = this.tableData[index].id;
      console.log(this.addUserPost)
    },
    //获取修改助动车信息
    getModifyCarInfoPost(index){
      this.modifyCarInfoPost = this.tableDataCar[index];
      this.modifyCarInfoPost.car_id = this.tableDataCar[index].carid;
      this.modifyCarInfoPost.car_color = this.tableDataCar[index].color;
      console.log(this.modifyCarInfoPost);
    },
    //上传照片正面成功
    handleAvatarSuccessFront(res, file) {
      // this.addUserPost.idcard_frontpic = URL.createObjectURL(file.raw);
      this.addUserPost.idcard_frontpic = res.data.list.frontpic;

      console.log(res.data.list.frontpic);
    },
    //上传背面照片成功
    handleAvatarSuccessBack(res, file) {
      this.addUserPost.idcard_backpic = res.data.list.backpic;

      console.log(res.data.list.backpic)
    },
    //上传车辆照片成功
    handleAvatarSuccessCarPic(res, file) {
      this.bindDetailDevicePost.car_pic = res.data.list.carpic;

      console.log(res.data.car)
    },
    //修改车辆照片成功
    handleAvatarSuccessModifyCarPic(res, file) {
      this.modifyCarInfoPost.car_pic = res.data.list.carpic;

      console.log(res.data.car)
    },
    //上传照片之前
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
    //车辆绑定对话框
    openMessageBoxBindDevice(index) {
      this.$confirm('确定绑定设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        //获取userid
        this.bindDetailDevicePost.userid = this.tableData[index].id;
        this.bindDetailDevice(()=>{
          this.$message({
            type: 'success',
            message: '绑定成功!'
          });
        },()=>{
          this.$message({
            type: 'error',
            message: '该模块已绑定'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消绑定'
        });
      });
    },
    //删除电动车对话框
    openMessageBoxDelCar(index) {
      console.log(index)
      this.$confirm('确定删除该助动车?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.mac = this.tableDataCar[index].mac;
        this.deleteDeviceAndCar(()=>{
          this.$message.success('删除成功!');
        },()=>{
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    },
    //注册用户对话框
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
    },
    //修改用户对话框
    openMessageBoxModifyUser() {
      this.$confirm('确定修改用户信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.modifyUser(()=>{
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消添加'
        });
      });
    },
    //修改电动车对话框
    openMessageBoxModifyCar() {
      this.$confirm('确定修改用户信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.modifyCarInfo(()=>{
          this.$message.success('修改成功!');
        },()=>{
          this.$message.warning('该助动车不存在')
        })
      }).catch(() => {
        this.$message.error('修改失败');
      });
    }
  },
  data:function(){
      return {
          urlSearchUser:this.global.port + '/langyang/Home/Police/searchUser',
          urlAddUser:this.global.port + '/langyang/Home/Police/registerUser',
          urlDeleteCar:this.global.port + '/langyang/Home/Police/deleteCar',
          urlBindDevice:this.global.port + '/langyang/Home/Police/bindDevice',
          urlBindDetailDevice:this.global.port + '/langyang/Home/Police/bindDetailDevice',
          urlModifyUser:this.global.port + '/langyang/Home/Police/modifyUser',
          urlFindDeviceByCarNum:this.global.port + '/langyang/Home/Police/findDeviceByCarNum',
          urlDeleteDeviceAndCar:this.global.port + '/langyang/Home/Police/deleteDeviceAndCar',
          urlModifyCarInfo:this.global.port + '/langyang/Home/Police/modifyCarInfo',
          urlGetUserList:this.global.port+"/langyang/Home/Police/getUserList",
          urlGetCarList:this.global.port+"/langyang/Home/Police/getCarList",
          tableData:[],
          mac:"",
          username:"王小虎",
          car_id:"",
          pageNum:1,
          carnumber_or_phone:"HZ000001",
          onOffValue:false,
          imageUrlFront:"",
          imageUrlBack:"",
          showCarInfo:true,
          showUserInfo:false,
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
            lable:""
          },
          modifyCarInfoPost:{
            car_id:"",
            car_number:"",
            car_type:"",
            car_color:"",
            car_pic:"",
            remark:"",
            nickname:""
          },
          bindDetailDevicePost:{
            userid:"",
            mac:"",
            lable:"",
            type:"1",
            car_number:"",
            car_type:"",
            color:"",
            car_pic:"",
            remark:"",
            nickname:""
          },
          modifyUserPost:{},
          urlUserDeviceInfo:this.global.port + '/langyang/Home/Police/searchUserDeviceInfo',
          urlSearchDevice:this.global.port+ '/langyang/Home/Police/searchDevice',
          tableDataCar:[],
          onOffValue:false,
          options: [{
              value: '1',
              label: '女'
            },{
              value: '0',
              label: '男'
          }],
          sexValue: ''
        }
  }
}
</script>
<style lang="less" scoped>
    .userInfoManage{
        width: 100%;
        height: 95%;
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
                    }
            }
            .el-pagination{
              text-align: center;
            }

        }
        .demo-table-expand {
          font-size: 0;
          label{
            width: 90px;
            color: #99a9bf;
          }
          .el-form-item{
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
          }
        }
        // upload style
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #20a0ff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 160px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }
        .avatar {
          width: 160px;
          height: 100px;
          display: block;
        }
        .el-table .positive-row {
          background: #e2f0e4;
        }
    }
</style>
