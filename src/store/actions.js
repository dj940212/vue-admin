import * as types from './types'

export default {
  increment:({
    commit
  })=>{
    commit(types.INCREMENT);
  },
  toggleSidebar:({
    commit
  })=>{
    commit(types.TOGGLESIDEBAR)
  },
  fullScreen:({
    commit
  })=>{
    commit(types.FULLSCREEN)
  }
}
