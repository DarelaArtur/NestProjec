import Vue from 'vue'
import money from 'v-money'

// register directive v-money and component <money>
export default () => {
    Vue.use(money)
  }
