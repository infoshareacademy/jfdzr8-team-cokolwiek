import { NavLink } from 'react-router-dom'

export const Header = ({ isAuth }) => {

 return (
 <>
  <h2>Header</h2>
  {isAuth && (<NavLink to="/???">Logout</NavLink>
  )}  
  </>
  )
}
