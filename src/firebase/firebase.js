import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { firebaseConfig } from './firebase.config'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()


  