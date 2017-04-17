window.onload = function(){
  document.getElementById('routerView').style.width = (window.innerWidth-180)+"px";
  document.getElementById('routerView').style.height = (window.innerHeight-70)+"px";

  document.getElementById('app').style.height = window.innerHeight + "px";
  document.getElementById('app').style.height = window.innerWidth + "px";
}
window.onresize=function() {
        document.getElementById('routerView').style.width = (window.innerWidth-180)+"px";
        document.getElementById('routerView').style.height = (window.innerHeight-70)+"px";
        document.getElementById('app').style.height = window.innerHeight + "px";
        document.getElementById('app').style.height = window.innerWidth + "px";


        // document.getElementById('tab').style.width = (window.innerHeight-290)+"px";
        document.getElementById('sidebar').style.height = "100%";

}
