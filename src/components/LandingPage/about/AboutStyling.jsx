import styled from "styled-components";

export const Container = styled.div`
  padding: 8rem 6rem;

  img {
    @media (max-width: 800px) {
      width: 22.4rem;
      z-index: -1;
    }
  }
  @media (max-width: 800px) {
    padding: 1rem;
  }
`;

export const Line = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

export const Text = styled.div`
  max-width: 28rem;

  padding-right: 100px;
  width: 50%;
  @media (max-width: 800px) {
    text-align: center;
    margin-top: 4rem;
  }
`;

export const ColumnImage = styled.div`
  width: 50%;
  display: flex;
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-right: 1rem;
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
    @media (max-width: 800px) {
      margin: 1.4rem;
    }
  }
`;

export const Btn = styled.a`
  min-width: 175px;
  background: white;
  color: black;
  box-shadow: 0 0 0.5rem gray;
  :hover {
    border: 2px solid black;
  }
`;

export const Chrome = styled.a`
  color: white;
  background: gray;
  border: 2px solid gray;
  :hover {
    color: gray;
  }
`;

export const Paragraph = styled.p`
  line-height: 1.5;
  margin-bottom: 2rem;
`;
export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;
