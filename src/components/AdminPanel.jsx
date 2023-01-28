
import { useContext } from "react"
import { AdminPanelItem } from "./AdminPanelItem"
import { MenuContent } from "./StateContainer"


export const AdminPanel = () => {
  const context = useContext(MenuContent)

    return (<>
    <h1>Admin Panel</h1>
    {context.location &&
    <>
    <div>selected location: {context.location.name}</div>
    {
      context.users.map(user => <AdminPanelItem key={user.id} user={user}/>)}
    </>
    }
    </>
    )
  }