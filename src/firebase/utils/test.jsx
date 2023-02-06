import { getUsers, getUsersByEmail, getLocations, getUsersByLocation, dataCollection } from "./functions"
import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, query, where, orderBy } from "firebase/firestore";

export const Test = () => {
    
    const test = async (func, arg = null) => {
        const dbResponse = await func(arg)
        const users = dbResponse.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log(users)
      }
      
      //test(getUsers)
      //test(getUsersByEmail,"ssosnkrz@gmail.com")
      //test(getUsersByLocation("OB7HQaKL4NEal5LMAJ9U"))

      //dellUser("d1Ik6qEs8sp5ww8zQDzh")

      //test(getLocations)

      addDoc(dataCollection, {location_id:"lrvUqiSTEhshuEGbqCyj",user_id:"2CHjpYwRTiSKjtQDTGsP",week:"01", isApproved: false, monday: 0,dupa:1})

}