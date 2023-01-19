import { getUsers, getUsersByEmail } from "./functions"

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

}