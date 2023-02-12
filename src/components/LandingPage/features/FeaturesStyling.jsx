import styled from "styled-components";

export const Container = styled.div`
  background-color: #eef4f4;
  padding: 8rem 10rem 8rem;
  min-height: 10vh;
  position: relative;
  #reading,
  #Paragraph {
    text-align: left;
  }
  @media (max-width: 800px) {
    text-align: center;
    padding: 1rem 3rem 6rem;
  }
`;
export const Text = styled.div`
  margin: 2rem;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 2rem;
  padding: 0;
  @media (max-width: 800px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    padding: 1rem 2rem;
    border-bottom: 1px solid gray;
    position: relative;
    cursor: pointer;
    color: black;
    transition: 0.5s;
    :hover {
      color: red;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Ilustration = styled.div`
  position: relative;
  ::after {
    content: "";
    position: absolute;
    left: -10rem;
    bottom: -4rem;
    width: 120%;
    height: 95%;
    background: gray;
    z-index: -1;
    border-top-right-radius: 30% 50%;
    border-bottom-right-radius: 30% 50%;
  }
  img {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 25rem;
    @media (max-width: 800px) {
      width: 20rem;
    }
  }
`;

export const MainTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: black;
  margin-bottom: 0.7rem;
  @media (max-width: 800px) {
    margin-top: 7rem;
    text-align: center;
  }
`;

export const Title = styled.h2`
  text-align: left;
  font-size: 1.8rem;
  color: black;
  margin-bottom: 0.7rem;
  @media (max-width: 800px) {
    margin-top: 7rem;
    width: 20rem;
    text-align: center;
  }
`;
export const MainParagraph = styled.p`
  margin-top: 1.5rem;
  padding-bottom: 1.6rem;
  text-align: center;
  font-size: 1rem;
  line-height: 1.3;
  color: #515353;
  margin-bottom: 1rem;
`;

export const Paragraph = styled.p`
  margin-top: 1.5rem;
  padding-bottom: 1.6rem;
  text-align: left;
  font-size: 1rem;
  line-height: 1.3;
  color: #515353;
  margin-bottom: 1rem;
`;

export const Information = styled.a`
  padding: 0.6rem 1.2rem;
  color: white;
  background: gray;
  border: 2px solid gray;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  :hover {
    color: gray;
  }
`;
