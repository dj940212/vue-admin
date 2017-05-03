// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'
import { TimePicker, DatePicker, Table, TableColumn, Tooltip, Input, Switch, Popover, Button, Icon } from 'element-ui'
import global_ from './common/vue/global.vue'
// import Mock from 'mockjs'
//
// console.log("mock==>",Mock)
// Mock.mock(/\.json/, {
//     'list|1-10': [{
//         'id|+1': 1,
//         'email': '@EMAIL'
//     }]
// });

Vue.prototype.global = global_

Vue.config.productionTip = false

Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(Resource)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Popover)
Vue.use(Button)
Vue.use(Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
