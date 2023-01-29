import { useState, useRef, useContext } from "react";
import { dellUserFunction, getUsersByEmail } from "../firebase/utils/functions";
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import styled from "styled-components";
import { MenuContent } from "./StateContainer";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase";

const EmployeeDiv = styled.div`
  font-size: 20px;
  border: 1px solid gray;
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  max-height: 80px;
`;

const Btns = styled.div`
  font-size: 12px;
  border: 1px solid gray;
  border-radius: 20px;
  margin: 0 10px;
  padding: 10px;
`;

export const AdminPanelItem = ({ user }) => {
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const inputEditUserName = useRef();
  const inputEditUserLastName = useRef();
  const inputEditUserEmail = useRef();

  const context = useContext(MenuContent);
  const [newLocation, setNewLocation] = useState(false);

  const deleteModalToggle = () => setDeleteModalState(!deleteModalState);

  const editModalToggle = (user) => {
    setEditModalState(!editModalState);
    if (!editModalState) {
      inputEditUserName.current.value = user.name;
      inputEditUserName.current.placeholder = "";
      inputEditUserLastName.current.value = user.lastName;
      inputEditUserLastName.current.placeholder = "";
      inputEditUserEmail.current.value = user["e-mail"];
      inputEditUserEmail.current.placeholder = "";
      setNewLocation(context.location);
    }
  };

  const deleteUser = (id) => {
    deleteDoc(doc(db, "Users", id))
      .then()
      .then(context.setGetUsersTrigger((val) => !val));
    editModalToggle();
  };

  const editUser = (id) => {
    const initialLocation = context.location;
    const newName = inputEditUserName.current.value;
    const newLastName = inputEditUserLastName.current.value;
    const newEmail = inputEditUserEmail.current.value;
    const newLocationId = newLocation ? newLocation.id : context.location.id;

    let ok = true;

    if (newEmail == "") {
      ok = false;
      inputEditUserEmail.current.placeholder = "Enter value";
      inputEditUserEmail.current.focus();
    } else
      getUsersByEmail(newEmail).then((querySnapshot) => {
        let isUnique = true;
        querySnapshot.docs.map((doc) => {
          const u = doc.data();
          if (doc.id != id && u["e-mail"] == newEmail) isUnique = false;
        });
        if (!isUnique) {
          ok = false;
          inputEditUserEmail.current.value = "";
          inputEditUserEmail.current.placeholder = "Enter unique value";
          inputEditUserEmail.current.focus();
        }
        if (newLastName == "") {
          ok = false;
          inputEditUserLastName.current.placeholder = "Enter value";
          inputEditUserLastName.current.focus();
        }

        if (newName == "") {
          ok = false;
          inputEditUserName.current.placeholder = "Enter value";
          inputEditUserName.current.focus();
        }

        if (ok) {
          updateDoc(doc(db, "Users", id), {
            ...user,
            name: newName,
            lastName: newLastName,
            location_id: newLocationId,
            "e-mail": newEmail,
          }).then(context.setGetUsersTrigger((val) => !val));
          editModalToggle();
        }
      });
  };

  return (
    <EmployeeDiv key={user.id}>
      {user.name} {user.lastName}{" "}
      <Btns>
        <button
          style={{ background: "none", borderRadius: "20px" }}
          onClick={() => editModalToggle(user)}
        >
          <MDBIcon color="black" icon="edit" />
        </button>
        <>
          <MDBModal
            tabIndex="-1"
            show={editModalState}
            setShow={setEditModalState}
          >
            <MDBModalDialog centered>
              <MDBModalContent className="bg-grey bg-gradient">
                <MDBModalHeader>
                  <MDBModalTitle>
                    Edycja pracownika
                    <MDBIcon className="ms-3" fas icon="users" />
                  </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="orange"
                    onClick={() => editModalToggle(user)}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <p style={{ fontSize: "18px" }}>Imię</p>
                  <MDBInput
                    ref={inputEditUserName}
                    type="text"
                    className="bg-light bg-gradient"
                  />
                </MDBModalBody>
                <MDBModalBody>
                  <p style={{ fontSize: "18px" }}>Nazwisko</p>
                  <MDBInput
                    ref={inputEditUserLastName}
                    type="text"
                    className="bg-light bg-gradient"
                  />
                </MDBModalBody>
                <MDBModalBody>
                  <p style={{ fontSize: "18px" }}>e-mail</p>
                  <MDBInput
                    ref={inputEditUserEmail}
                    type="text"
                    className="bg-light bg-gradient"
                  />
                </MDBModalBody>

                <MDBModalBody>
                  <p style={{ fontSize: "18px" }}>Location</p>

                  <MDBDropdown>
                    <MDBDropdownToggle color="grey">
                      {newLocation ? newLocation.name : context.location.name}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      {context.locations.map((location) => {
                        return (
                          <MDBDropdownItem
                            key={location.id}
                            onClick={() => setNewLocation(location)}
                            link
                          >
                            {location.name}
                          </MDBDropdownItem>
                        );
                      })}
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn
                    color="secondary"
                    onClick={() => editModalToggle(user)}
                  >
                    Anuluj
                  </MDBBtn>
                  <MDBBtn
                    color="success"
                    id={user.id}
                    onClick={() => editUser(user.id)}
                  >
                    Zapisz
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
        <button
          style={{
            background: "none",
            borderRadius: "20px",
          }}
          onClick={deleteModalToggle}
        >
          <MDBIcon color="black" icon="trash" />
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
                    Czy na pewno chcesz usunąć pracownika?
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
                  <MDBBtn
                    color="success gradient"
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Usuń
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
      </Btns>
    </EmployeeDiv>
  );
};
