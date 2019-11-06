<template>
  <v-app>
    <main>
      <v-container fluid fill-height class="loginOverlay">
        <v-layout flex align-center justify-center>
          <v-flex xs12 sm4 elevation-6>
            <v-overlay :value="overlay">
              <v-progress-circular  color="primary" indeterminate size="64"></v-progress-circular>
            </v-overlay>
            <v-toolbar class="pt-5 blue darken-4">
              <v-toolbar-title class="white--text">
                <h4>Welcome</h4>
              </v-toolbar-title>
            </v-toolbar>
            <v-card>
              <v-card-text class="pt-4" style="text-align: center;">
                <v-img
                  src="logo-manager.png"
                  style="margin-left: auto; margin-right: auto;"
                  max-width="50"
                  max-height="50"
                ></v-img>
                <span>Patrimonial Manager</span>
                <br />
                <br />
                <div>
                  <v-img
                    src="loginwithfb.png"
                    @click="makeLogin('facebook')"
                    style="margin-left: auto; margin-right: auto;"
                    max-width="200"
                    max-height="100"
                  ></v-img>
                </div>
                <div>
                  <v-img
                    src="google-button.png"
                    @click="makeLogin('google')"
                    style="margin-left: auto; margin-right: auto;"
                    max-width="200"
                    max-height="100"
                  ></v-img>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import firebase from '~/plugins/firebase'
import { google_provider } from '~/plugins/firebase'
import { facebook_provider } from '~/plugins/firebase'

export default {
  data: () => ({
     overlay: false,
  }),

    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 6000)
      },
    },

  methods: {
    makeLogin(loginType) {

      if(loginType == 'google') {
        var provider = google_provider
        provider.addScope('profile')

      } else if (loginType == 'facebook') {
         var provider = facebook_provider
      }
     provider.addScope('email')

      this.overlay = true

      self = this
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken
          // The signed-in user info.
          var user = result.user
          console.log(result)
          
          if(result.additionalUserInfo.isNewUser) {
            self.$store.commit('login/setNewUser', true)
          }
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          // ...
        })
    }
  }
}
</script>