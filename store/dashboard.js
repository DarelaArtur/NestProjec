import firebase from '~/plugins/firebase'
import {dbDefault} from '~/plugins/firebase'
export const strict = false

export const state = () => ({
  dashBoard: '',

})

export const mutations = {
  loadDefaultDashboard(state, user) {
    console.log("Loading dashboard to User:", user.uid)
  },
}

export const getters = {
  getDashBoard(state) {
    return state.dashBoard
  }
}

export const actions = {
  loadDashboard(context, user) {
    context.commit('loadDefaultDashboard', user)
  },
}