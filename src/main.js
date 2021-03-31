import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import 'swiper/css/swiper.css'
import '@/mock/mockServer'
import slideshow from'@/components/slideshow'
import pagination from '@/components/Pagination'
Vue.config.productionTip = false

 Vue.component(TypeNav.name,TypeNav)
 Vue.component(slideshow.name,slideshow)
 Vue.component('pagination',pagination)

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this  //安装总线
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
