import {INCREMENT,TOGGLESIDEBAR} from './types'
import getters from './getters'

const state = {
  count:20,
  isSidebarOpen:true
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
    console.log(sidebarWidth);

    document.getElementById('header').style.width=(window.innerWidth-sidebarWidth)+"px";


  }
}

export default {
  state,
  mutations,
  getters
}
