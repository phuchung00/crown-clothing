import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyC_C-IpI0B-2G4gXcboaBGxN6m--vqXMuw",
    authDomain: "crwn-clothing-75389.firebaseapp.com",
    databaseURL: "https://crwn-clothing-75389.firebaseio.com",
    projectId: "crwn-clothing-75389",
    storageBucket: "crwn-clothing-75389.appspot.com",
    messagingSenderId: "992310532798",
    appId: "1:992310532798:web:32320a18d7684d91eb1cef",
    measurementId: "G-B9PQB7DN0J"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()
    
    if(!snapShot.exists){
        const { displayName, email } =  userAuth
        const createdAt = new Date()
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ... additionalData
            })
        }catch(error){
            console.log('error creating user', error.message)
        }
    }
    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase