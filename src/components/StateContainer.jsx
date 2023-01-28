import { createContext, useState, useEffect, useMemo } from "react"
export const MenuContent = createContext();
import { onSnapshot } from "@firebase/firestore";
import { usersInLocationOrderbyLastName } from "../firebase/utils/functions";

export const StateContainer = ({children}) => {
    const[location, setLocation] = useState(false)
    const [users, setUsers] = useState([])
    //console.log("statecontainer",location)
    useEffect(() => {
      location.id ?
      onSnapshot(usersInLocationOrderbyLastName(location.id), (querySnapshot) => {
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(users);
      }) : setUsers([])
      
    }, [location.id]);

    const value = useMemo(() => {
        return {location:location, setLocation:setLocation, users:users } 
    },[location.id])

    return (
    <MenuContent.Provider 
    value={{location:location, setLocation:setLocation, users:users } }>
    {children}
    </MenuContent.Provider>
    )
  }