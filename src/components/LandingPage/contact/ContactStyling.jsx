import styled from "styled-components";

export const Container = styled.div`
  padding: 4rem 7rem;
  background: gray;
  text-align: center;
  color: white;
  @media (max-width: 800px) {
    padding: 4rem;
  }
`;

export const Title = styled.h4`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.8rem;
  color: white;
`;

export const MainTitle = styled.h3`
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 5px;
  margin-bottom: 2rem;
  color: white;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Email = styled.input`
  background-color: white;
  position: relative;
  padding: 0.7rem 5rem 0.7rem 1rem;
  font-size: 0.8rem;
  border-radius: 0.2rem;
  color: black;
  border: 2px solid gray;
  ::placeholder {
    color: gray;
  }
  @media (max-width: 800px) {
    align-items: center;
  }
`;

export const Send = styled.button`
  padding: 0.7rem 1rem;
  color: white;
  border: 2px solid red;
  background: red;
  font-size: 0.8rem;
  border-radius: 0.2rem;
  margin-left: 1rem;
  transition: 0.5s;
  :hover {
    background: white;
    color: red;
  }
  @media (max-width: 800px) {
    margin-top: 0.6rem;
    margin-left: 0rem;
    width: 14.5rem;
  }
`;
