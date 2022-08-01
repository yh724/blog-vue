import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import './fonts/iconfont.css'
import * as echarts from 'echarts';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);

Vue.prototype.$echarts = echarts

axios.defaults.baseURL = 'http://localhost:8181/myblog'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
