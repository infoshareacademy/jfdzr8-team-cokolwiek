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
  return getDocs(query(usersCollection,  where("isAdmin", "==", false)))
}

export const getUsersByLocation =  (id) => {
  return getDocs(query(usersCollection,  where("location_id", "==", id)))
}

export const getUsersWithoutLocation =  (id) => {
  return getDocs(query(usersCollection,  where("location_id", "==", "")))
}

export const getUsersByEmail = (email) => {
  return email ? getDocs(query(usersCollection, where("e-mail", "==", email))) : null
}

export const addUser = (user) => {
  addDoc(usersCollection, user)
}

export const dellUser = (id) => {
  deleteDoc(doc(db, "Users", id))
}

export const getLocations =  () => {
  return getDocs(locationsCollection)
}

export const addLocation = (location) => {
  addDoc(locationsCollection, location)
}

export const dellLocation = (id) => {
  deleteDoc(doc(db, "Locations", id))
}