import { auth } from "../firebase/firebase";

import logo from "../assets/TimeTaker.png";
import { MDBNavbar, MDBContainer, MDBNavbarBrand } from "mdb-react-ui-kit";

export const Header = ({ user }) => {
  return (
    <MDBNavbar
      light
      bgColor="light"
      className="bg-dark text-center text-white fixed-top"
    >
      <MDBContainer fluid>
        <MDBNavbarBrand
          href="#"
          className="justify-content-center navbar-collapse "
        >
          <img src={logo} height="100" alt="" loading="lazy" />
        </MDBNavbarBrand>
        {user && (
          <button className="button" onClick={() => auth.signOut()}>
            <i className="fab fa-google"></i>Sign out
          </button>
        )}
      </MDBContainer>
    </MDBNavbar>
  );
};
