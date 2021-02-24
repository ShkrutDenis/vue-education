window.Vue = require('vue')

Vue.component('field', require('./components/Field.vue').default)
Vue.component('game', require('./components/Game.vue').default)

const app = new Vue({
  el: '#app',
})
