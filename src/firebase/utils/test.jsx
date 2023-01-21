import { getUsers, getUsersByEmail, dellUser, getLocations } from "./functions"

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

      dellUser("d1Ik6qEs8sp5ww8zQDzh")

      test(getLocations)

}