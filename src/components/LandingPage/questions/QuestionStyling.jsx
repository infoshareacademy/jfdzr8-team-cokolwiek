import styled from "styled-components";

export const Container = styled.div`
  font-weight: bold;

  background-color: #eef4f4;
  padding: 8rem 23rem;
  text-align: center;
  a {
    display: inline-block;
    margin-top: 2rem;
  }
  @media (max-width: 800px) {
    text-align: center;
    margin: 2rem;
    padding: 0;
  }
`;

export const QuestionCard = styled.ul`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const List = styled.li`
  width: 100%;
  list-style: none;
  padding: 1rem 0;
  border-bottom: 1px solid gray;
  font-weight: bold;
  :nth-child(1) {
    border-top: 1px solid gray;
  }
`;

export const Question = styled.summary`
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Response = styled.details`
  font-weight: bold;

  padding: 1.5rem 0 0.5rem;
  text-align: left;
  line-height: 1.6;
  color: #808080;
  font-weight: 400;
`;
