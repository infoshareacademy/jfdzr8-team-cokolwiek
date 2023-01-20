import { NavLink } from 'react-router-dom'
import styled from "styled-components";

const Logo = styled.div`
margin-left:20px;
`
const ButtonDarkMode = styled.button`

`
export const Header = ({ isAuth }) => {

 return (
   <>
     <Logo>Logo</Logo>
     <h2>Header</h2>
     <ButtonDarkMode>Dark Mode</ButtonDarkMode>
  {isAuth && (<NavLink to="/???">Logout</NavLink>
  )}  
  </>
  )
}
