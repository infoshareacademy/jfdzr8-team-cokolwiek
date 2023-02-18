import { useContext, useState, useRef } from "react";
import { AdminPanelItem } from "./AdminPanelItem";
import { MenuContent } from "./StateContainer";
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
} from "mdb-react-ui-kit";
import { getUsersByEmail, usersCollection } from "../firebase/utils/functions";
import { addDoc } from "@firebase/firestore";
import styled from "styled-components";


const AdminHeader = styled.div`
position: absolute;
right: 0;
width: calc(100vw - 250px);
  height: 80px;
  align-items: center;
  h2 {
    margin-right: 20px;
    font-size: 24px;
    font-weight: 500;
  }
  padding: 40px;
  padding-top: 28px;
`
const EWrapper = styled.div`
position: absolute;
right: 0;
width: calc(100vw - 250px);
height: calc(100vh - 260px - 60px);
padding: 40px;
margin-top: 90px;
overflow-y: auto;
display:flex;
flex-direction: row;
flex-wrap: wrap;
column-gap: 40px; 
row-gap: 20px;
padding-top:10px;
`

const Wrapper = styled.div`
.bsmall {
  color:#fbfbfb;
  margin-left: 10px;
  padding: 2px;
  font-size:0.8em;
}
`

export const AdminPanel = () => {
  const context = useContext(MenuContent);
  const [addModalState, setAddModalState] = useState(false);
  const inputAddUserName = useRef();
  const inputAddUserLastName = useRef();
  const inputAddUserEmail = useRef();

  const addModalToggle = (user) => {
    setAddModalState(!addModalState);
    if (!addModalState) {
      inputAddUserName.current.value = "";
      inputAddUserName.current.placeholder = "";
      inputAddUserLastName.current.value = "";
      inputAddUserLastName.current.placeholder = "";
      inputAddUserEmail.current.value = "";
      inputAddUserEmail.current.placeholder = "";
    }
  };

  const addUser = () => {
    const newName = inputAddUserName.current.value;
    const newLastName = inputAddUserLastName.current.value;
    const newEmail = inputAddUserEmail.current.value;
    const newLocationId = context.location.id;

    let ok = true;

    if (newEmail == "") {
      ok = false;
      inputAddUserEmail.current.placeholder = "Enter value";
      inputAddUserEmail.current.focus();
    } else
      getUsersByEmail(newEmail).then((querySnapshot) => {
        const isUnique = querySnapshot.empty ? true : false;
        if (!isUnique) {
          ok = false;
          inputAddUserEmail.current.value = "";
          inputAddUserEmail.current.placeholder = "Enter unique value";
          inputAddUserEmail.current.focus();
        }
        if (newLastName == "") {
          ok = false;
          inputAddUserLastName.current.placeholder = "Enter value";
          inputAddUserLastName.current.focus();
        }

        if (newName == "") {
          ok = false;
          inputAddUserName.current.placeholder = "Enter value";
          inputAddUserName.current.focus();
        }

        if (ok) {
          addDoc(usersCollection, {
            name: newName,
            lastName: newLastName,
            location_id: newLocationId,
            "e-mail": newEmail,
            isAdmin: false,
          }).then(()=>{context.setGetUsersTrigger((val) => !val)});
          addModalToggle();
        }
      });
  };
  //console.log("admin panel users z context", context.users);
  return (
    <Wrapper>
      {context.location && <>
        <AdminHeader>
          <h2>{context.location.name}
          <button className="edit bsmall" style={{background: "none", padding:"5px",marginLeft:"10px"}}>
            <MDBIcon icon="plus-circle" className="text-black" fas onClick={addModalToggle}/>
            </button>
          </h2>
           <hr style={{width:"100%"}}></hr>
            </AdminHeader>
            <MDBModal
              tabIndex="-1"
              show={addModalState}
              setShow={setAddModalState}
            >
              <MDBModalDialog centered>
                <MDBModalContent className="bg-gray bg-gradient">
                  <MDBModalHeader>
                    <MDBModalTitle>
                      CREATE USER
                      <MDBIcon className="ms-3" fas icon="user-plus" />
                    </MDBModalTitle>
                    <MDBBtn
                      className="btn-close"
                      color="orange"
                      onClick={addModalToggle}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    <MDBInput
                      ref={inputAddUserName}
                      type="text"
                      className="bg-light bg-gradient"
                      label="Name"
                    />
                  </MDBModalBody>

                  <MDBModalBody>
                    <MDBInput
                      ref={inputAddUserLastName}
                      type="text"
                      className="bg-light bg-gradient"
                      label="Last name"
                    />
                  </MDBModalBody>

                  <MDBModalBody>
                    <MDBInput
                      ref={inputAddUserEmail}
                      type="text"
                      className="bg-light bg-gradient"
                      label="E-mail"
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={addModalToggle}>
                      Cancel
                    </MDBBtn>
                    <MDBBtn color="success" onClick={addUser}>
                      Save
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          <EWrapper>
          {context.users.map((user) => (
            <AdminPanelItem key={user.id} user={user} />
          ))}
          </EWrapper>
          </>}
    </Wrapper>
  )
}

