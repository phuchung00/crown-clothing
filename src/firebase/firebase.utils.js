import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBydwnLQnQ6F-EuRf2UUNMnzANeiUEIKbI",
    authDomain: "crown-clothing-b248c.firebaseapp.com",
    databaseURL: "https://crown-clothing-b248c.firebaseio.com",
    projectId: "crown-clothing-b248c",
    storageBucket: "crown-clothing-b248c.appspot.com",
    messagingSenderId: "227157923598",
    appId: "1:227157923598:web:7c7f7bf487c90c787a295f",
    measurementId: "G-R5TFVBJW6Z"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase