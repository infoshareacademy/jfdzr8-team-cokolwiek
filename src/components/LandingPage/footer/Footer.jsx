import { Container, Logo, Path, Set, Set2, Network } from "./FooterStyling";
import logo from "../../../assets/images/TimeTaker.png";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Container>
      <Set>
        <Link to="/">
          <Logo src={logo} alt="logo" />
        </Link>
      </Set>
      <Set2>
        <p>TimeTaker S.A.</p>
        <p>Plac Europejski 1</p>
        <p>02-120 Warsaw</p>
      </Set2>

      <Set2>
        <Link to="/features">
          <Path>{"Features"}</Path>
        </Link>

        <Link to="/extension">
          <Path>{"Pricing"}</Path>
        </Link>

        <Link to="/contact">
          <Path>{"Contact"}</Path>
        </Link>
      </Set2>
    </Container>
  );
}
