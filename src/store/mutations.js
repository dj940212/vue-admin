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
    state.isSidebarOpen=!state.isSidebarOpen
    console.log(state.isSidebarOpen);
    
  }
}

export default {
  state,
  mutations,
  getters
}
