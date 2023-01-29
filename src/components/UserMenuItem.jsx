import styled from "styled-components";
import { useContext } from "react";
import { MenuContent } from "./StateContainer";
const ListItem = styled.li`
  display: flex;
  margin-top: 10px;
  align-items: baseline;
  justify-content: center;
  padding: 5px;
  margin: 0;
  border-radius: 5px;
  width: 100%;
  border: 1px solid;
  margin-bottom: 10px;
  &:hover {
    background: #e4a11b;
    cursor: pointer;
  }
  span {
    width: 80%;
    text-align: center;
  }
`;
export const UserMenuItem = ({ location }) => {
  const context = useContext(MenuContent);

  return (
    <ListItem key={location.id}>
      <span>{location.name}</span>
      <button className="edit bsmall"></button>
    </ListItem>
  );
};
