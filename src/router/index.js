import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import mylogin from '@/components/login/mylogin'
import userinfo from '@/components/userinfo/userinfo'
import mapsearch from '@/components/mapsearch/mapsearch'
import stationmap from '@/components/stationmap/stationmap'
import userInfoManage from '@/components/userInfoManage/userInfoManage'
import userCallReg from '@/components/userCallReg/userCallReg'
import userCallSearch from '@/components/userCallSearch/userCallSearch'
import trackQuery from '@/components/trackQuery/trackQuery'
import stationData from '@/components/stationData/stationData'
import userLocatorReg from '@/components/userLocatorReg/userLocatorReg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'mapsearch',
      component: mapsearch
    },
    {
      path: '/mylogin',
      name: 'mylogin',
      components:{
          mylogin:mylogin
      }
    },{
      path: '/login',
      name: 'login',
      component:login
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
  }
  ]
})
