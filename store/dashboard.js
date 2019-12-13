import firebase from '~/plugins/firebase'
import {dbDefault} from '~/plugins/firebase'
import moment from 'moment'
import momentTimezone from 'moment-timezone'

export const strict = false

export const state = () => ({
  dashBoard: '',
  fixedExpenses: [],
  variableExpenses: [],
  fixedTotalAmount: '0.00',
  variableTotalAmount: '0.00',
  totalExpenses: '0.00',
  salary: '0.00',
  balance: '0.00',
  currentMonth: moment().format('YYYY-MM')

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
        
        state.fixedTotalAmount = parseFloat(Number(state.fixedTotalAmount) + Number(expense.amount)).toFixed(2)
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
        state.variableTotalAmount = parseFloat(Number(state.variableTotalAmount) + Number(expense.amount)).toFixed(2) 
        expensesList.push(expense)
      })
      state.variableExpenses = expensesList
    })

    dbDefault.ref('/project/' + user.uid + '/expenses/'+ currentMonth + '/salaryCard').on('value', snapshot => {
      if(snapshot.val() && snapshot.val().salary) {
        state.salary = parseFloat(Number(snapshot.val().salary)).toFixed(2) 

      } else {
        state.salary = '0.00'
      }
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

  },

  updateExpense(state, {expense, currentMonth, user}) {
    var expenseId = expense.id
    delete expense.id
    var updates = {}
    updates['project/' + user.uid + '/expenses/'+ currentMonth +'/' + expense.expenseType +'/'+ expenseId + '/expense'] = expense
    dbDefault.ref().update(updates)
  },

  deleteExpense(state, {expense, currentMonth, user}) { 
    dbDefault
    .ref('/project/' + user.uid + '/expenses/'+ currentMonth +'/' + expense.expenseType +'/'+ expense.id + '/expense')
    .remove(function(error) {
      if (error) {
        console.log(error)
      } else {
        // Success data has been created.
      }
    })
  },

  saveSalary(state, {salary, currentMonth, user}) {
    var updates = {}
    updates['/project/' + user.uid + '/expenses/'+ currentMonth + '/salaryCard/salary'] = salary
    dbDefault.ref().update(updates)
  },

  selecOtherMonth(state, newMonth) {
    state.currentMonth = newMonth
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
  },

  getTotalExpenses(state) {
    state.totalExpenses = parseFloat(Number(state.fixedTotalAmount) + Number(state.variableTotalAmount)).toFixed(2)
    return state.totalExpenses
  },

  getSalary(state) {
    return state.salary
  },

  getBalance(state) {
    state.balance = parseFloat(Number(state.salary) - Number(state.totalExpenses)).toFixed(2)
    return state.balance
  },

  getCurrentMonth(state) {
    return state.currentMonth 
  }

}

export const actions = {
  loadDashboard(context, currentMonth) {
    context.commit('loadDefaultDashboard', { user: context.rootState.login.authUser, currentMonth })
  },

  createExpense(context, {expense, currentMonth}) {
    context.commit('createNewExpense', {expense, currentMonth, user: context.rootState.login.authUser})
  },

  saveMySalary(context, {salary, currentMonth}) {
    context.commit('saveSalary', {salary, currentMonth, user: context.rootState.login.authUser})
  },

  selectMonth(context, newMonth) {
    context.commit('selecOtherMonth', newMonth)
    context.dispatch('loadDashboard', newMonth)
  },

  setCurrentMonth(context, newMonth) {
    context.commit('selecOtherMonth', newMonth)
  },

  editExpense(context, {expense, currentMonth}) {
    context.commit('updateExpense', {expense, currentMonth, user: context.rootState.login.authUser})
  },

  removeExpense(context, {expense, currentMonth}) {
    context.commit('deleteExpense', {expense, currentMonth, user: context.rootState.login.authUser})
  }


}