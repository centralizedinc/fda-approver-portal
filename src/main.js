import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import * as VueGoogleMaps from 'vue2-google-maps'

import NProgress from "nprogress";
import "../node_modules/nprogress/nprogress.css";
import mixins from "@/plugins/mixins";
import notify from "@/plugins/notify";
import print from 'fda-pdf-printer-plugin';

Vue.use(mixins)
Vue.use(print)
Vue.use(notify, store)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB-cPzUnnkk0E_4pYYYiPk0zo9q4tvqqrs',
    libraries: 'places'
  }
})

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");