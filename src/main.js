// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'
import { TimePicker, DatePicker } from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false

Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Resource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
