import { useContext } from "react"
import { MenuContent } from "./StateContainer"

export const AdminHome = () => {
  const context = useContext(MenuContent)
    return (
    <><h1>Admin Home</h1>
    {context.location && <div>selected location: {context.location.name}</div>}
    </>)
  }