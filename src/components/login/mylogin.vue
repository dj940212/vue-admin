<template>
    <div class="login-wrapper">
        <!-- <img class="blur" src="./map.jpg" alt=""> -->
        <div class="mylogin">
            <div class="title">
                <span>登录</span>
            </div>
            <div class="login-box">
                <label for="">账号</label>
                <input type="text" name="" value="" placeholder="请输入账号" v-model="telephone"><br>
                <label for="">密码</label>
                <input type="password" name="" value="" placeholder="请输入密码" v-model="pwd"><br>
            </div>
            <div class="button-box">
                <button type="button" name="button" @click="submit">确定</button>
            </div>
            <div class="register">
                <a href="/#/mylogin">注册</a>
                <a href="/#/mylogin">忘记密码</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'mylogin',
  mounted: function(){
    // this.stationSocket();
    // this.getLocalStation();
  },
  methods:{
    login:function(){

        this.$http.post(this.loginUrl,{
            "telephone":this.telephone,
            "pwd":this.pwd
        },{
          emulateJSON: true
        }).then((res)=>{
            if (res.data.lp===0 && res.data.data.msg==="请求成功") {
                //如果登录成功则保存登录状态并设置有效期
                let expireDays = 1000 * 60 * 60 * 24 * 15;
                this.setCookie('session', "dingjian", expireDays);
                //跳转
                this.$router.push('mapsearch');
                this.username = this.telephone;
                this.isLoging = true;
                console.log("登录成功");
                console.log(res.status);
            }else{
                alert("密码或账号错误");
            }
        },(res)=>{
            console.log(res.status);
        })
    },
    submit:function(){
        // console.log(this.$route);
        if (this.telephone!=="" && this.pwd!=="") {
            this.login()
        }
    },
    stationSocket:function(){
      var socket = io('ws://127.0.0.1:3003');

      socket.on('connect',function () {
        console.log('正在打开！');
      });
      socket.on('message',(data) => {
        console.log("建立连接:station====>mylogin");
        var strData = JSON.stringify(data)
        console.log("strData",strData)
        console.log("this.stationDatas",this.stationDatas)
        console.log("基站====>",data.mac.slice(12),data);
        localStorage.setItem("stationDatas", JSON.stringify(this.stationDatas));
        console.log()
        var index = this.stationDatas.indexOf(strData)
        if (index === -1) {
            this.stationDatas.push(strData);
        }else{
            this.stationDatas[index] = strData;
        }
      });
    },
    setCookie: function(c_name, value, expiredays){
      var exdate = new Date();　　　　
      exdate.setDate(exdate.getDate() + expiredays);　　　　
      document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    }
  },
  data:function(){
      return{
        telephone:"",
        username:"",
        pwd:"",
        stationDatas:[],
        isLoging:false,
        loginUrl:this.global.port+"/langyang/Home/Police/login"
      }
  }
}
</script>

<style lang="less" scoped>
.login-wrapper{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 200;
    // background-color: red;
    // position: relative;
    .mylogin {
        width: 440px;
        height: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -220px;
        margin-top: -250px;
        border-radius: 5px;
        box-shadow:0px 1px 10px 0px #888;
        z-index: 401;
        .title{
            text-align: center;
            margin-top: 32px;
            span{
                font-size: 24px;
            }
        }
        .login-box{
            margin-left: 32px;
            margin-top: 70px;
            label{
                font-size: 16px;
            }
            input{
                width: 322px;
                height: 30px;
                margin: 20px 20px;
                background-color: #f2f2f2;
                border-bottom: 2px solid #1f364a;
                font-size: 16px;
                &:focus{
                    outline: none;
                    border-bottom: 2px solid #f44336
                }
            }
        }
        .button-box{
            margin-top: 80px;
            button{
                width: 120px;
                height: 36px;
                display: block;
                margin:0 auto;
                background-color: #1f364a;
                color: #fff;
                border: 0;
                border-radius: 4px;
                cursor: pointer;
                &:focus{
                    outline: none;
                    background-color: #13212e;
                }

            }
        }
        .register{
          position: absolute;
          width: 400px;
          left: 120px;
          bottom: 40px;
          a{
            margin-right: 100px;
          }
        }
    }
}

</style>
