import { auth, db, provider } from "../firebase"
import { signInWithPopup, signOut } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc, query, where } from "firebase/firestore";

const usersCollection = collection(db, "Users");
const locationsCollection = collection(db, "Locations");

provider.setCustomParameters(
  {prompt: 'select_account'}
)

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider)
  return result
}

export const getUsers =  () => {
  return getDocs(usersCollection)
}

export const getUsersByEmail = (email) => {
  return email ? getDocs(query(usersCollection, where("e-mail", "==", email))) : null
}
