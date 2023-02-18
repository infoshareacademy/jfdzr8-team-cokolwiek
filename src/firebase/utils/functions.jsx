import { auth, db, provider } from "../firebase"
import { signInWithPopup, signOut } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, query, where, orderBy } from "firebase/firestore";


export const dataCollection = collection(db, "Data");
export const usersCollection = collection(db, "Users");
export const locationsCollection = collection(db, "Locations");

export const locationsOrderbyName = query(locationsCollection, orderBy('name'));

export const usersInLocationOrderbyLastName= (id) => query(usersCollection, where("location_id", "==", id), where("isAdmin", "==", false)/*, orderBy('lastName')*/);

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

export const getDataByLocation =  (id=0, week=0) => {
  return getDocs(query(dataCollection,  where("location_id", "==", id),where("week", "==", week)))
}

export const getAllLocationData =  (id=0) => {
  return getDocs(query(dataCollection,  where("location_id", "==", id)))
}

export const getDataByUser =  (id=0) => {
  return getDocs(query(dataCollection,  where("user_id", "==", id)))
}

export const getUsersByLocation =  (id) => {
  return getDocs(query(usersCollection,  where("location_id", "==", id), where("isAdmin", "==", false)//, orderBy('lastName')
  ))
}

export const getUsersWithoutLocation =  (id) => {
  return getDocs(query(usersCollection,  where("location_id", "==", "")))
}

export const getUsersByEmail = (email) => {
  const p = getDocs(query(usersCollection, where("e-mail", "==", email)))
  return p
}

export const checkEmail = (newEmail, user_id) => {
  const p = getDocs(query(usersCollection, where("e-mail", "==", newEmail), where("id", "!=", user_id)))
  return p
}

export const addUser = (user) => {
  addDoc(usersCollection, user)
}

export const dellUserFunction = (id) => {
  deleteDoc(doc(db, "Users", id))
}

export const getLocations =  () => {
  return getDocs(locationsCollection)
}

export const addLocationFunction = (name) => {
  addDoc(locationsCollection, {name: name})
}

export const getLocationsByName = async (name) => {
  const p = await getDocs(query(locationsCollection, where("name", "==", name)))
  return p
}

export const dellLocationFunction = (id) => {
  deleteDoc(doc(db, "Locations", id))
  getDocs(query(usersCollection, where("location_id", "==", id))).then(querySnapshot => {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    data.map(d=>{
      deleteDoc(doc(db, "Users", d.id))
    })
  })
}

export const editLocationFunction =  (id, newName) =>  {
  getDocs(query(locationsCollection, where("name","==",newName))).then(querySnapshot => {
    if (querySnapshot.empty) updateDoc(doc(db, "Locations", id), {
      name: newName,
    });
  })
}




    
