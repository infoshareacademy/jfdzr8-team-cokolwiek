import styled from "styled-components";

export const Container = styled.section`
  padding: 8rem 10rem 8rem;
  min-height: 10vh;
  #card2 {
    margin-top: 4rem;
  }
  #card3 {
    margin-top: 8rem;
  }
  @media (max-width: 900px) {
    text-align: center;
    margin: 2rem;
    padding: 0;
  }
`;

export const Imagem = styled.img`
  margin-bottom: 1.5rem;
  max-width: 100px;
`;

export const Line = styled.hr`
  margin: 2rem 0 1.5rem;
  border-bottom: 5px dotted gray;
`;

export const TitleCard = styled.h3`
  color: black;
  margin-bottom: 0.5rem;
`;

export const Card = styled.div`
  margin: 20px;
  text-align: center;
  box-shadow: 0 0 0.6rem 0 black;
  padding: 2rem 1rem 2rem;
  border-radius: 0.8rem;
`;

export const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 800px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: black;
  margin-bottom: 0.7rem;
`;

export const Paragraph = styled.p`
  text-align: center;
  font-size: 1rem;
  line-height: 1.3;
  @media (max-width: 800px) {
    margin: 3rem;
  }
`;

export const Links = styled.a`
  color: white;
  background: gray;
  border: 2px solid gray;
  padding: 0.7rem 1.5rem;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  :hover {
    color: gray;
  }
`;
