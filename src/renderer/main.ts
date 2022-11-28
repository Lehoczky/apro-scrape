import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import Vue from "vue"

import App from "./App.vue"

Vue.config.productionTip = false

new Vue({
  render: function (h) {
    return h(App)
  },
}).$mount("#app")
