import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCkgvJrSOgH8gO6v9IGrD4aUCjrpZ7V5I8",
    authDomain: "bookstore-9bad9.firebaseapp.com",
    projectId: "bookstore-9bad9",
    storageBucket: "bookstore-9bad9.appspot.com",
    messagingSenderId: "294131766281",
    appId: "1:294131766281:web:ab1e77155de122d1aad4d8"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;