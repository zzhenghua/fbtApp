import Vue from 'vue'
import App from './App'
import store from './store'

import $util from './common/util'
import $path from './common/path'
import $ajax from './common/ajax'

Vue.config.productionTip = false
Vue.prototype.$path = $path;
Vue.prototype.$util = $util;
Vue.prototype.$ajax = $ajax;
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

