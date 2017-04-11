window.onload = function(){
  document.getElementById('routerView').style.width = (window.innerWidth-180)+"px";
  document.getElementById('routerView').style.height = (window.innerHeight-70)+"px";

  document.getElementById('breadcrumb').style.width = (window.innerWidth-180)+"px";
}
window.onresize=function() {
        document.getElementById('routerView').style.width = (window.innerWidth-180)+"px";
        document.getElementById('routerView').style.height = (window.innerHeight-70)+"px";

        document.getElementById('breadcrumb').style.width = (window.innerWidth-180)+"px";

        document.getElementById('tab').style.width = (window.innerHeight-290)+"px";
}
