import {
  Container,
  Send,
  Email,
  Form,
  MainTitle,
  Title,
} from "./ContactStyling";
import icon from "../../../assets/images/mail.png";

export default function Contact() {
  return (
    <Container>
      <MainTitle>{"35,000+ ALREADY JOINED"}</MainTitle>
      <Title>{"Stay up-to-date with what we're doing 📨"}</Title>

      <Form action="/sucessoEmail">
        <Email
          type="text"
          required
          placeholder={"e-mail"}
          id="email"
          className="input"
        />
        <Send type="submit">{"Stay in touch"}</Send>
      </Form>
    </Container>
  );
}
