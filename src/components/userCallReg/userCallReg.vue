<template>
    <div class="userCallReg">
        <div class="header">
          <div class="title">
            <i class="icon iconfont">&#xe612;</i>
            <span>用户报警登记</span>
          </div>
          <searchBox text="查询"></searchBox>
        </div>
        <div class="content">
            <div class="content-item">
                <form class="" action="index.html" method="post">
                    <div class="title">
                        <span>用户基本信息</span>
                    </div>
                    <table>
                        <tr>
                            <th>姓名:</th>
                            <td>
                                <input type="text" name="" value="">
                            </td>
                        </tr>
                        <tr>
                            <th>身份证号:</th>
                            <td>
                                <input type="text" name="" value="">
                            </td>
                        </tr>
                        <tr>
                            <th>性别:</th>
                            <td>
                                <input type="radio" name="sex" value="male" checked>男
                                <input type="radio" name="sex" value="female" checked>女
                            </td>
                        </tr>
                        <tr>
                            <th>现居住地:</th>
                            <td>
                                <input type="text" name="" value=""><br>
                                <input type="text" name="" value="" placeholder="请填写详细地址">
                            </td>
                        </tr>
                        <tr>
                            <th>联系电话:</th>
                            <td>
                                <input type="text" name="" value="">
                            </td>
                        </tr>
                    </table>
                </form>
                <form class="" action="index.html" method="post">
                    <div class="title">
                        <span>定位物信息</span>
                    </div>
                    <table>
                        <tr>
                            <th>定位物mac:</th>
                            <td>
                                <input type="text" name="" value="">
                            </td>
                        </tr>
                        <tr>
                            <th>定位物类型:</th>
                            <td>
                                <input type="text" name="" value="">
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="content-item">
                <form class="" action="index.html" method="post">
                    <div class="title">
                        <span>报警详情</span>
                    </div>
                    <table>
                        <tr>
                            <th>案发时间:</th>
                            <td>
                                <input type="text" name="" value="">
                            </td>
                        </tr>
                        <tr>
                            <th>案发地址:</th>
                            <td>
                                <input type="text" name="" value=""><br>
                                <input type="text" name="" value="" placeholder="请填写详细地址">
                            </td>
                        </tr>
                        <tr>
                            <th>地区编码:</th>
                            <td>
                                <input type="text" name="" value=""><br>
                            </td>
                        </tr>
                        <tr>
                            <th class="remark">备注:</th>
                            <td>
                                <textarea name="name" rows="8" cols="40">

                                </textarea>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <button type="button" name="button">确定</button>
        </div>
    </div>
</template>

<script>
import searchBox from '@/components/searchBox/searchBox'
export default {
  name: 'userCallReg',
  components:{
      searchBox
  }
}
</script>

<style lang="less" scoped>
.userCallReg{
    width: 100%;
    // height: 95%;
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
        // width: 100%;
        .content-item{
            width: 45%;
            padding: 15px;
            display: inline-block;
            vertical-align: top;
            // margin-top: 20px;
            .title{
                margin-bottom: 10px;
                margin-top: 10px;
                span{
                    // display: block;
                    font-size: 18px;
                    border-bottom: 3px solid #03003a;
                    padding-bottom: 5px;

                }
            }
            th{
                width: 100px;
                text-align: right;
                padding-right: 20px;
                // line-height: 35px;
            }
            textarea{
                margin-top: 20px;
                border-radius: 2px;
            }
            .remark{
                vertical-align:top;
                position: relative;
                top:20px;
            }
            input{
                border: 1px solid #03003a;
                height: 30px;
                margin-top: 15px;
                // width: 100%;
                border-radius: 3px;
            }

        }
        button{
            display: block;
            width: 160px;
            height: 40px;
            margin: 0 auto;
            border-radius: 5px;
            background-color: #03003a;
            color: #fff;
            border: 0;
            cursor: pointer;
            margin-bottom: 20px;
        }

    }
}

</style>
