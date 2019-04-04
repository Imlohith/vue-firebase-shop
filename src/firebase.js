import firebase from 'firebase'
import 'firebase/firestore'

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDihw-N9aSCUruOu4iKMv-5GNXvZE75gF8",
    authDomain: "vue-deploy-f1726.firebaseapp.com",
    databaseURL: "https://vue-deploy-f1726.firebaseio.com",
    projectId: "vue-deploy-f1726",
    storageBucket: "vue-deploy-f1726.appspot.com",
    messagingSenderId: "833588070100"
  };

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const storage = firebase.storage

// firebase collections
const usersCollection = db.collection('users')
const productsCollection = db.collection('products')
const complaintDB = db.collection('complaintDB')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    storage,
    productsCollection,
    complaintDB
}
