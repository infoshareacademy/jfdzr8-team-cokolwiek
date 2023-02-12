import styled from "styled-components";

export const Container = styled.footer`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: black;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Set = styled.div`
  display: flex;
  flex-direction: row;
  color: white;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const Set2 = styled.div`
  flex-direction: row;
  color: white;
  @media (max-width: 800px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Network = styled.a``;

export const Logo = styled.img`
  padding: 0.7rem;
  margin-right: 3rem;
  max-width: 150px;
`;

export const Path = styled.p`
  margin: 1rem;
  color: white;
  :hover {
    color: red;
  }
`;

export const Devs = styled.p`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  :hover {
    color: lightgreen;
  }
`;

export const Imagem = styled.img`
  margin-bottom: 1.5rem;
  max-width: 15px;
  margin-left: 5px;
`;
