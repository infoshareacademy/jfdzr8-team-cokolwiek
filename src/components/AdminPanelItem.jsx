import { useState, useRef, useContext } from "react";
import { dellUserFunction, getDataByUser, getUsersByEmail } from "../firebase/utils/functions";
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
  MDBDropdownItem
} from "mdb-react-ui-kit";
import styled from "styled-components";
import { MenuContent } from "./StateContainer";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase";


const EmployeeDiv = styled.div`
min-width: 280px;
max-width: 280px;
max-height: 180px;
min-height: 180px;
  font-size: 20px;
  border: 1px solid gray;
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
button.ripple.ripple-surface.ripple-surface-light.btn.btn-grey.dropdown-toggle {
    text-align: left;
    padding-left: 15px;
    width: 100%;
    height: 36px;
	border:none;
}
button.ripple-surface {
	box-shadow: none;
}
.dropdown-toggle {
    text-align: left;
    padding-left: 15px;
    width: 100%;
    height: 36px;
	border: none;
}
  
ul.dropdown-menu  {
    width: 100%;
}

`;

const ButtonsGroup = styled.div`
  font-size: 12px;
  border: 1px solid gray;
  border-radius: 20px;
  margin:0;
  padding: 4px;
  min-width: 0px;
  align-self: flex-start;
`;

const ELabel = styled.div`
width: 130px;
`

export const AdminPanelItem = ({ user }) => {
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const inputEditUserName = useRef();
  const inputEditUserLastName = useRef();
  const inputEditUserEmail = useRef();
  const inputFake = useRef()

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
	  inputFake.current.value = " "
      setNewLocation(context.location);
    } 
  };

  const deleteUser =  (id) => {
     deleteDoc(doc(db, "Users", id))
      .then(()=>{context.setGetUsersTrigger((val) => !val)})
    deleteModalToggle();
    
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
          }).then(()=>{context.setGetUsersTrigger((val) => !val)});
          editModalToggle();
          //update Data 
          if (user.location_id != newLocationId) {
            getDataByUser(id).then(querySnapshot => {
              const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              data.map(d=>{
                updateDoc(doc(db, "Data", d.id), {...d, location_id: newLocationId })
              })
            })
          }
        }
      });
  };

  return (
    <EmployeeDiv key={user.id}>
      <ELabel>{user.name + ' ' + user.lastName} 
      <p>{user["e-mail"]}</p></ELabel>
      <ButtonsGroup>
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
                    EDIT USER
                    <MDBIcon className="ms-3" fas icon="users" />
                  </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="orange"
                    onClick={() => {editModalToggle(user)}}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBInput
                    ref={inputEditUserName}
                    type="text"
                    className="bg-light bg-gradient"
					label="Name"
                  />
                </MDBModalBody>
                <MDBModalBody>
                  <MDBInput
                    ref={inputEditUserLastName}
                    type="text"
                    className="bg-light bg-gradient"
					label="Last name"
                  />
                </MDBModalBody>
                <MDBModalBody>
                  <MDBInput
                    ref={inputEditUserEmail}
                    type="text"
                    className="bg-light bg-gradient"
					label="E-mail"
                  />
                </MDBModalBody>

                <MDBModalBody>
				  <MDBInput type="text"
                    className="bg-light bg-gradient"
					label="Location"
					ref={inputFake}
					>
                  <MDBDropdown  style={{marginTop: "-36px"}}>
                    <MDBDropdownToggle color="grey" > 
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
				  </MDBInput>
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn
                    color="secondary"
                    onClick={() => editModalToggle(user)}
                  >
                    Cancel
                  </MDBBtn>
                  <MDBBtn
                    color="success"
                    id={user.id}
                    onClick={() => editUser(user.id)}
                  >
                    Save
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
                    DELETE {user.name} {user.lastName}
                  </MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="orange"
                    onClick={deleteModalToggle}
                  ></MDBBtn>
                </MDBModalHeader>

                <MDBModalFooter className="justify-content-center">
                  <MDBBtn color="secondary" onClick={deleteModalToggle}>
                    Cancel
                  </MDBBtn>
                  <MDBBtn
                    color="success gradient"
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </>
      </ButtonsGroup>
      
    </EmployeeDiv>
    
  );
};
