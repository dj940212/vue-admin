<template>
  <div class="userinfo">
      <div class="info-left">
          <div class="header">
              <div class="title">
                  <i class="el-icon-informatione"></i>
                  <span>车辆  {{carinfo.car_number}}</span>
              </div>
          </div>
          <div class="content">
              <img :src="carinfo.car_pic"/>
              <table>
                  <tr>
                      <th>车牌号 :</th>
                      <td>{{carinfo.car_number}}</td>
                  </tr>
                  <tr>
                      <th>车辆颜色 :</th>
                      <td>{{carinfo.car_color}}</td>
                  </tr>
                  <tr>
                      <th>车辆类型 :</th>
                      <td>{{carinfo.car_type}}</td>
                  </tr>
                  <tr>
                      <th>绑定时间 :</th>
                      <td>{{carinfo.setup_time}}</td>
                  </tr>
                  <tr>
                      <th>mac :</th>
                      <td>{{carinfo.mac}}</td>
                  </tr>
                  <tr>
                      <th>备注 :</th>
                      <td>{{carinfo.remark}}</td>
                  </tr>
                  <tr>
                      <th>昵称 :</th>
                      <td>{{carinfo.nickname}}</td>
                  </tr>
              </table>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'userinfo',
  mounted(){
    this.findDeviceByCarNum()
  },
  methods:{
    //车牌号查找电动车与个人信息
    findDeviceByCarNum:function(){
      this.$http.post(this.urlFindDeviceByCarNum,{car_number:this.$route.params.id},{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            this.carinfo=res.data.data.list;
          }else if (res.data.lp==1&&res.data.data.msg=="无符合的助动车") {
            this.$message.warning("找不到助动车")
          }
      },(res)=>{
        console.log(res.status);
        this.$message.error("数据请求出现错误")
      })
    },
  },
  data(){
    return{
      urlFindDeviceByCarNum:this.global.port + '/langyang/Home/Police/findDeviceByCarNum',
      carinfo:"",
    }
  }
}
</script>

<style lang="less" scoped>
.userinfo {
    .info-left{
        display: inline-block;

        width: 100%;
        .header{
            height: 64px;
            margin-left: 22px;
            margin-right: 22px;
            margin-top: 22px;
            background-color: #e6e6eb;
            line-height: 64px;
            font-size: 24px;
            .title{
                margin-left: 15px;
                .el-icon-informatione{
                    font-size: 28px;
                    position: relative;
                    top: 2px;
                }
                span{
                    margin-left: 5px;
                }
            }
        }
        .content{
            background-color: #fff;
            margin-left: 22px;
            margin-right:22px;
            img{
                width: 250px;
                border-radius: 5px;
                margin-top:60px;
                margin-left: 40px;
                margin-right: 40px;
                vertical-align: top;
            }
            table{
                display: inline-block;
                font-size: 18px;
                line-height: 50px;
                margin-bottom: 90px;
                margin-left: 40px;
                margin-top: 30px;
                th{
                    text-align: right;
                    padding-right: 15px;
                    // font-weight:400;
                }
                td{
                    color: #828282;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
