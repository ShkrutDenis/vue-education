window.Vue = require('vue')

Vue.component('list', require('./components/List.vue').default)
// Vue.component('product', require('./components/Product.vue').default)

const app = new Vue({
  el: '#app',
})
