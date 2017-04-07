import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import userinfo from '@/components/userinfo/userinfo'
import mapsearch from '@/components/mapsearch/mapsearch'
import stationmap from '@/components/stationmap/stationmap'
import userInfoManage from '@/components/userInfoManage/userInfoManage'
import userCallReg from '@/components/userCallReg/userCallReg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo
    },{
      path: '/mapsearch',
      name: 'mapsearch',
      component: mapsearch
    },{
      path: '/stationmap',
      name: 'stationmap',
      component: stationmap
  },{
      path: '/userInfoManage',
      name: 'userInfoManage',
      component: userInfoManage
  },{
      path: '/userCallReg',
      name: 'userCallReg',
      component: userCallReg
  }
  ]
})
