import * as types from './types'

export default {
  increment:({
    commit
  })=>{
    commit(types.INCREMENT);
  }
}
