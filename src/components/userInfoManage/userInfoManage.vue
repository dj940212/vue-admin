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
                    height="600"
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
            margin-left: 22px;
            margin-right: 22px;
            padding-top: 1px;
            background-color: #fff;
            height: 88%;
        }
    }
</style>
