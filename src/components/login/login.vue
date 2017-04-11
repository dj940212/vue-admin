<template>
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
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang="less" scoped>
.login {
    width: 440px;
    height: 500px;
    // background-color: red;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 5px;
    box-shadow:0px 1px 10px 0px #888;
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
</style>
