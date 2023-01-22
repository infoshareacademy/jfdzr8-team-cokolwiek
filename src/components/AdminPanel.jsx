import { useContext } from "react"
import { BoxEmployeesList } from './kontenertestowy/BoxEmployeesList'
import { ButtonAddEmployee } from './kontenertestowy/ButtonAddEmployee'
import { ButtonFinish } from './kontenertestowy/ButtonFinish'
import { ButtonSave } from './kontenertestowy/ButtonSave'
import { MenuContent } from "./StateContainer"


export const AdminPanel = () => {
  const context = useContext(MenuContent)
  return (<>
    <h1>Admin Panel</h1>
    <ButtonAddEmployee/>
    <ButtonSave />
    <BoxEmployeesList/>
    <ButtonFinish/>
    {context.location && <div>selected location: {context.location.name}</div>}
    </>
    )
  }