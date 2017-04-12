<!-- 全局常量 -->
<script>
const port = "http://121.196.194.14";
//获取用户信息
function getUserInfo() {
  this.$http.post(this.apiUrl, {
    mac: this.mac
  }, {
    emulateJSON: true
  }).then((res) => {
    console.log(res.data)
    if (res.data.lp == 0 && res.data.data.msg == "请求成功") {
      if (res.data.data.list) {
        this.user = res.data.data.list[0];
        console.log(this.user)
      }

    } else {
      alert('找不到该设备，请重新输入！');
    }
  }, (res) => {
    console.log(res.status)
  })
  this.$root.$emit("mapsearch.getUserInfo",this.getUserInfo);
}
export default{
    port,
    getUserInfo
}
</script>
