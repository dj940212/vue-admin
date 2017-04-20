<template>
    <div class="mylogin">
        <div src="./map.png" class="background"></div>
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
            position: absolute;
            filter: blur(20px);
            width: 104%;
            height: 104%;
            top: -2%;
            left: -2%;
            bottom: -2%;
            right: -2%;
            background-image: url("./map.jpg");
        }
    }
</style>
