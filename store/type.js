import firebase from '~/plugins/firebase'
import { dbDefault } from '~/plugins/firebase'
export const strict = false

export const state = () => ({
  types: []
})

export const mutations = {
  loadTypes(state, user) {
    dbDefault.ref('/project/' + user.uid + '/types/').on('value', snapshot => {
      var typeList = []
      snapshot.forEach(function(childSnapshot) {
        var type = {
          id: childSnapshot.key,
          name: childSnapshot.val().type.name,
          icon: childSnapshot.val().type.icon
        }
        typeList.push(type)
      })

      state.types = typeList
    })
  },

  createType(state, { type, user }) {
    var newTypeKey = dbDefault
      .ref()
      .child('project/' + user.uid + '/types')
      .push().key

    var updates = {}
    updates['project/' + user.uid + '/types/' + newTypeKey + '/type'] = type
    dbDefault.ref().update(updates)
  },

  deleteType(state, { type, user }) {
    dbDefault
      .ref('/project/' + user.uid + '/types/' + type.id + '/type')
      .remove(function(error) {
        if (error) {
          console.log(error)
        } else {
          // Success data has been created.
        }
      })
  },

  updateType(state, { type, user }) {
    var typeKey = type.id
    delete type.id
    var updates = {}
    updates['project/' + user.uid + '/types/' + typeKey + '/type'] = type
    dbDefault.ref().update(updates)
  }
}

export const getters = {
  getTypes(state) {
    return state.types
  }
}

export const actions = {
  loadAllTypes(context) {
    context.commit('loadTypes', context.rootState.login.authUser)
  },

  insertType(context, type) {
    context.commit('createType', {
      type,
      user: context.rootState.login.authUser
    })
  },

  removeType(context, type) {
    context.commit('deleteType', {
      type,
      user: context.rootState.login.authUser
    })
  },

  editType(context, type) {
    context.commit('updateType', {
      type,
      user: context.rootState.login.authUser
    })
  }
}
