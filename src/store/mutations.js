import {INCREMENT,TOGGLESIDEBAR,FULLSCREEN} from './types'
import getters from './getters'

const state = {
  count:20,
  isSidebarOpen:true,
  isFullScreen:false
};

const mutations = {
  [INCREMENT](state){
    state.count++;
  },
  [TOGGLESIDEBAR](state){
    state.isSidebarOpen=!state.isSidebarOpen;
    let sidebarWidth = document.getElementById('sidebar').clientWidth;
    if (sidebarWidth) {
      sidebarWidth =0;
    }else {
      sidebarWidth=181;
    }
    document.getElementById('routerView').style.width = (window.innerWidth-sidebarWidth)+"px";
    document.getElementById('header').style.width=(window.innerWidth-sidebarWidth)+"px";
  },
  [FULLSCREEN](state){
    state.isFullScreen=!state.isFullScreen;
    if (state.isFullScreen) {
      document.getElementById('header').style.display="none";
      document.getElementById('map-header').style.display="none";
      document.getElementById('routerView').style.height = "100%";
      document.getElementById('map-content').style.height = "100%";
      console.log(document.getElementById('header'));
      console.log("全屏全屏ddddddddd");
    }else {
      document.getElementById('header').style.display="block";
      document.getElementById('map-header').style.display="block";
      document.getElementById('routerView').style.height = (window.innerHeight-56)+"px";
      document.getElementById('map-content').style.height = "90%";
    }

  }
}

export default {
  state,
  mutations,
  getters
}
