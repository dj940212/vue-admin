<template>
  <div class="userinfo">
      <div class="info-right">
          <div class="header">
              <div class="content">
                  <i class="icon iconfont">&#xe630;</i>
                  <span>基本信息</span>
              </div>

          </div>
          <div class="body">
              <div class="body-content">
                  <form  class="" action="index.html" method="post">
                      姓名：<input type="text" name="name" value="">
                      <br>
                      警号：<input type="text" name="name" value="">
                      <br>
                      权限级别：<input type="text" name="name" value="">
                      <br>
                      所在单位：<input type="text" name="name" value="">
                      <br>
                      地址：
                      <select name="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                      </select>
                      <select name="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                      </select>
                      <br>
                      <input type="text" name="" value="填写详细地址">
                  </form>
              </div>
          </div>
      </div>
      <div class="info-left">
          <div class="header">
              <div class="content">
                  <i class="icon iconfont">&#xe659;</i>
                  <span>警员信息管理</span>
              </div>
          </div>
          <div class="body">
              <div class="body-content">
                  <span>对警员信息进行增删改查</span><br>
                  <label for="">请输入权限验证码</label><br>
                  <input type="text" name="" value="">
                  <input type="button" name="" value="">
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'userinfo'
}
</script>

<style lang="less" scoped>
.userinfo {
    .info-right{
        display: inline-block;
        width: 65%;
        .header{
            height: 108px;
            margin-left: 22px;
            margin-top: 22px;
            background-color: #e6e6eb;
            line-height: 108px;
            font-size: 28px;
            .content{
                margin-left: 15px;
                .icon{
                    font-size: 32px;
                }
                span{
                    margin-left: 5px;
                }
            }
        }
        .body{
            background-color: #fff;
            margin-left: 22px;
            .body-content{
                font-size: 18px;
                margin-left: 20px;
                input{
                    border:1px solid #000;
                    border-radius: 2px;
                    margin: 10px 10px;
                    height: 44px;
                    width: 300px;
                }
            }


        }
    }
    .info-left{
        display: inline-block;
        width: 32%;
        .header{
            height: 108px;
            margin-left: 22px;
            margin-top: 22px;
            background-color: #e6e6eb;
            line-height: 108px;
            font-size: 28px;
            .content{
                margin-left: 15px;
                // height: 80%;
                .icon{
                    font-size: 30px;
                }
                span{
                    margin-left: 5px;
                }
            }

        }
        .body{
            background-color: #FFF;
            margin-left: 22px;
            .body-content{
                input{
                    border:1px solid #000;
                    border-radius: 2px;
                    margin: 10px 10px;
                    height: 44px;
                    width: 200px;
                }
            }
        }
    }
}
</style>
