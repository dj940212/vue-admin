<template>
    <div class="userInfoManage">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>用户与设备信息</span>
          </div>
          <i class="el-icon-plus" @click="onOffValue=!onOffValue" v-bind:class="{active:onOffValue}"></i>
          <el-input
            placeholder="请输入mac查询"
            icon="search"
            v-model="mac"
            :on-icon-click="handleIconClick">
          </el-input>
          <div class="triangle-up" v-show="onOffValue"></div>
        </div>
        <div class="content">
            <addUserLocator :switchValue="onOffValue"></addUserLocator>
            <div class="table-data">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="realname"
                      label="姓名">
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
                      label="身份证照片">
                    </el-table-column>
                    <el-table-column
                      prop="birthday"
                      label="出生年月">
                    </el-table-column>
                    <el-table-column
                      prop="sex"
                      label="性别">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                    </el-table-column>
                    <el-table-column
                      prop="mac"
                      label="定位物物理地址">
                    </el-table-column>
                    <el-table-column
                      prop="device_type"
                      label="定位物类型">
                    </el-table-column>
                    <el-table-column
                      prop="device_type"
                      label="定位物标识">
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      label="编辑">
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
    userDeviceInfo:function(){
      this.$http.post(this.urlUserDeviceInfo,{
        mac:this.mac
      },{
        emulateJSON: true
      }).then((res)=>{
          console.log("数据",res.data.data.list);
          this.tableData = res.data.data.list
      },(res)=>{

      })
    },
    handleIconClick(ev) {
      console.log(this.tableData);
      this.userDeviceInfo();
    }
  },
  data:function(){
      return {
          urlUserDeviceInfo:this.global.port + '/langyang/Home/Police/searchUserDeviceInfo',
          urlModifyCar:this.global.port + '/langyang/Home/Police/modifyCar',
          urlDeleteCar:this.global.port + '/langyang/Home/Police/deleteCar',
          tableData:[],
          mac:"aa555a0000001002",
          onOffValue:false
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
            position: relative;
            height: 64px;
            margin-left: 15px;
            margin-right: 15px;
            background-color: #e6e6eb;
            line-height: 64px;
            font-size: 24px;
            margin-top: 15px;
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
            height: 90%;
        }
    }
</style>
