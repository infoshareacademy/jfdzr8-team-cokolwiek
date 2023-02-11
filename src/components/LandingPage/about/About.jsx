import {
  Links,
  Container,
  Chrome,
  Btn,
  ColumnImage,
  Paragraph,
  Title,
  Line,
  Text,
} from "./AboutStyling";

import imaged from "../../../assets/images/MBAirmockup.png";

export default function About() {
  return (
    <div>
      <Container>
        <Line>
          <Text>
            <Title>{"Simple Time Management App"}</Title>
            <Paragraph>
              {
                "Looking to maximize your productivity and stay on top of your busy schedule? Look no further than a time management application! With features like a comprehensive calendar system, multiple locations management, time tracking, and employee database, you'll have everything you need to take control of your time and reach your goals. Monitor your time with the time tracking feature, so you can make informed decisions about how you allocate your time. With a time management application, you'll be able to stay organized, productive, and focused on what's important - all in one convenient place. Try one today and see the difference for yourself!"
              }
            </Paragraph>
            <Links></Links>
          </Text>
          <ColumnImage>
            <img src={imaged} alt="bookmark" width="700px" />
          </ColumnImage>
        </Line>
      </Container>
    </div>
  );
}
