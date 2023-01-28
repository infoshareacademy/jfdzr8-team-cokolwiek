import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { onSnapshot } from "@firebase/firestore";
import { MDBIcon } from "mdb-react-ui-kit";
import styled from "styled-components";
import { AdminMenuItem } from "./AdminMenuItem";
import { addLocationFunction, getLocationsByName, locationsOrderbyName } from "../firebase/utils/functions";
import { MenuContent } from "./StateContainer";

import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
  } from "mdb-react-ui-kit";

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
  const context = useContext(MenuContent);
  const [isEditView, setEditView] = useState(false);
  const [addModalState, setAddModalState] = useState(false);
  const addLocationInput = useRef()

  const addModalToggle = () => {
    setAddModalState(!addModalState)
    addLocationInput.current.value = ""
  }
  const locations=context.locations

 

  const addLocation = () => {
    const currentValue = addLocationInput.current.value
    if (currentValue != "") {
      getLocationsByName(currentValue).then(querySnapshot => {
        const isUnique = querySnapshot.empty ? true : false
        if (isUnique) {
          addLocationFunction(currentValue)
          addModalToggle()
        } else {
          addLocationInput.current.value = ""
          addLocationInput.current.placeholder = "Enter unique name"
          addLocationInput.current.focus()
        }
      })
    } else {
      addLocationInput.current.placeholder = "Enter unique name"
      addLocationInput.current.focus()
  }
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
      {isEditView ? (<>
        <button className="edit bbig" onClick={addModalToggle} >
          Add Location
          <MDBIcon icon="plus" className="ms-3" />
        </button>
        <MDBModal tabIndex="-1" show={addModalState} setShow={setAddModalState}>
          <MDBModalDialog centered>
            <MDBModalContent className="bg-warning bg-gradient">
              <MDBModalHeader>
                <MDBModalTitle>Dodaj lokalizację</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="orange"
                  onClick={addModalToggle}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  ref={addLocationInput}
                  type="text"
                  className="bg-light bg-gradient"
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={addModalToggle}>
                  Anuluj
                </MDBBtn>
                <MDBBtn color="success" onClick={addLocation}>Zapisz</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
    </>
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
