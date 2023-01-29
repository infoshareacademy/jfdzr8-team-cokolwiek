import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onSnapshot } from "@firebase/firestore";
import styled from "styled-components";
import { locationsCollection } from "../firebase/utils/functions";
import { DatePickerComponent } from "./DatePicker";
import { UserMenuItem } from "./UserMenuItem";
const Wrapper = styled.div`
  .edit {
    display: ${({ isEditView }) => (!isEditView ? "none" : "initial")};
  }
  h2 {
    color: #fbfbfb;
  }
  h4 {
    height: 25px;
    margin-top: 10px;
  }
  box-shadow: 0px 0px 5px 0px black;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 220px;
  padding-top: 50px;
`;
const List = styled.ul`
  list-style-type: none;
  height: 1vh;
  min-height: 29vh;
  overflow-y: auto;
  padding-right: 15px;
  width: 100%;
  margin-top: 50px;
  border-top: 1px solid;
  padding: 10px;
  box-shadow: 0px 0px 2px 0px black;
`;
export const UserMenu = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    onSnapshot(locationsCollection, (querySnapshot) => {
      const locations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(locations);
    });
  }, []);
  return (
    <Wrapper>
      <h2>User Menu</h2>
      <List>
        {locations.map((location) => {
          return <UserMenuItem location={location} key={location.id} />;
        })}
      </List>
      <DatePickerComponent />
    </Wrapper>
  );
};
