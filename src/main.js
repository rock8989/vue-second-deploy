import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
// import store from '@/store/users'
import store from '@/store'
// 위의 것은 아래와 동일 합니다
// import store from '@/store/index.js'
import Cookies from 'js-cookie'
Vue.use(ElementUI, { locale })

// router.beforeEach((to, from, next) => {
//   console.log('======    to     ======')
//   console.log(to)
//   console.log('======    to     ======')

//   console.log('======    from     ======')
//   console.log(from)
//   console.log('======    from     ======')

//   if (Cookies.get('token')) {

//     if (to.path === '/login') {
//       next({ path: `/` })
//     } else {
//       next()
//     }

//   } 
//   else {
//     if (to.path !== '/login') {
//       // next({path:'/login'})
//       next({path:`/login?redirect=${to.path}`})
//     } else {
//       next()
//     }
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
