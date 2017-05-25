<template>
    <div class="login-wrapper">
        <div class="mylogin">
            <div class="title">
                <span>朗阳科技</span>
            </div>
            <div class="login-box">
                <label for="">账号</label>
                <input type="text" name="" value="" placeholder="请输入手机号" v-model="telephone" id="loginUsername"><br>
                <label for="">密码</label>
                <input type="password" name="" value="" placeholder="请输入密码" v-model="pwd" @keyup.13="submit"><br>
                <label for="">确认</label>
                <input type="password" name="" value="" placeholder="请再次输入密码" v-model="pwd" @keyup.13="submit"><br>
            </div>
            <div class="button-box">
                <input type="submit" name="submit" @click="submit" value="注 册" @keyup.13="submit"/>
            </div>
            <div class="register">
                <a href="/#/login">登录</a>
                <a href="/#/login">忘记密码</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'register',
  mounted: function(){
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
                // this.global.bus.$emit("login",this.isLoging)
                console.log("登录成功");
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
    particles:function(){
      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
        particlesJS.load('particles-js', particlesJSON, function() {
          console.log('callback - particles.js config loaded');
         });
         console.log(particlesJS);
         console.log(this.particlesJSON);
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
        loginUrl:this.global.port+"/langyang/Home/Police/login",
        particlesJSON:{
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#999"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 5,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#999",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 3,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true,
          "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
          }
        }
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
        height: 490px;
        position: absolute;
        // background-color: #f7fafc;
        left: 50%;
        top: 50%;
        margin-left: -220px;
        margin-top: -245px;
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
            margin-top: 40px;
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
