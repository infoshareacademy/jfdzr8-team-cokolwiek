import { createContext, useState, useEffect, useMemo } from "react"
export const MenuContent = createContext();
import { onSnapshot } from "@firebase/firestore";
import { usersInLocationOrderbyLastName } from "../firebase/utils/functions";
import { addLocationFunction, getLocationsByName, locationsOrderbyName } from "../firebase/utils/functions";
export const StateContainer = ({children}) => {
    const[location, setLocation] = useState(false)
  const [users, setUsers] = useState([])
  const [locations, setLocations] = useState([]);
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
  
    useEffect(() => {
      onSnapshot(locationsOrderbyName, (querySnapshot) => {
        const locations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locations);
      });
    }, []);

    const value = useMemo(() => {
        return {location:location, setLocation:setLocation, users:users } 
    },[location.id])

    return (
    <MenuContent.Provider 
    value={{location:location, setLocation:setLocation, users:users, locations:locations, setLocations:setLocations } }>
    {children}
    </MenuContent.Provider>
    )
  }