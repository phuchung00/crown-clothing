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