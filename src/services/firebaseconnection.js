import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyA5wqhvyH9xt7fl_XnXJ5oEESeOcAvS9vE",
    authDomain: "hortech-1c540.firebaseapp.com",
    projectId: "hortech-1c540",
    storageBucket: "hortech-1c540.appspot.com",
    messagingSenderId: "619678785571",
    appId: "1:619678785571:web:76388b82c5f225ffbed196",
    measurementId: "G-42JQKC2K2P"
  };
  
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;