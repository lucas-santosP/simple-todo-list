import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;

import "@/css/reset.css";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
