declare function require(x: string): any;

import * as Vue from 'vue'
import Component from 'vue-class-component'

const App = require('./components/app.vue')

// new Vue(App).$mount('#app')
Vue.component('app', App)

new Vue({
  el: '#vue-container',
  render (h) {
    return h('app')
  }
})
