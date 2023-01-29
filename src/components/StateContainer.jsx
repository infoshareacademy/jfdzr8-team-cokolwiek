import { createContext, useState, useEffect, useMemo } from "react"
export const MenuContent = createContext();
import { onSnapshot } from "@firebase/firestore";
import { getUsersByLocation } from "../firebase/utils/functions";
import { addLocationFunction, getLocationsByName, locationsOrderbyName } from "../firebase/utils/functions";
export const StateContainer = ({children}) => {
    const[selectedLocation, setSelectedLocation] = useState(false)
  const [users, setUsers] = useState([])
  const [getUsersTrigger, setGetUsersTrigger] = useState(false)
  const [locations, setLocations] = useState([]);

 
    
    useEffect(() => {
      selectedLocation.id ?
      getUsersByLocation(selectedLocation.id).then(querySnapshot => {
        //alert(location.name)
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("statecontainer selectedLocation",selectedLocation)
        console.log(users)
        setUsers(users)  
      }) : setUsers([])
      
    }, [selectedLocation.id,getUsersTrigger]);
  
    useEffect(() => {
      onSnapshot(locationsOrderbyName, (querySnapshot) => {
        const locations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLocations(locations);
        if (!selectedLocation) setSelectedLocation(locations[0])
      });
    }, []);


    return (
    <MenuContent.Provider 
    value={{location:selectedLocation, setLocation:setSelectedLocation, 
    users:users, locations:locations, setLocations:setLocations,
    setGetUsersTrigger: setGetUsersTrigger } }>
    {children}
    </MenuContent.Provider>
    )
  }