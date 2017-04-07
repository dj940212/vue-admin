<template>
    <div class="header">
        <div class="title">
            <i class="icon iconfont">&#xe6a3;</i>
            <span>{{title}}</span>
        </div>
        <div class="search-box">
            <input class="search-input" type="text" name="" value="">
            <button class="search-button button" type="button" name="button">进入</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'topbar',
  props:['title','icon']
}
</script>

<style lang="less" scoped>
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
        display: inline-block;
        .icon{
            font-size: 28px;
            position: relative;
            top: 4px;
        }
        span{
            margin-left: 5px;
        }
    }
    .search-box{
        display: inline-block;
        float: right;
        .button{
            top: -3px;
            left: -8px;
        }
    }
}
</style>
