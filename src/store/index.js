import Vue from 'vue'
import Vuex from 'vuex'
import user from './users'
import modal from './modal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    modal
  }
})
