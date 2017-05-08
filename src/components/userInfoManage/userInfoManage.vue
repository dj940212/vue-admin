<template>
    <div class="userInfoManage">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>信息查询与修改</span>
          </div>
          <searchBox text="查询"></searchBox>
        </div>
        <div class="content">
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
                      prop="idcard_number"
                      label="手机号">
                    </el-table-column>
                    <el-table-column
                      prop="telephone"
                      label="身份证号">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="身份证照片">
                    </el-table-column>
                    <el-table-column
                      prop="call_time"
                      label="出生年月">
                    </el-table-column>
                    <el-table-column
                      prop="heppen_time"
                      label="性别">
                    </el-table-column>
                    <el-table-column
                      prop="mac"
                      label="地址">
                    </el-table-column>
                    <el-table-column
                      prop="device_type"
                      label="定位物物理地址">
                    </el-table-column>
                    <el-table-column
                      prop="call_type"
                      label="定位物类型">
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
import searchBox from '@/components/searchBox/searchBox'
export default {
  name: 'userInfoManage',
  components:{
      searchBox
  },
  methods:{
    userDeviceInfo:function(){
      this.$http.post(this.urlUserDeviceInfo,{

      }).then((res)=>{

      },(res)=>{

      })
    }
  },
  data:function(){
      return {
          urlUserDeviceInfo:this.global.port + '/langyang/Home/Police/searchUserDeviceInfo',
          urlModifyCar:this.global.port + '/langyang/Home/Police/modifyCar',
          urlDeleteCar:this.global.port + '/langyang/Home/Police/deleteCar',
          tableData:[],
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
            .search-box {
                display: inline-block;
                float: right;
                .button {
                    top: -3px;
                    left: -8px;
                }
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
