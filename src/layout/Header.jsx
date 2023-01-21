import { auth } from "../firebase/firebase";
import styled from "styled-components";

import logo from "../assets/TimeTaker.png";
import { MDBNavbar, MDBContainer, MDBNavbarBrand } from "mdb-react-ui-kit";

const Button = styled.button`
position: absolute;
right: 0;
margin-right: 20px;
background: white;
height: 50px;
padding 10px;
i {
  padding-right:10px;
}
padding-left: 20px;
padding-right: 20px;
`
const Wrapper = styled.div`
width: 100%;
`

export const Header = ({ user }) => {
  return (
      <MDBContainer fluid className="bg-dark">
        <Wrapper>
        <MDBNavbarBrand 
          className="justify-content-center"
        >
          <img src={logo} height="100" alt="" loading="lazy" />
          {user && (
          <Button className="button small" onClick={() => auth.signOut()}>
            <i className="fab fa-google"></i>Sign out
          </Button>
        )}
        </MDBNavbarBrand>
        
        </Wrapper>
      </MDBContainer>
      
  );
};
