<template>
    <div class="login-wrapper">
        <img class="blur" src="./map.jpg" alt="">
        <div class="login">
            <div class="title">
                <span>登录</span>
            </div>
            <div class="login-box">
                <label for="">账号</label>
                <input type="text" name="" value="" placeholder="请输入账号"><br>
                <label for="">密码</label>
                <input type="text" name="" value="" placeholder="请输入密码"><br>
            </div>
            <div class="button-box">
                <button type="button" name="button">确定</button>
                <!-- <button type="button" name="button"></button> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="less" scoped>
.login-wrapper{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .blur{
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        // filter: url(blur.svg#blur);

        -webkit-filter: blur(10px);
           -moz-filter: blur(10px);
            -ms-filter: blur(10px);
                filter: blur(10px);

        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);
    }
    .login {
        width: 440px;
        height: 500px;
        position: absolute;
        // background-color: #fff;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 800px;
        right: 0;
        border-radius: 5px;
        box-shadow:0px 1px 10px 0px #888;
        z-index: 101;
        .title{
            text-align: center;
            margin-top: 32px;
            span{
                font-size: 24px;
            }
        }
        .login-box{
            margin-left: 32px;
            margin-top: 50px;
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
            margin-top: 50px;
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
    }
}

</style>
