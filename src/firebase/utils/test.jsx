import { getUsers, getUsersByEmail, getLocations, getUsersByLocation } from "./functions"

export const Test = () => {
    
    const test = async (func, arg = null) => {
        const dbResponse = await func(arg)
        const users = dbResponse.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log(users)
      }
      
      test(getUsers)
      test(getUsersByEmail,"ssosnkrz@gmail.com")
      test(getUsersByLocation("OB7HQaKL4NEal5LMAJ9U"))

      //dellUser("d1Ik6qEs8sp5ww8zQDzh")

      test(getLocations)

}