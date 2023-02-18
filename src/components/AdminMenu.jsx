import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { onSnapshot } from "@firebase/firestore";
import { MDBIcon } from "mdb-react-ui-kit";
import styled from "styled-components";
import { AdminMenuItem } from "./AdminMenuItem";
import {
  addLocationFunction,
  getLocationsByName,
  locationsOrderbyName,
} from "../firebase/utils/functions";
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

.bbig {
    color:#fbfbfb;
    width: 200px;
    height: 35px;
    padding: 5px;
    margin-top: 10px;
}
.bsmall {
    color:#fbfbfb;
    margin-left: 10px;
    padding: 2px;
    font-size:0.8em;
}
h2 {
    color:#fbfbfb;
}
h4 {
    margin-top: 44px;
    margin-bottom: -10px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 24px;
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
  display: flex;
  justify-content: center;
  width: 200px;
  height: 55px;
  padding: 15px;
  color: #1a1a1a;
  background-color: #fbfbfb;
  margin-bottom: 10px;
  margin-top: 10px;
  &:hover {
    color: #1a1a1a;
  }
  font-weight: 500;
  font-family: inherit;
  font-size: 18px;
  transition: border-color 0.25s;
  i {
    padding-right:10px;
    padding-top: 4px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  height: calc(100vh - 310px);
  overflow-y: auto;
  width: 220px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 5px;
  .selected {
    background: #dce0e7;
  }
`;

export const AdminMenu = () => {
  const context = useContext(MenuContent);
  const [isEditView, setEditView] = useState(false);
  const [addModalState, setAddModalState] = useState(false);
  const addLocationInput = useRef();

  const addModalToggle = () => {
    setAddModalState(!addModalState);
    addLocationInput.current.value = "";
  };
  const locations = context.locations;

  const addLocation = () => {
    const currentValue = addLocationInput.current.value;

    if (currentValue != "") {
      getLocationsByName(currentValue).then((querySnapshot) => {
        const isUnique = querySnapshot.empty ? true : false;
        getLocationsByName(currentValue).then((querySnapshot) => {
          const isUnique = querySnapshot.empty ? true : false;
          if (isUnique) {
            addLocationFunction(currentValue);
            addModalToggle();
          } else {
            addLocationInput.current.value = "";
            addLocationInput.current.placeholder = "Enter unique name";
            addLocationInput.current.focus();
            addLocationInput.current.value = "";
            addLocationInput.current.placeholder = "Enter unique name";
            addLocationInput.current.focus();
          }
        });
      });
    } else {
      addLocationInput.current.placeholder = "Enter unique name";
      addLocationInput.current.focus();
    }
    addLocationInput.current.placeholder = "Enter unique name";
    addLocationInput.current.focus();
  };

  return (
    <Wrapper isEditView={isEditView}>
      
      {isEditView ? (
        <LinkBox to="/" onClick={() => setEditView(false)} className="text-dark">
          <MDBIcon icon="edit" fas />
          Edit mode
          
        </LinkBox>
      ) : (
        <LinkBox to="/AdminPanel" onClick={() => setEditView(true)} className="text-dark">
          <MDBIcon fas icon="check-circle" />
          Approve mode
          
        </LinkBox>
      )}

      

      
      <h4 >
          Locations 
      {isEditView ? (
        <>
            <button className="edit bsmall" style={{background: "none"}}>
            <MDBIcon icon="plus-circle" className="text-black" fas onClick={addModalToggle}/>
            </button>
          <MDBModal
            tabIndex="-1"
            show={addModalState}
            setShow={setAddModalState}
          >
            <MDBModalDialog centered>
              <MDBModalContent className="bg-gray bg-gradient">
                <MDBModalHeader>
                  <MDBModalTitle>
                    CREATE LOCATION
                    <MDBIcon className="ms-3" fas icon="map-marker-alt" />
                  </MDBModalTitle>
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
                    label="Location name"
                  />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={addModalToggle}>
                    Cancel
                  </MDBBtn>
                  <MDBBtn color="success" onClick={addLocation}>
                    Save
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
      ) : null    
      }
      <hr></hr>
      </h4>
      <List>
        {locations.map((location) => {
          return <AdminMenuItem location={location} key={location.id} />;
        })}
      </List>
    </Wrapper>
  );
};
