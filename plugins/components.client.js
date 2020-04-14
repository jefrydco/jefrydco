import Vue from 'vue'
import { VueScrollIndicator } from 'vue-scroll-indicator'
import Intersect from 'vue-intersect'
import VueRecaptcha from 'vue-recaptcha'

Vue.component('vue-scroll-indicator', VueScrollIndicator)
Vue.component('Intersect', Intersect)
Vue.component(VueRecaptcha.name, VueRecaptcha)
