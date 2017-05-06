<template>
    <div class="stationData">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>基站数据</span>
          </div>
          <searchBox text="查询" @click="search"></searchBox>
        </div>
        <div class="content">
            <div class="table-data">
                <el-table
                    :data="tableData"
                    border
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
                      prop="adcode"
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
  mounted:function(){
     this.getBaseStation()
  },
  components:{
      searchBox
  },
  data:function(){
      return {
          urlStation:this.global.port+"/langyang/Home/Police/getBaseStations",
          tableData:[],
          id:"",
          longitude:"",
          latitude:"",
          altitude:"",
          mac:""
      }
  },
  methods:{
      //获取基站信息
      getBaseStation: function() {
        this.$http.post(this.urlStation, {
          id: 1
        }, {
          emulateJSON: true
        }).then((res) => {
          console.log(res.data)
          if (res.data.lp == 0 && res.data.data.msg == "请求成功") {
            var newTableData = res.data.data.list;
            newTableData.forEach((item,index) => {
              var lnglat = new AMap.LngLat(item.longitude,item.latitude);
              this.global.lonlatToAddr(lnglat,item);
              this.tableData = newTableData;
              console.log(this.tableData)
            })
          } else {
            console.log('基站数据请求失败');
          }
        }, (res) => {
          console.log(res.status)
        })
      },
     search:function(){
         getBaseStation();
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
