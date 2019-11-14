import firebase from '~/plugins/firebase'
import { dbDefault } from '~/plugins/firebase'
export const strict = false

export const state = () => ({
  categories: []
})

export const mutations = {
  loadCategories(state, user) {
    dbDefault.ref('/project/' + user.uid + '/categories/').on('value', snapshot => {
      var categoryList = []
      snapshot.forEach(function(childSnapshot) {
        var category = {
          id: childSnapshot.key,
          name: childSnapshot.val().category.name,
          icon: childSnapshot.val().category.icon
        }
        categoryList.push(category)
      })

      state.categories = categoryList
    })
  },

  createCategory(state, { category, user }) {
    var newTypeKey = dbDefault
      .ref()
      .child('project/' + user.uid + '/categories')
      .push().key

    var updates = {}
    updates['project/' + user.uid + '/categories/' + newTypeKey + '/category'] = category
    dbDefault.ref().update(updates)
  },

  deleteCategory(state, { category, user }) {
    dbDefault
      .ref('/project/' + user.uid + '/categories/' + category.id + '/category')
      .remove(function(error) {
        if (error) {
          console.log(error)
        } else {
          // Success data has been created.
        }
      })
  },

  updateCategory(state, { category, user }) {
    var categoryKey = category.id
    delete category.id
    var updates = {}
    updates['project/' + user.uid + '/categories/' + categoryKey + '/category'] = category
    dbDefault.ref().update(updates)
  }
}

export const getters = {
  getCategories(state) {
    return state.categories
  }
}

export const actions = {
  loadAllCategories(context) {
    context.commit('loadCategories', context.rootState.login.authUser)
  },

  insertCategory(context, category) {
    context.commit('createCategory', {
      category,
      user: context.rootState.login.authUser
    })
  },

  removeCategory(context, category) {
    context.commit('deleteCategory', {
      category,
      user: context.rootState.login.authUser
    })
  },

  editCategory(context, category) {
    context.commit('updateCategory', {
      category,
      user: context.rootState.login.authUser
    })
  }
}
