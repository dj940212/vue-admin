import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from '@/components/register/register'
import userinfo from '@/components/userinfo/userinfo'
import mapsearch from '@/components/mapsearch/mapsearch'
import stationmap from '@/components/stationmap/stationmap'
import userInfoManage from '@/components/userInfoManage/userInfoManage'
import userManage from '@/components/userManage/userManage'
import userCallReg from '@/components/userCallReg/userCallReg'
import userCallSearch from '@/components/userCallSearch/userCallSearch'
import trackQuery from '@/components/trackQuery/trackQuery'
import stationData from '@/components/stationData/stationData'
import userLocatorReg from '@/components/userLocatorReg/userLocatorReg'
import eleFence from '@/components/eleFence/eleFence'
import test from '@/components/test/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'login',
      components:{
          mylogin:login
      }
    },
    {
      path: '/register',
      name:'register',
      components:{
          mylogin:register
      }
    },
    {
      path: '/login',
      name: 'login',
      components:{
          mylogin:login
      }
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
      path: '/userManage',
      name: 'userManage',
      component: userManage
  },{
      path: '/userCallReg',
      name: 'userCallReg',
      component: userCallReg
  },{
      path: '/userCallSearch',
      name: 'userCallSearch',
      component: userCallSearch
  },{
      path: '/trackQuery',
      name:'trackQuery',
      component: trackQuery
  },{
      path: '/stationData',
      name: 'stationData',
      component:stationData
  },{
      path: '/userLocatorReg',
      name:'userLocatorReg',
      component:userLocatorReg
  },{
      path: '/eleFence',
      name:'eleFence',
      component:eleFence
  },{
      path: '/test',
      name:'test',
      component:test
  }
  ]
})
