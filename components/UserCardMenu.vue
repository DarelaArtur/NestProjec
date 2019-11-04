<template>
  <v-menu
    v-if="authUser"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <v-btn icon large v-on="on">
        <v-avatar size="32px" item>
          <img v-if="authUser.photoURL" :src="authUser.photoURL" alt />
          <img v-else src="avatar.png" alt />
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img v-if="authUser && authUser.photoURL" :src="authUser.photoURL" alt />
            <img v-else src="avatar.png" alt />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ authUser.displayName }}</v-list-item-title>
            <v-list-item-subtitle>{{ authUser.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn :class="fav ? 'red--text' : ''" icon @click="makeLogout">
              <v-icon>exit_to_app</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="message" color="purple"></v-switch>
          </v-list-item-action>
          <v-list-item-title>Enable messages</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="hints" color="purple"></v-switch>
          </v-list-item-action>
          <v-list-item-title>Enable hints</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="menu = false">Cancel</v-btn>
        <v-btn color="primary" text @click="menu = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
 computed: mapGetters({
    authUser: 'login/getAuthUser',
  }),
  data() {
    return {
      menu: false,
      hints: false,
      message: false,
      fav: ''
    }
  },
  methods: {
    makeLogout() {
      this.menu = false
      self = this
      firebase
        .auth()
        .signOut()
        .then(function() {})
        .catch(function(error) {
          // An error happened.
        })
    }
  }
}
</script>