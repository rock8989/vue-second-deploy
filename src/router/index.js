import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(VueRouter)

const routes = [

  {
    path:'/login', name:'Login', component: () => import('@/views/login')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/helloworld',
    name: 'HelloWorld',
    children: [{
      path: '/helloworld',
      component: () => import('@/views/HelloWorld')
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('@/views/registration/Registration')
      },
    ]
  },
  {
    path: '/notice',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'NoticeList',
        component: () => import('@/views/notice/NoticeList.vue')
      },
      {
        path: 'register',
        name: 'NoticeRegister',
        component: () => import('@/views/notice/NoticeRegister.vue')
      },
      {
        path: 'detail',
        name: 'NoticeDetail',
        component: () => import('@/views/notice/NoticeDetail.vue')
      }
    ]
  },
  {
    path: '/popup',
    component: Layout,
    children: [
      {
        path:'register',
        name: 'PopupRegister',
        component: () => import('@/views/popup/PopupRegister')
      }
    ]
  },
  {
    path: '*',
    component: Layout,
    children: [
      {
        path: '*',
        name: 'NotFound',
        component: () => import('@/404')
      }
    ]
  },
]

export default new VueRouter({
  routes
})
