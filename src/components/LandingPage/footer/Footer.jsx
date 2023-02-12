import {
  Container,
  Logo,
  Path,
  Set,
  Set2,
  Network,
  Devs,
  Imagem,
} from "./FooterStyling";
import logo from "../../../assets/images/TimeTaker.png";
import icon from "../../../assets/images/foreign.png";

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
        <p>⚙️ Developers:</p>
        <a href="https://github.com/aleksanderkulej" target="_blank">
          <Devs>
            <p>Aleksander Kulej</p>
            <Imagem src={icon} alt="external website"></Imagem>
          </Devs>
        </a>
        <a href="https://github.com/ryba1235" target="_blank">
          <Devs>
            <p>Krzysztof Sosnowski</p>
            <Imagem src={icon} alt="firefox logo"></Imagem>
          </Devs>
        </a>
        <a href="https://github.com/WiktorSobczak" target="_blank">
          <Devs>
            <p>Wiktor Sobczak</p>
            <Imagem src={icon} alt="firefox logo"></Imagem>
          </Devs>
        </a>
      </Set2>
    </Container>
  );
}
