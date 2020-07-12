import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@/css/global.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import './services/filters'
import AOS from 'aos'
import 'aos/dist/aos.css' 
import KEY from './google-helper.js'
//google maps
import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
  load: {
    key: KEY,
    libraries: 'places'
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created(){AOS.init()},
  render: h => h(App)
}).$mount('#app')
