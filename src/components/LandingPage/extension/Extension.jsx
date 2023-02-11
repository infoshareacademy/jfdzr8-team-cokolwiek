import {
  Container,
  Paragraph,
  Title,
  Cards,
  Card,
  TitleCard,
  Imagem,
} from "./ExtensionStyling";
import chrome from "../../../assets/images/reduce.png";
import firefox from "../../../assets/images/efficacy.png";
import opera from "../../../assets/images/online.png";

export default function Extension() {
  return (
    <Container>
      <Title>{"Why switch to online work-time records?"}</Title>
      <Paragraph>
        {
          "Electronic work-time recording is often considered better than traditional, manual methods for a number of reasons:"
        }
      </Paragraph>
      <Cards>
        <Card>
          <Imagem src={chrome} alt="chrome logo" />
          <TitleCard>{"Increased accuracy"}</TitleCard>
          <Paragraph>
            {
              "Electronic work recording systems eliminate the possibility of manual errors and provide a more accurate record of work completed."
            }
          </Paragraph>
        </Card>
        <Card id="card2">
          <Imagem src={firefox} alt="firefox logo" />
          <TitleCard>{"Increased efficiency"}</TitleCard>
          <Paragraph>
            {
              "With electronic work recording, data can be entered and accessed much faster than with manual methods, leading to increased efficiency and productivity."
            }
          </Paragraph>
        </Card>
        <Card id="card3">
          <Imagem src={opera} alt="opera logo" />
          <TitleCard>{"Enhanced reporting"}</TitleCard>
          <Paragraph>
            {
              "Electronic work recording systems provide robust reporting capabilities, allowing for more detailed and accurate analysis of work processes and data."
            }
          </Paragraph>
        </Card>
      </Cards>
    </Container>
  );
}
