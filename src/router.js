import Vue from 'vue'
import Router from 'vue-router'
import UserLayout from '@/layout/UserLayout'
import MainLayout from '@/layout/MainLayout'
import AuthAPI from './api/AuthAPI'

import store from './store'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: MainLayout,
      children: [{
        path: '',
        name: 'Login',
        component: () => import('@/views/Login.vue')
      }],
      beforeEnter: (to, from, next) => {
        new AuthAPI().checkAuth(store.state.user_session.token, (isAuth) => {
          if (isAuth) {
            next('/app')
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/app',
      component: UserLayout,
      beforeEnter: (to, from, next) => {
        new AuthAPI().checkAuth(store.state.user_session.token, (isAuth) => {
          if (isAuth) {
            next()
          } else {
            store.commit('LOGOUT')
            next('/')
          }
        })
      },
      children: [{
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/app/UserPortfolio.vue')
      }, 
      {
        path: 'print',
        name: 'Print',
        component: () => import('@/views/app/Print/Print.vue')
      },
      {
        path: 'print/history',
        name: 'Print History',
        component: () => import('@/views/app/Print/History.vue')
      },
      {
        path: 'inbox',
        name: 'Inbox',
        component: () => import('@/views/app/Inbox/Inbox.vue')
      }, {
        path: 'participated',
        name: 'Participated',
        component: () => import('@/views/app/Participated/Participated.vue')
      }, {
        path: 'unassigned',
        name: 'Unassigned',
        component: () => import('@/views/app/Unassigned/Unassigned.vue')
      }, {
        path: 'evaluation',
        name: 'Evaluation',
        component: () => import('@/views/app/Evaluation/EvaluationForm.vue')
      },{
        path: 'profile',
        name: 'Profile Management',
        component: () => import('@/views/app/profile.vue')
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})