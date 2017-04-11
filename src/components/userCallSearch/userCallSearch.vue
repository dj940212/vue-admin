<template>
    <div class="userCallSearch">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>报警记录查询</span>
          </div>
          <searchBox text="查询"></searchBox>
        </div>
        <div class="content">
            <table border="1">
                <tr>
                    <th>报警时间</th>
                    <th>姓名</th>
                    <th>身份证号</th>
                    <th>手机号</th>
                    <th>发生地址</th>
                    <th>地区编号</th>
                    <th>定位物id号</th>
                    <th>定位物类型</th>
                    <th>报警状态</th>
                </tr>
                <tr>
                    <td>2314321</td>
                    <td>124321</td>
                    <td>23143</td>
                    <td>1234321</td>
                    <td>3214123</td>
                    <td>3254325</td>
                    <td>3215143212</td>
                    <td>32142314</td>
                    <td>234123412</td>
                </tr>
                <tr>
                    <td>2314321</td>
                    <td>124321</td>
                    <td>23143</td>
                    <td>1234321</td>
                    <td>3214123</td>
                    <td>3254325</td>
                    <td>3215143212</td>
                    <td>32142314</td>
                    <td>234123412</td>
                </tr>
                <tr>
                    <td>2314321</td>
                    <td>124321</td>
                    <td>23143</td>
                    <td>1234321</td>
                    <td>3214123</td>
                    <td>3254325</td>
                    <td>3215143212</td>
                    <td>32142314</td>
                    <td>234123412</td>
                </tr>
                <tr>
                    <td>2314321</td>
                    <td>124321</td>
                    <td>23143</td>
                    <td>1234321</td>
                    <td>3214123</td>
                    <td>3254325</td>
                    <td>3215143212</td>
                    <td>32142314</td>
                    <td>234123412</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import searchBox from '@/components/searchBox/searchBox'
export default {
  name: 'userInfoManage',
  components:{
      searchBox
  }
}
</script>

<style lang="less" scoped>
    .userCallSearch{
        width: 100%;
        height: 95%;
        min-width: 1000px;
        // padding-top: 22px;
        position: relative;
        .header {
            height: 64px;
            margin-left: 22px;
            margin-right: 22px;
            background-color: #e6e6eb;
            line-height: 64px;
            font-size: 24px;
            margin-top: 22px;

            .title {
                margin-left: 15px;
                display: inline-block;
                .icon {
                    font-size: 28px;
                    position: relative;
                    top: 4px;
                }
                span {
                    margin-left: 5px;
                }
            }
            .search-box {
                display: inline-block;
                float: right;
                .button {
                    top: -3px;
                    left: -8px;
                }
            }
        }
        .content{
            margin-left: 22px;
            margin-right: 22px;
            padding-top: 10px;
            background-color: #fff;
            height: 85%;
            table{
                width: 96%;
                margin-left: 22px;
                margin-top: 30px;
                th{
                    border: 1px solid #cecece;
                    font-size: 18px;
                    line-height: 40px;
                    padding: 0 10px;
                    // font-weight: bold;
                    background-color: #eee;
                }
                td{
                    border: 1px solid #cecece;
                    line-height: 40px;
                    text-align: center;
                    padding: 0 10px;
                }
            }
        }
    }
</style>
