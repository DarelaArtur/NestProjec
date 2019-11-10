import firebase from '~/plugins/firebase'
import { dbDefault } from '~/plugins/firebase'
import axios from 'axios'

export const strict = false

export const state = () => ({
  authUser: '',
  infoUser: '',
  newUser: false
})

export const mutations = {
  setAuthUser(state, user) {
    state.authUser = user
  },

  setNewUser(state, value) {
    state.newUser = value
  },

  updateInfoUserCurrency(state, value) {
    state.infoUser.currencySymbol = value
  },

  detectUserInfo(state) {
    axios({ method: 'GET', url: 'https://ipapi.co/json/' }).then(
      result => {
        state.infoUser = {
          currency: result.data.currency,
          currencySymbol: '€',
          country: result.data.country_name,
          language: result.data.country
        }

        if (result.data.currency == 'USD') {
          state.infoUser.currencySymbol = '$'

        } else if (result.data.currency == 'BRL') {
          state.infoUser.currencySymbol = 'R$'

        } else if (result.data.currency == 'EUR') {
          state.infoUser.currencySymbol = '€'
          
        } else if ( result.data.currency == 'GBP') {
          state.infoUser.currencySymbol = '£'
        }

        console.log(state.infoUser.language)
        if(state.infoUser.language == 'PT' || state.infoUser.language == 'BR') {
          this.$router.push($nuxt.switchLocalePath('pt'));
          
        } else {
          this.$router.push($nuxt.switchLocalePath('en'));
        }

      },
      error => {
        console.error(error)
      }
    )
  
  } 
}

export const getters = {
  getAuthUser(state) {
    return state.authUser
  },

  getInfoUser(state) {
    if (!state.infoUser) {
      var emptyInfo = {
        currency: 'EUR',
        currencySymbol: '€',
        language: 'EN'
      }
      return (state.infoUser = emptyInfo)
    } else {
      return state.infoUser
    }
  }
}

export const actions = {
  updateUserCurrency(context, value) {
    if (value == 'EUR') {
      value = '€'
    } else if (value == 'USD') {
      value = '$'
    } else if (value == 'BRL') {
      value = "R$"
    } else if (value == 'GBP') {
      value = "£"
    }

    context.commit('updateInfoUserCurrency', value)
  },

  loginVerify(context) {
    self = this
    return firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('Authenticate...', user)
        // console.log(context.rootState.teste.teste);
        // context.dispatch('teste/testeAction', null, { root: true })
        context.commit('setAuthUser', user)
        context.commit('detectUserInfo')
        context.dispatch('dashboard/loadDashboard', user, { root: true })

        if (context.state.newUser) {
          context.dispatch('loadNewUserStructure')
          context.state.newUser = false
        }

        self.$router.push({ path: '/dashboard' })
      } else {
        // No user is signed in.
        context.commit('setAuthUser', '')
        self.$router.push({ path: '/login' })
        console.log('User not auth')
      }
    })
  },

  loadNewUserStructure(context) {
    let types = [
      {
        icon: 'emoji_transportation',
        name: 'Transport'
      },
      {
        icon: 'highlight',
        name: 'Energy'
      },
      {
        icon: 'stay_primary_portrait',
        name: 'Celphone'
      },
      {
        icon: 'account_balance',
        name: 'Investiment'
      },
      {
        icon: 'local_hospital',
        name: 'Health'
      },
      {
        icon: 'home',
        name: 'Home'
      }
    ]

    types.forEach(function(type) {
      // Get a key for a new Post.
      var newPostKey = dbDefault
        .ref()
        .child('project/' + context.state.authUser.uid + '/types')
        .push().key

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {}
      //updates['/posts/' + newPostKey] = postData;
      updates[
        'project/' +
          context.state.authUser.uid +
          '/types/' +
          newPostKey +
          '/type'
      ] = type
      dbDefault.ref().update(updates)
    })
  }
}
