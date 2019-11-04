import firebase from '~/plugins/firebase'
export const strict = false

export const state = () => ({
    authUser: ''
  })
  
  export const mutations = {

    setAuthUser (state, user) {
        state.authUser = user;
      },
  }
  
  export const getters = {
    getAuthUser (state) {
        return state.authUser
      }
  } 

  export const actions = {
    checkLogin(context) {
      context.dispatch('loginVerify')
    },

    loginVerify(context) {
      self = this
      return firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log('Authenticate...', user);
         // console.log(context.rootState.teste.teste);
         // context.dispatch('teste/testeAction', null, { root: true })
          context.commit('setAuthUser', user);
          self.$router.push({ path: '/dashboard' })
          //context.dispatch('verifyDatabaseUser')
        } else {
          // No user is signed in.
          context.commit('setAuthUser', '');
          self.$router.push({ path: '/login' })
          console.log("User not auth");
          
        }
      });
    }
}