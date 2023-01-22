import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onSnapshot } from "@firebase/firestore";
import { MDBIcon } from "mdb-react-ui-kit";
import styled from "styled-components";
import { AdminMenuItem } from "./AdminMenuItem";
import { addLocation } from "../firebase/utils/functions";
import { locationsCollection } from "../firebase/utils/functions";

const Wrapper = styled.div`
.edit {
    display: ${({ isEditView }) => (!isEditView ? "none" : "initial")}};
}
.bbig {
    color:#fbfbfb;
    width: 200px;
    height: 35px;
    padding: 5px;
    margin-top: 10px;
}
.bsmall {
    height: 25px;
    width: 50px;
    color:#fbfbfb;
    margin-left: 5px;
    padding: 2px;
    font-size: 0.8em;
}
h2 {
    color:#fbfbfb;
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
padding-top: 20px;


`;

const LinkBox = styled(Link)`
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px black;
  display: flex;
  justify-content: center;
  min-width: 200px;
  height: 35px;
  padding: 5px;
  color: #1a1a1a;
  background-color: #fbfbfb;
  margin-bottom: 10px;
  &:hover {
  }
`;

const List = styled.ul`
  list-style-type: none;
  height: 66vh;
  min-height: 65vh;
  overflow-y: auto;
  padding-right: 15px;
  width: 100%;
  margin-top: 10px;
  border-top: 1px solid;
  padding: 10px;
  box-shadow: 0px 0px 2px 0px black;
  .selected {
    background: #e4a11b;
  }
`;

export const AdminMenu = () => {
  const [locations, setLocations] = useState([]);
  const [isEditView, setEditView] = useState(false);

  useEffect(() => {
    onSnapshot(locationsCollection, (querySnapshot) => {
      const locations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(locations);
    });
  }, []);

  const addLocationModal = () => {
    {
      addLocation({ name: "test" });
    }
    alert("add new");
  };

  return (
    <Wrapper isEditView={isEditView}>
      <h2>Admin Menu</h2>

      {isEditView ? (
        <LinkBox to="/" onClick={() => setEditView(false)}>
          Disable Edit Mode
          <MDBIcon far icon="times-circle" className="ms-3 align-self-center" />
        </LinkBox>
      ) : (
        <LinkBox to="/AdminPanel" onClick={() => setEditView(true)}>
          Enable Edit Mode
          <MDBIcon far icon="edit ms-3 align-self-center" />
        </LinkBox>
      )}
      {isEditView ? (
        <button className="edit bbig" onClick={addLocationModal}>
          Add Location
          <MDBIcon icon="plus" className="ms-3" />
        </button>
      ) : (
        <h4>Select Location</h4>
      )}
      <List>
        {locations.map((location) => {
          return <AdminMenuItem location={location} key={location.id} />;
        })}
      </List>
    </Wrapper>
  );
};
