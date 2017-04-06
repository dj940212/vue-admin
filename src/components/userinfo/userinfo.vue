<template>
  <div class="userinfo">
      <div class="info-left">
          <div class="header">
              <div class="title">
                  <i class="icon iconfont">&#xe630;</i>
                  <span>基本信息</span>
              </div>
          </div>
          <div class="content">
              <div class="photo">
                  <img src="" alt="">
              </div>
              <table>
                  <tr>
                      <th>姓名 :</th>
                      <td>张三</td>
                  </tr>
                  <tr>
                      <th>警号 :</th>
                      <td>003204</td>
                  </tr>
                  <tr>
                      <th>权限级别 :</th>
                      <td>一级</td>
                  </tr>
                  <tr>
                      <th>所在单位 :</th>
                      <td>杭州市公安局余杭分局仓前派出所</td>
                  </tr>
                  <tr>
                      <th>地址 :</th>
                      <td>杭州市余杭区仓前镇仓兴街348号</td>
                  </tr>
                  <tr>
                      <th>联系电话 :</th>
                      <td>15244565678</td>
                  </tr>
              </table>
          </div>
      </div>
      <div class="info-right">
          <div class="header">
              <div class="title">
                  <i class="icon iconfont">&#xe659;</i>
                  <span>警员信息管理</span>
              </div>
          </div>
          <div class="content">
              <div class="content-box">
                  <div class="text">
                      <span>对警员信息进行增删改查</span>
                      <span>请输入权限验证码 :</span>
                  </div>
                  <div class="search-box">
                      <input class="search-input" type="text" name="" value="">
                      <button class="search-button" type="button" name="button">进入</button>
                  </div>
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
    .info-left{
        display: inline-block;
        width: 65%;
        .header{
            height: 64px;
            margin-left: 22px;
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
            .photo{
                width: 150px;
                height: 230px;
                display: inline-block;
                border: 1px solid #000;
                margin:40px;
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
                }
            }
        }
    }
    .info-right{
        display: inline-block;
        vertical-align: top;
        width: 32%;
        .header{
            height: 64px;
            margin-left: 22px;
            margin-top: 22px;
            background-color: #e6e6eb;
            line-height: 64px;
            font-size: 28px;
            .title{
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
        .content{
            margin-left: 22px;
            background-color: #fff;
            height: 419px;
            .content-box{
                padding-top: 50px;
                margin-left: 30px;
                padding-bottom: 100px;
                .text{
                    margin-bottom: 15px;
                    span{
                        display: block;
                        line-height: 30px;
                    }
                }
            }
        }
    }
}
</style>
