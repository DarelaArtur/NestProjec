import firebase from '~/plugins/firebase'
import {dbDefault} from '~/plugins/firebase'
export const strict = false

export const state = () => ({
  dashBoard: '',
  fixedExpenses: [],
  variableExpenses: [],
  fixedTotalAmount: 0.00,
  variableTotalAmount: 0.00,

})

export const mutations = {
  loadDefaultDashboard(state, { user, currentMonth } ) {
    console.log("Loading dashboard to User:", user.uid, currentMonth);

    dbDefault.ref('/project/' + user.uid + '/expenses/'+ currentMonth + '/fixed').on('value', snapshot => {
      var expensesList = []
      state.fixedTotalAmount = 0.00

      snapshot.forEach(function(childSnapshot) {
        var expense = {
          amount : childSnapshot.val().expense.amount,
          categoryId : childSnapshot.val().expense.categoryId,
          description : childSnapshot.val().expense.description,
          expenseType : childSnapshot.val().expense.expenseType,
          payday : childSnapshot.val().expense.payday,
          id: childSnapshot.key
        }
        
        state.fixedTotalAmount = Number(state.fixedTotalAmount) + Number(expense.amount)
        expensesList.push(expense)
      })
      state.fixedExpenses = expensesList
    })

    dbDefault.ref('/project/' + user.uid + '/expenses/'+ currentMonth + '/variable').on('value', snapshot => {
      var expensesList = []
      state.variableTotalAmount = 0.00

      snapshot.forEach(function(childSnapshot) {
        var expense = {
          amount : childSnapshot.val().expense.amount,
          categoryId : childSnapshot.val().expense.categoryId,
          description : childSnapshot.val().expense.description,
          expenseType : childSnapshot.val().expense.expenseType,
          payday : childSnapshot.val().expense.payday,
          id: childSnapshot.key
        }
        state.variableTotalAmount = Number(state.variableTotalAmount) + Number(expense.amount)
        expensesList.push(expense)
      })
      state.variableExpenses = expensesList
    })
    
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
  },

  getFixedExpenses(state) {
    return state.fixedExpenses
  },

  getVariableExpenses(state) {
    return state.variableExpenses
  },

  getFixedTotalAmount(state) {
    return state.fixedTotalAmount
  },

  getVariableTotalAmount(state) {
    return state.variableTotalAmount
  }


}

export const actions = {
  loadDashboard(context, currentMonth) {
    context.commit('loadDefaultDashboard', { user: context.rootState.login.authUser, currentMonth })
  },

  createExpanse(context, {expense, currentMonth}) {

    context.commit('createNewExpense', {expense, currentMonth, user: context.rootState.login.authUser})
  }
}