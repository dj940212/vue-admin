window.onload = function(){
  var sidebarWidth = document.getElementById('sidebar').clientWidth;
  document.getElementById('routerView').style.width = (window.innerWidth-sidebarWidth)+"px";
  document.getElementById('routerView').style.height = (window.innerHeight-58)+"px";

  document.getElementById('app').style.height = window.innerHeight + "px";
  document.getElementById('app').style.width = window.innerWidth + "px";

  document.getElementById('header').style.width = (window.innerWidth-sidebarWidth)+"px";
}
window.onresize=function() {
      var sidebarWidth = document.getElementById('sidebar').clientWidth;
      if (document.getElementById('header').style.display==="none") {
        document.getElementById('routerView').style.width = (window.innerWidth-sidebarWidth)+"px";
        document.getElementById('routerView').style.height = "100%";
        document.getElementById('app').style.height = window.innerHeight + "px";
        document.getElementById('app').style.width = window.innerWidth + "px";
        document.getElementById('header').style.width = (window.innerWidth-sidebarWidth)+"px";
      }else {
        document.getElementById('routerView').style.width = (window.innerWidth-sidebarWidth)+"px";
        document.getElementById('routerView').style.height = (window.innerHeight-56)+"px";
        document.getElementById('app').style.height = window.innerHeight + "px";
        document.getElementById('app').style.width = window.innerWidth + "px";
        document.getElementById('header').style.width = (window.innerWidth-sidebarWidth)+"px";
      }
}
