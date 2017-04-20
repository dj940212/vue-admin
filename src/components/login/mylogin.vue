<template>
    <div class="mylogin">
        <div class="background"></div>
    </div>
</template>

<script>
import backgroundImageUrl from "@/components/login/map.png"
export default {
  name: 'mylogin'
}
</script>

<style lang="less" scoped>
    .mylogin{
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
        // margin: 20px auto;
        z-index: 200;
        top: 0;
        left: 0;
        .background{
            background-color: red;
            position: absolute;
            filter: blur(2px);
            width: 100%;
            height: 100%;
            background-image: url("./background1.png");
            background-size: contain;
        }
    }
</style>
