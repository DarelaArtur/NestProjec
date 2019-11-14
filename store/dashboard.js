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

  createNewExpense(state, {expense, currentMonth, user}) {
    var newExpenseKey = dbDefault
      .ref()
      .child('project/' + user.uid + '/expenses/' + currentMonth +'/' + expense.expanseType)
      .push().key

    var updates = {}
    updates['project/' + user.uid + '/expenses/'+ currentMonth +'/' + expense.expenseType +'/'+ newExpenseKey + '/expense'] = expense
    dbDefault.ref().update(updates)

  }
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

  createExpanse(context, {expense, currentMonth}) {

    context.commit('createNewExpense', {expense, currentMonth, user: context.rootState.login.authUser})
  }
}