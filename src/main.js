// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Resource from 'vue-resource'
import { TimePicker, DatePicker, Table, TableColumn, Tooltip, Input, Switch, Popover, Button, Icon, Form, FormItem, Upload, Row, Col, Autocomplete, Card} from 'element-ui'
import global_ from './common/vue/global.vue'
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
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)
Vue.use(Col)
Vue.use(Row)
Vue.use(Autocomplete)
Vue.use(Card)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
