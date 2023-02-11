import {
  Container,
  Paragraph,
  Title,
  Ilustration,
  Card,
  MainTitle,
  MainParagraph,
  Menu,
  Text,
} from "./FeaturesStyling";
import Ilustration1 from "../../../assets/images/illustration-features-tab-1.svg";
import Ilustration2 from "../../../assets/images/illustration-features-tab-2.svg";
import Ilustration3 from "../../../assets/images/illustration-features-tab-3.svg";
import { useState } from "react";

export default function Features() {
  const [option, setoption] = useState("");

  return (
    <Container>
      <MainTitle>{"Features"}</MainTitle>
      <MainParagraph>
        {
          "With features like a comprehensive calendar system, multiple locations management, time tracking, and employee database, you'll have everything you need to take control of your time and reach your goals. Monitor your time with the time tracking feature, so you can make informed decisions about how you allocate your time."
        }
      </MainParagraph>

      <Menu>
        <p onClick={() => setoption("1")}>{"Summarize View"}</p>
        <p onClick={() => setoption("2")}>{"Advanced Admin View"}</p>
        <p onClick={() => setoption("3")}>{"Simple UI"}</p>
      </Menu>

      <div>
        {option === "1" ? (
          <Card>
            <Ilustration>
              <img src={Ilustration1} alt="features" />
            </Ilustration>
            <Text>
              <Title>{"Get summarize view of all your employees"}</Title>
              <Paragraph>
                {
                  "Get a bird's eye view of all your employees with our innovative time management solution! With our system, you'll be able to easily keep track of your employees' work progress, productivity, and schedules, all in one centralized location."
                }
              </Paragraph>
            </Text>
          </Card>
        ) : option === "2" ? (
          <Card>
            <Ilustration>
              <img src={Ilustration2} alt="features" />
            </Ilustration>
            <Text>
              <Title>{"All of necessary tools in your screen"}</Title>
              <Paragraph>
                {
                  "Streamline your work with all the necessary tools at your fingertips! Our time management solution puts everything you need to stay organized and productive right at your fingertips. Say goodbye to cluttered desktops and multiple systems - with our solution, you'll have all the tools you need in one convenient location."
                }
              </Paragraph>
            </Text>
          </Card>
        ) : (
          <Card>
            <Ilustration>
              <img src={Ilustration3} alt="features" />
            </Ilustration>
            <Text>
              <Title>{"Simple and easy to use management view"}</Title>
              <Paragraph>
                {
                  "Simplify your work with a simple and easy-to-use management view! Our time management solution provides a user-friendly interface that makes it easy to stay organized and on top of your schedule."
                }
              </Paragraph>
            </Text>
          </Card>
        )}
      </div>
    </Container>
  );
}
