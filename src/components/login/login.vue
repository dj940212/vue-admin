<template>
    <div class="login-wrapper" id="particles-js">
        <div class="mylogin">
            <div class="title">
                <span>朗阳科技</span>
            </div>
            <div class="login-box">
                <label for="">账号</label>
                <input type="text" name="" value="" placeholder="请输入账号" v-model="telephone" id="loginUsername"><br>
                <label for="">密码</label>
                <input type="password" name="" value="" placeholder="请输入密码" v-model="pwd" @keyup.13="submit"><br>
            </div>
            <div class="button-box">
                <input type="submit" name="submit" @click="submit" value="登录" @keyup.13="submit"/>
            </div>
            <div class="register">
                <a href="/#/register">注册</a>
                <a href="/">忘记密码</a>
            </div>
        </div>
    </div>
</template>

<script>
// import particlesJSON from "@/components/login/particles.json"
export default {
  name: 'login',
  mounted: function(){
    document.getElementById("loginUsername").focus();
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
                let expireDays = 1/24;  //一小时过期
                this.setCookie('session', res.data.data.list.id, expireDays);
                //跳转
                this.$router.push('mapsearch');
                this.username = this.telephone;
                this.global.bus.$emit("username",this.telephone);
                this.isLoging = true;
                console.log("登录成功");
            }else{
                alert("密码或账号错误");
            }
        },(res)=>{
            console.log(res.status);
        })
    },
    submit:function(){
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
        console.log("建立连接:station====>login");
        var strData = JSON.stringify(data)
        console.log("strData",strData)
        console.log("this.stationDatas",this.stationDatas)
        console.log("基站====>",data.mac.slice(12),data);
        localStorage.setItem("stationDatas", JSON.stringify(this.stationDatas));
        var index = this.stationDatas.indexOf(strData)
        if (index === -1) {
            this.stationDatas.push(strData);
        }else{
            this.stationDatas[index] = strData;
        }
      });
    },
    setCookie:function(c_name, value, expiredays){
      var exdate = new Date();　
      exdate.setDate(exdate.getDate() + expiredays);　　　　
      document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
      console.log("setCookie",document.cookie);
    }
  },
  data:function(){
      return{
        telephone:"",
        username:"",
        pwd:"",
        stationDatas:[],
        isLoging:false,
        loginUrl:this.global.port+"/langyang/Home/Police/login",
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
    background-color: #f7fafc;
    .mylogin {
        width: 440px;
        height: 420px;
        position: absolute;
        // background-color: #f7fafc;
        left: 50%;
        top: 50%;
        margin-left: -220px;
        margin-top: -210px;
        border-radius: 5px;
        box-shadow:0px 1px 10px 0px #888;
        z-index: 401;
        .title{
            text-align: center;
            margin-top: 32px;
            span{
                font-size: 28px;
                color:#1f2d3d;

            }
        }
        .login-box{
            margin-left: 32px;
            margin-top: 40px;
            label{
                font-size: 16px;
                color: #666;
            }
            input{
                width: 300px;
                height: 30px;
                margin: 20px 20px;
                // background-color: #f2f2f2;
                background-color: rgba(0, 0, 0, 0);
                border-bottom: 2px solid #1f364a;
                font-size: 16px;
                &:focus{
                    outline: none;
                    border-bottom: 2px solid #f44336
                }
            }
        }
        .button-box{
            margin-top: 50px;
            input{
                width: 120px;
                height: 36px;
                display: block;
                margin:0 auto;
                background-color: #1f2d3d;
                color: #fff;
                border: 0;
                border-radius: 4px;
                cursor: pointer;
                &:focus{
                    outline: none;
                    background-color: #4d637d;
                }

            }
        }
        .register{
          position: absolute;
          width: 400px;
          left: 120px;
          bottom: 30px;
          a{
            margin-right: 100px;
          }
        }
    }
}

</style>
