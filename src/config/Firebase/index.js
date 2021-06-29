import Firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCMD8KtRKuFb1uHQVDo7mrazicFJB4x2I8",
    authDomain: "best-be152.firebaseapp.com",
    projectId: "best-be152",
    storageBucket: "best-be152.appspot.com",
    messagingSenderId: "1013007067210",
    appId: "1:1013007067210:web:71a1bf339a68b62806deb3",
    measurementId: "G-P3EPPST8YP"
  };

const FIREBASE = Firebase.initializeApp(firebaseConfig)

export default FIREBASE;