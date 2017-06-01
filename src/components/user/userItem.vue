<template>
  <div class="userinfo">
      <div class="info-left">
          <div class="header">
              <div class="title">
                  <!-- <i class="icon iconfont">&#xe630;</i> -->
                  <span>用户  {{userinfo.realname}}</span>
              </div>
          </div>
          <div class="content">
              <div class="photo">
                <img class="front" :src="userinfo.idcard_backpic"/>
                <img class="back" :src="userinfo.idcard_frontpic"/>
              </div>
              <table>
                  <tr>
                      <th>姓名 :</th>
                      <td>{{userinfo.realname}}</td>
                  </tr>
                  <tr>
                      <th>性别 :</th>
                      <td>{{userinfo.sex===0 ? "男":"女"}}</td>
                  </tr>
                  <tr>
                      <th>手机号 :</th>
                      <td>{{userinfo.telephone}}</td>
                  </tr>
                  <tr>
                      <th>身份证号 :</th>
                      <td>{{userinfo.idcardnumber}}</td>
                  </tr>
                  <tr>
                      <th>生日 :</th>
                      <td>{{userinfo.birthday}}</td>
                  </tr>
                  <tr>
                      <th>地址 :</th>
                      <td>{{userinfo.address}}</td>
                  </tr>
              </table>
              <!-- <div class="car">
                <h1>已绑车辆</h1>
              </div> -->
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'userinfo',
  mounted(){
    this.searchUser()
  },
  methods:{
    //查找用户
    searchUser:function(){
      this.$http.post(this.urlSearchUser,{
        idnumber_or_phone:this.$route.params.id
      },{
        emulateJSON: true
      }).then((res)=>{
          if(res.data.lp==0&&res.data.data.msg=="请求成功"){
            this.userinfo=res.data.data.list;
          }
      },(res)=>{
        console.log(res.status);
      })
    }
  },
  data(){
    return{
      urlSearchUser:this.global.port + '/langyang/Home/Police/searchUser',
      userinfo:"",
    }
  }
}
</script>

<style lang="less" scoped>
.userinfo {
    .info-left{
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
                .icon{
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
            .photo{
                img{
                  // height: 150px;
                  width: 230px;
                  margin-bottom: 20px;
                  // border: 1px solid #000;
                  display: block;
                  border-radius: 5px;
                }
                display: inline-block;
                vertical-align: top;
                margin: 40px;
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
                }
                td{
                    color: #828282;
                    font-size: 16px;
                }
            }
            .car{
              display: inline-block;
              vertical-align: top;
            }
        }
    }
}
</style>
