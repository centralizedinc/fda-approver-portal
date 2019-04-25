import Vue from 'vue'
import Router from 'vue-router'
import UserLayout from '@/layout/UserLayout'
import MainLayout from '@/layout/MainLayout'
import AuthAPI from './api/AuthAPI'

import store from './store'

Vue.use(Router)

function forPrinting(to, from, next) {
  store.dispatch('IS_FOR_PRINTING').then((isForPrinting) => {
    if (isForPrinting) {
      next()
    } else {
      next('/app')
    }
  }).catch(err => {
    next('/app')
  })
}


function notForPrinting(to, from, next) {
  store.dispatch('IS_FOR_PRINTING').then((isForPrinting) => {
    if (!isForPrinting) {
      next()
    } else {
      next('/app')
    }
  }).catch(err => {
    next('/app')
  })
}

function dropBreadcrumbs(to, from, next) {
  store.commit('DROP_BREADCRUMBS', {
    name: to.name,
    href: to.path
  })
  next();
}

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: MainLayout,
      children: [{
        path: 'review',
        name: 'Review',
        component: () =>
          import('@/components/ReviewApplication.vue')
      }, {
        path: '',
        name: 'Login',
        component: () =>
          import('@/views/Login.vue')
      }, {
        path: 'password/reset/:token',
        name: 'Password Management',
        component: () =>
          import('@/views/app/PasswordManagement/ResetPassword.vue')
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
          console.log('isAuth :', isAuth);
          if (isAuth) {
            //leaving breadcrumbs behind    
            store.commit('DROP_BREADCRUMBS', {
              name: to.name,
              href: to.path
            })
            next()
          } else {
            store.dispatch("LOGOUT");
            next('/')
          }
        })
      },
      children: [{
          path: '',
          name: 'Dashboard',
          component: () =>
            import('@/views/app/UserPortfolio.vue')
        },
        {
          path: 'print',
          name: 'Print',
          beforeEnter: forPrinting && dropBreadcrumbs,
          component: () =>
            import('@/views/app/Print/Print.vue')
        },
        {
          path: 'print/history',
          name: 'Print History',
          beforeEnter: forPrinting && dropBreadcrumbs,
          component: () =>
            import('@/views/app/Print/History.vue')
        },
        {
          path: 'inbox',
          name: 'Inbox',
          beforeEnter: notForPrinting && dropBreadcrumbs,
          component: () =>
            import('@/views/app/Inbox/Inbox.vue')
        }, {
          path: 'participated',
          name: 'Participated Cases',
          beforeEnter: notForPrinting && dropBreadcrumbs,
          component: () =>
            import('@/views/app/Participated/Participated.vue')
        }, {
          path: 'unassigned',
          name: 'Unassigned Cases',
          beforeEnter: notForPrinting && dropBreadcrumbs,
          component: () =>
            import('@/views/app/Unassigned/Unassigned.vue')
        }, {
          path: 'evaluation',
          name: 'Evaluation',
          beforeEnter: notForPrinting && dropBreadcrumbs,
          component: () =>
            import('@/views/app/Evaluation/EvaluationForm.vue')
        }, {
          path: 'profile',
          name: 'Profile Management',
          beforeEnter: dropBreadcrumbs,
          component: () =>
            import('@/views/app/profile.vue')
        }, {
          path: 'password',
          name: 'Password Management',
          beforeEnter: dropBreadcrumbs,
          component: () =>
            import('@/views/app/PasswordManagement/ChangePassword.vue')
        }

      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})