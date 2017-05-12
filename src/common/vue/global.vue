<!-- 全局常量 -->
<script>
import Vue from 'vue';
const port = "http://121.196.194.14";

const message=function () {
    alert("1243241");

}
const getCookie=function(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
const delCookie=function(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
const checkLogin=function(){
  //检查是否存在session
  if(!this.getCookie('session')){
    this.$router.push('/login');
  }else{
    this.$router.push('/mapsearch');
  }
}
const setCookie=function(c_name, value, expiredays){
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
//初始化地图
const initMap=function(mapOptions){
    var amap = new AMap.Map('base-station-map', mapOptions);
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
      amap.addControl(new AMap.ToolBar());
      amap.addControl(new AMap.Scale());
    });
}
//坐标转换地址
const lonlatToAddr = function(lonlat,data) {
  AMap.service('AMap.Geocoder', () => { //回调函数
    //实例化Geocoder
    var geocoder = new AMap.Geocoder();
    geocoder.getAddress(lonlat, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        //TODO:获得了有效经纬度，可以做一些展示工作
        data.address = result.regeocode.formattedAddress;
        data.adcode = result.regeocode.addressComponent.adcode;

      } else {
        //获取经纬度失败
      }
    });
  });
}
//坐标转换地址
const lonlatToAddr2 = function(lonlat,data,cb) {
  AMap.service('AMap.Geocoder', () => { //回调函数
    var geocoder = new AMap.Geocoder();
    geocoder.getAddress(lonlat, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        //TODO:获得了有效经纬度，可以做一些展示工作
        data.address = result.regeocode.formattedAddress;
        data.adcode = result.regeocode.addressComponent.adcode;

        cb && cb();

      } else {
        //获取经纬度失败
      }
    });
  });
}
//格式化日期
const formatDate=function(value){
    if(value){
        var year = value.getFullYear();
        var month = value.getMonth() + 1;
        var date = value.getDate();
        var hours = value.getHours();
        var minutes = value.getMinutes();
        var seconds = value.getSeconds()
        if (month >=1 && month <= 9) {
            month = "0"+month;
        }
        if (date >= 0 && date <= 9) {
            date = "0"+date;
        }
        if (hours >=1 && hours <= 9) {
            hours = "0"+hours;
        }
        if (minutes >= 1 && minutes <= 9) {
            minutes = "0"+minutes;
        }
        if (seconds >= 1 && seconds <= 9) {
            seconds = "0"+ seconds;
        }
        return year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
    }
    return
}
//构建自定义信息窗体
const createInfoWindow = function(title,content){
    var info = document.createElement("div");
    info.className = "info-window";

    //可以通过下面的方式修改自定义窗体的宽高
    info.style.width = "270px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    // var closeX = document.createElement("img");
    top.className = "info-window-top";
    titleD.innerHTML = title;
    // closeX.src = "http://webapi.amap.com/images/close2.gif";
    // closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);
    // top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-window-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-window-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    var sharp = document.createElement("img");
    sharp.src = "http://webapi.amap.com/images/sharp.png";
    bottom.appendChild(sharp);
    info.appendChild(bottom);
    return info;
}
//组建通信
const bus = new Vue();
export default{
    port,
    message,
    initMap,
    lonlatToAddr,
    lonlatToAddr2,
    createInfoWindow,
    formatDate,
    setCookie,
    bus
}
</script>
