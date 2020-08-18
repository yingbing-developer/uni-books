import Vue from 'vue'
import App from './App'
import '@/common/router'//引入路由

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
