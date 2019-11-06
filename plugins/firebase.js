
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'
 
 var config = {
     apiKey: "AIzaSyAsdNLb2uvUt_jm3AfCSN7gaIjd4XOhNn4",
     authDomain: "project-dashboard-dev.firebaseapp.com",
     databaseURL: "https://project-dashboard-dev.firebaseio.com",
     projectId: "project-dashboard-dev",
     storageBucket: "project-dashboard-dev.appspot.com",
     messagingSenderId: "750534778287",
     appId: "1:750534778287:web:6e0c43e3bf43de1cd4e35a",
     measurementId: "G-DRSEWJY6K2"
   };

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const dbDefault = firebase.app().database('https://project-dashboard-dev.firebaseio.com/');
export const google_provider = new firebase.auth.GoogleAuthProvider()
export const facebook_provider = new firebase.auth.FacebookAuthProvider();


