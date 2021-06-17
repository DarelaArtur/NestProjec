
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'
 
 var config = {
     apiKey: "",
     authDomain: "",
     databaseURL: "",
     projectId: "",
     storageBucket: "",
     messagingSenderId: "",
     appId: "",
     measurementId: ""
   };

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const dbDefault = firebase.app().database('https://nest-project-dev.firebaseio.com/');
export const google_provider = new firebase.auth.GoogleAuthProvider()
export const facebook_provider = new firebase.auth.FacebookAuthProvider();


