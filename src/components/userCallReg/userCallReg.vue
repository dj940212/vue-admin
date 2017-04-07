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
    height: 95%;
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

    }
}

</style>
