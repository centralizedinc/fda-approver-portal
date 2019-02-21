import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Notifications from './components/NotificationPlugin';

import NProgress from "nprogress";
import "../node_modules/nprogress/nprogress.css";
import mixins from "@/plugins/mixins"

Vue.use(mixins)

Vue.config.productionTip = false;
NProgress.configure({
  showSpinner: false,
  trickleRate: 0.5,
  trickleSpeed: 800
});
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

Vue.use(Notifications)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");