import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { db } from "../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

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

export const AdminMenuItem = ({ location }) => {
  const [locations, setLocations] = useState([]);

  const context = useContext(MenuContent);
  const [centredModal, setCentredModal] = useState(false);
  const [deleteCentredModal, setDeleteCentredModal] = useState(false);

  const setLocation = (e) => {
    context.setLocation(location);
  };

  const editLocationModal = () => setCentredModal(!centredModal);

  const delOpenLocationModal = (e) => {
    // console.log("del " + e.target.id);
    setDeleteCentredModal(!deleteCentredModal);
    setId(e.target.id);
  };

  const delCloseLocationModal = (e) => {
    // console.log("del " + e.target.id);
    setDeleteCentredModal(!deleteCentredModal);
    setId(null);
  };

  const deleteLocation = (e) => {
    const docRef = doc(db, "Locations", location.id);
    deleteDoc(docRef);
    setId(null);
  };

  return (
    <ListItem
      key={location.id}
      className={location.id == context.location.id ? "selected" : ""}
    >
      <span id={location.id} onClick={setLocation}>
        {location.name}
      </span>
      <button
        id={location.id}
        className="edit bsmall"
        onClick={editLocationModal}
      >
        <MDBIcon icon="edit" />
      </button>
      <>
        <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
          <MDBModalDialog centered>
            <MDBModalContent className="bg-warning bg-gradient">
              <MDBModalHeader>
                <MDBModalTitle>Edytuj lokalizację</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="orange"
                  onClick={editLocationModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput
                  id="form1"
                  type="text"
                  className="bg-light bg-gradient"
                />
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={editLocationModal}>
                  Zamknij
                </MDBBtn>
                <MDBBtn color="success">Zapisz</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
      <button
        id={location.id}
        className="edit bsmall"
        onClick={delOpenLocationModal}
      >
        <MDBIcon icon="trash" />
      </button>
      <>
        <MDBModal
          tabIndex="-1"
          show={deleteCentredModal}
          setShow={setDeleteCentredModal}
        >
          <MDBModalDialog centered>
            <MDBModalContent className="bg-danger bg-gradient">
              <MDBModalHeader>
                <MDBModalTitle>Czy chcesz usunąć lokalizację?</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="orange"
                  onClick={delCloseLocationModal}
                ></MDBBtn>
              </MDBModalHeader>

              <MDBModalFooter className="justify-content-center">
                <MDBBtn color="secondary" onClick={delCloseLocationModal}>
                  Anuluj
                </MDBBtn>
                <MDBBtn
                  id={location.id}
                  color="success gradient"
                  onClick={deleteLocation}
                >
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
