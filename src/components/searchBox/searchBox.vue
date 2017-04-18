<template>
    <div class="search-box">
        <input class="search-input" type="text" name="" value="">
        <button class="search-button button" type="button" name="button">{{text}}</button>
    </div>
</template>

<script>
export default {
  name: 'searchBox',
  props:['text']
}
</script>

<style lang="less" scoped>
.search-box{
    display: inline-block;
    float: right;
    input{
        font-size: 16px;
    }
    .button{
        left: -8px;
        line-height: 34px;
    }
}
</style>
