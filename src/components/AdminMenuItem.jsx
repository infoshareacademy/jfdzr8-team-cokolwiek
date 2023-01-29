import styled from "styled-components";
import { useState, useRef } from "react";
import { useContext } from "react";
import { MenuContent } from "./StateContainer";
import { MDBIcon } from "mdb-react-ui-kit";

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
import {
  dellLocationFunction,
  editLocationFunction,
  getLocationsByName,
} from "../firebase/utils/functions";

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
    background: #9fd9f9;
    cursor: pointer;
  }
  span {
    width: 80%;
    text-align: center;
  }
`;

export const AdminMenuItem = ({ location }) => {
  const context = useContext(MenuContent);
  const [editModalState, setEditModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const editLocationInput = useRef();

  const editModalToggle = () => {
    setEditModalState(!editModalState);
    if (!editModalState) {
      editLocationInput.current.value = location.name;
      editLocationInput.current.placeholder = "";
    }
  };
  const deleteModalToggle = () => setDeleteModalState(!deleteModalState);

  const deleteLocation = () => {
    dellLocationFunction(location.id);
    if (context.location.id == location.id) context.setLocation(false);
    dellLocationFunction(location.id);
    if (context.location.id == location.id) context.setLocation(false);
  };

  const editLocation = () => {
    const currentValue = editLocationInput.current.value;
    if (currentValue != "") {
      getLocationsByName(currentValue).then((querySnapshot) => {
        const isUnique = querySnapshot.empty ? true : false;
        if (isUnique) {
          editLocationFunction(location.id, currentValue);
          if (context.location.id == location.id)
            context.setLocation({ ...location, name: currentValue });
          editModalToggle();
        } else {
          editLocationInput.current.value = "";
          editLocationInput.current.placeholder = "Enter unique name";
          editLocationInput.current.focus();
        }
      });
    } else {
      editLocationInput.current.placeholder = "Enter unique name";
      editLocationInput.current.focus();
    }
  };

  return (
    <ListItem
      key={location.id}
      className={location.id == context.location.id ? "selected" : ""}
    >
      <span id={location.id} onClick={() => context.setLocation(location)}>
        {location.name}
      </span>
      <button
        id={location.id}
        className="edit bsmall"
        style={{ background: "none" }}
        onClick={editModalToggle}
      >
        <MDBIcon icon="edit" color="black" />
      </button>
      <>
        <MDBModal
          tabIndex="-1"
          show={editModalState}
          setShow={setEditModalState}
        >
          <MDBModalDialog centered>
            <MDBModalContent className="bg-gray bg-gradient">
              <MDBModalHeader>
                <MDBModalTitle>
                  EDIT NAME
                  <MDBIcon className="ms-3" fas icon="globe-americas" />
                </MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="orange"
                  onClick={editModalToggle}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  ref={editLocationInput}
                  type="text"
                  className="bg-light bg-gradient"
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={editModalToggle}>
                  Anuluj
                </MDBBtn>
                <MDBBtn color="success" onClick={editLocation}>
                  Zapisz
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
      <button
        id={location.id}
        className="edit bsmall"
        style={{ background: "none" }}
        onClick={deleteModalToggle}
      >
        <MDBIcon icon="trash" color="black" />
      </button>
      <>
        <MDBModal
          tabIndex="-1"
          show={deleteModalState}
          setShow={setDeleteModalState}
        >
          <MDBModalDialog centered>
            <MDBModalContent className="bg-danger bg-gradient">
              <MDBModalHeader>
                <MDBModalTitle>
                  Czy chcesz usunąć lokalizację {location.name} <br />
                  wraz z przypisanymi do niej osobami?
                </MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="orange"
                  onClick={deleteModalToggle}
                ></MDBBtn>
              </MDBModalHeader>

              <MDBModalFooter className="justify-content-center">
                <MDBBtn color="secondary" onClick={deleteModalToggle}>
                  Anuluj
                </MDBBtn>
                <MDBBtn color="success gradient" onClick={deleteLocation}>
                  Usuń
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    </ListItem>
  );
};
