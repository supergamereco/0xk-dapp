import Vue from 'vue'
import App from './App.vue'
import router from '@/vue-router'
import store from '@/store'
import { i18n } from '@/i18n'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCountdown from '@chenfengyuan/vue-countdown'
import VueClipboard from 'vue-clipboard2'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'bootstrap'; 
// import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueClipboard)

Vue.mixin({
    data: function() {
      return {
          env: process.env,
      }
    }
  })

Vue.config.productionTip = false

Vue.component(VueCountdown.name, VueCountdown)

new Vue({
    i18n,
    store,
    router,
    render: h => h(App),
}).$mount('#app')
