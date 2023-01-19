import { auth } from "../firebase/firebase"

export const Header = ({ user }) => {

 return (
 <>
  <h2>Header</h2>
  {user && (<button className="button" onClick={()=>auth.signOut()}><i className="fab fa-google"></i>Sign out</button>
  )}  
  </>
  )
}
