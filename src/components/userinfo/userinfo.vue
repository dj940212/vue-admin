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
                  <form action="index.html" method="post">
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
        width: 700px;
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
                    font-size: 30px;
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

            }


        }
    }
    .info-left{
        display: inline-block;
        .header{
            height: 108px;
            margin-left: 22px;
            margin-top: 22px;
            background-color: #e6e6eb;
            width: 300px;
            line-height: 108px;
            font-size: 28px;
            .content{
                margin-left: 15px;
                .icon{
                    font-size: 30px;
                }
                span{
                    margin-left: 5px;
                }
            }

        }
    }
}
</style>
