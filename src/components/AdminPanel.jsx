import { useContext, useState, useEffect } from "react"
import { usersInLocationOrderbyLastName } from "../firebase/utils/functions";
import { MenuContent } from "./StateContainer"
import { onSnapshot } from "@firebase/firestore";

export const AdminPanel = () => {
  const context = useContext(MenuContent)
  const [users, setUsers] = useState([])

  useEffect(() => {
    context.location.id ?
    onSnapshot(usersInLocationOrderbyLastName(context.location.id), (querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(users);
    }) : setUsers([])
  }, [context.location.id]);

    return (<>
    <h1>Admin Panel</h1>
    {context.location && 
    <>
    <div>selected location: {context.location.name}</div>
    {console.log(users)}
    </>
    }
    </>
    )
  }