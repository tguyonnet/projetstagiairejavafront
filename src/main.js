import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router.js'

Vue.prototype.$api = 'http://localhost:8080/api/'

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


Vue.config.productionTip = false

