<template>
    <div class="stationData">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>基站数据</span>
          </div>
          <div class="addStation" >
            <i class="el-icon-plus" @click="addValue=!addValue"></i>
          </div>
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
                      label="海拔">
                    </el-table-column>
                    <el-table-column
                      prop="longitude"
                      label="纬度">
                    </el-table-column>
                    <el-table-column
                      prop="latitude"
                      label="纬度">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                    </el-table-column>
                    <el-table-column
                      prop="adcode"
                      label="工作状态">
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      prop="type"
                      label="操作"
                      width="100">
                      <template scope="scope">
                        <el-button @click="handleClick" type="text" size="small">移除</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                      </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="addForm" v-show="addValue">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="基站mac">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="经度">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="纬度">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="海拔">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button v-model="form.name">添加基站</el-button>
              </el-form-item>
            </el-form>
          </el-col>
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
          mac:"",
          addValue:false,
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
              setTimeout(()=>{
                this.tableData.push(item);
              },50)

            })
          } else {
            console.log('基站数据请求失败');
          }
        }, (res) => {
          console.log(res.status)
        })
      },
      addBaseStation:function(){

      },
      search:function(){
         getBaseStation();
      },
      handleClick() {
        console.log(1);
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
            .addStation{
              float: right;
              margin-right: 20px;
              font-size: 20px;
              cursor: pointer;
              &:hover{
                color: green;
              }
            }
        }
        .content{
            margin-left: 22px;
            margin-right: 22px;
            padding-top: 0px;
            background-color: #fff;
            height: 88%;
        }
        .addForm{
          position: absolute;
          width: 400px;
          height: 220px;
          top: 64px;
          right: 22px;
          z-index: 100;
          // margin: auto;
          // bottom: 0;
          // left: 0;
          // right: 0;
          // top: 0;
          background: #eee;
          padding: 20px;
          border-radius: 3px;
          .el-form{
            .el-form-item{
              margin-bottom: 10px;
            }
          }
        }
    }
</style>
