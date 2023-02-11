import {
  Container,
  Logo,
  Path,
  LoginButton,
  Set,
  Items,
  MobileNav,
} from "./HeaderStyling";

import Hamburger from "../../../assets/images/icon-hamburger.svg";
import Close from "../../../assets/images/icon-close.svg";

import logo from "../../../assets/images/TimeTakerlogo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { signInWithGoogle } from "../../../firebase/utils/functions";

export default function Header() {
  const [navToggle, setNavToggle] = useState(false);
  const switcher = () => {
    setNavToggle(!navToggle);
  };

  useEffect(() => {
    if (navToggle === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });
  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt="logo" />
      </Link>
      <MobileNav navToggle={navToggle}>
        <button onClick={switcher}>
          {navToggle ? (
            <i>
              <img src={Close} alt="Close" />
            </i>
          ) : (
            <i>
              <img src={Hamburger} alt="Open" />
            </i>
          )}
        </button>
      </MobileNav>
      <Set navToggle={navToggle}>
        <Items>
          <Link to="/features">
            <Path>{"Features"}</Path>
          </Link>

          <Link to="/extension">
            <Path>{"Pricing"}</Path>
          </Link>

          <Link to="/contact">
            <Path>{"Contact"}</Path>
          </Link>

          <LoginButton>
            <Link to="/login">
              <Path>
                <button onClick={signInWithGoogle}>Login</button>
              </Path>
            </Link>
          </LoginButton>
        </Items>
      </Set>
    </Container>
  );
}
