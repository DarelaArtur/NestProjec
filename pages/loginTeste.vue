<template>
    <v-layout row class="text-xs-center" style="margin-left: auto; margin-right: auto;">
      <v-flex xs3 >
        <v-card style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')" height="500px"></v-card>
      </v-flex>
      <v-flex xs4 class="">
        <v-container style="position: relative;top: 0%;"  class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
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
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  <!--div>
    <v-img v-if="!authUser"
      src="google-button.png"
      @click="makeLogin"
      class="grey lighten-2"
      max-width="200"
      max-height="100"
    ></v-img>
     <v-btn v-else rounded color="primary" dark @click="makeLogout">Logout</v-btn>
    {{ authUser }}
    
  </div-->
</template>

<script>
import firebase from '~/plugins/firebase'
import { google_provider } from '~/plugins/firebase'

export default {
  data: () => ({
    authUser: ''
  }),

  beforeMount() {
      self = this;
        /** firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
              self.authUser = user;
            console.log('Authenticate...', user);
          } else {
            console.log("User not auth");
            
          }
        });  */
  },

  methods: {
    makeLogin() {
      console.log(firebase.auth().currentUser)
      if (firebase.auth().currentUser) {
        this.authUser = firebase.auth().currentUser
      } else {
        var provider = google_provider
        provider.addScope('profile')
        provider.addScope('email')

        self = this
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken
            // The signed-in user info.
            var user = result.user
            self.authUser = result
            console.log(result)
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
    },

    makeLogout() {
        self = this
      firebase
        .auth()
        .signOut()
        .then(function() {
          self.authUser = '';
        })
        .catch(function(error) {
          // An error happened.
        })
    }
  }
}
</script>