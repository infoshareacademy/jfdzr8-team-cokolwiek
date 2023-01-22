import { createContext, useState } from "react"
export const MenuContent = createContext();

export const StateContainer = ({children}) => {
    const[location, setLocation] = useState(false)
    return (
    <MenuContent.Provider 
    value={{location:location, setLocation:setLocation } }>
    {children}
    </MenuContent.Provider>
    )
  }