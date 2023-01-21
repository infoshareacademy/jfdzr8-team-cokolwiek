import { auth } from "../firebase/firebase"

import styled from "styled-components";

const Logo = styled.div`
margin-left:20px;
`
const ButtonDarkMode = styled.button`

`
export const Header = ({ user }) => {

 return (
 <>
  <Logo>Logo</Logo>
     <h2>Time Taker</h2>
     <ButtonDarkMode>Dark Mode</ButtonDarkMode>
  {user && (<button className="button" onClick={()=>auth.signOut()}><i className="fab fa-google"></i>Sign out</button>
  )}  
  </>
  )
}
