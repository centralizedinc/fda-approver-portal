import Vue from 'vue'
import Router from 'vue-router'
import UserLayout from '@/layout/UserLayout'
import MainLayout from '@/layout/MainLayout'
import AccountAPI from './api/AccountAPI'

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
        new AccountAPI().checkAuth(isAuth => {
          if (store.state.user_session.isAuthenticated && isAuth && store.state.user_session.token) {
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
        new AccountAPI().checkAuth(isAuth => {
          if (store.state.user_session.isAuthenticated && isAuth && store.state.user_session.token) {
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
        }, {
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
        },
        {
          path: 'licenses',
          name: 'License To Operate',
          component: () => import('@/views/app/licenses/Licenses.vue')
        },
        {
          path: 'licenses/apply',
          name: 'New License Application',
          component: () => import('@/views/app/licenses/Apply.vue')
        },
        {
          path: 'certificates',
          name: 'Certificates',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'payments',
          name: 'Payments',
          component: () => import('@/views/app/UserPortfolio.vue')
        },
      ]

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