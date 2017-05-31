<template>
  <div class="userinfo">
      <div class="info-left">
          <div class="header">
              <div class="title">
                  <i class="icon iconfont">&#xe630;</i>
                  <span>用户{{$route.params.id}}</span>
              </div>
          </div>
          <div class="content">
              <div class="photo"></div>
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
                height: 150px;
                width: 230px;
                display: inline-block;
                border: 1px solid #000;
                margin:40px;
                vertical-align: top;
            }
            table{
                display: inline-block;
                font-size: 16px;
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
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
