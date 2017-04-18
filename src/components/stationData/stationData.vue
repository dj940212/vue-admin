<template>
    <div class="stationData">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>基站数据</span>
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
                      prop="mac"
                      label="基站mac">
                    </el-table-column>
                    <el-table-column
                      prop="altitude"
                      label="经度">
                    </el-table-column>
                    <el-table-column
                      prop="longitude"
                      label="纬度">
                    </el-table-column>
                    <el-table-column
                      prop="altitude"
                      label="海拔">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="工作状态">
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
    .stationData{
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
