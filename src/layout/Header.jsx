import { auth } from "../firebase/firebase";
import styled from "styled-components";
import { MDBIcon } from "mdb-react-ui-kit";

import logo from "../assets/TimeTaker.png";
import { MDBNavbar, MDBContainer, MDBNavbarBrand } from "mdb-react-ui-kit";
import { NameIcon } from '../components/NameIcon';

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
background: lightgray;
border-radius: 30px;
`;
const Wrapper = styled.div`
  width: 100%;
`;

export const Header = ({ user }) => {
  return (
    <MDBContainer fluid className="bg-secondary shadow-1-strong">
      <Wrapper>
      
        <MDBNavbarBrand className="justify-content-center">
          <img src={logo} height="100" alt="" loading="lazy" />
          {/* <NameIcon user={user} /> */}
          {user && (
            <Button
              className="button small text-dark"
              onClick={() => auth.signOut()}
            >
              <MDBIcon fas icon="sign-out-alt" />
              Log Out
            </Button>
          )}
        </MDBNavbarBrand>
      </Wrapper>
    </MDBContainer>
  );
};
