import Extension from "./extension/Extension.jsx";
import About from "./about/About.jsx";
import Contact from "./contact/Contact.jsx";
import Features from "./features/Features.jsx";

import Questions from "./questions/Questions.jsx";
import { Container } from "./LandingPageStyling";
import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";

export default function LandingPage() {
  return (
    <Container>
      <Header />
      <About />
      <Features />
      <Extension />
      <Questions />
      <Contact />
      <Footer />
    </Container>
  );
}
