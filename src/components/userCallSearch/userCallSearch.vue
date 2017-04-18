<template>
    <div class="userCallSearch">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>报警记录查询</span>
          </div>
          <searchBox text="查询"></searchBox>
        </div>
        <div class="content">
            <div class="table-data">
                <el-table
                    :data="tableData"
                    border
                    height="500"
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
  mounted:function(){
      this.getAlarms();
  },
  components:{
      searchBox
  },
  methods:{
      getAlarms:function(){
          this.$http.get(this.url,{
            emulateJSON: true
        }).then((res) => {
            if(res.data.lp==0&&res.data.data.msg=="请求成功"){
                this.tableData = res.data.data.list.alarmid;
            }
        }, (res) => {
            console.log(res.status)
        })
      },
      search:function(){
      },
      button:function(){
          this.global.message();
      }

  },
  data:function() {
      return {
          url:this.global.port+"/langyang/Home/Police/getAlarms",
          tableData:[]
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
            padding-top: 30px;
            padding-left: 20px;
            padding-right: 15px;
            background-color: #fff;
            height: 85%;
            .table-data{
                // height: 90%;
                // overflow-y: scroll;
            }
        }
    }
</style>
