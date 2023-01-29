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
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { getUsersByEmail, usersCollection } from "../firebase/utils/functions";
import { addDoc } from "@firebase/firestore";

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
          }).then(context.setGetUsersTrigger((val) => !val));
          addModalToggle();
        }
      });
  };
  console.log("admin panel users z context", context.users);
  return (
    <>
      <h1>Admin Panel</h1>
      <hr></hr>
      {context.location && (
        <>
          <h2>selected location: {context.location.name}</h2>
          <hr></hr>
          <>
            <button
              style={{
                background: "none",
                border: "1px solid gray",
                borderRadius: "20px",
                color: "black",
                fontSize: "20px",
              }}
              className="edit bbig"
              onClick={addModalToggle}
            >
              Add User
              <MDBIcon icon="plus" className="ms-3" />
            </button>
            <p></p>
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
                    <p style={{ fontSize: "18px" }}>Imię</p>

                    <MDBInput
                      ref={inputAddUserName}
                      type="text"
                      className="bg-light bg-gradient"
                    />
                  </MDBModalBody>

                  <MDBModalBody>
                    <p style={{ fontSize: "18px" }}>Nazwisko</p>
                    <MDBInput
                      ref={inputAddUserName}
                      type="text"
                      className="bg-light bg-gradient"
                    />
                  </MDBModalBody>

                  <MDBModalBody>
                    <p style={{ fontSize: "18px" }}> E-mail</p>

                    <MDBInput
                      ref={inputAddUserLastName}
                      type="text"
                      className="bg-light bg-gradient"
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={addModalToggle}>
                      Anuluj
                    </MDBBtn>
                    <MDBBtn color="success" onClick={addUser}>
                      Zapisz
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
          </>
          {context.users.map((user) => (
            <AdminPanelItem key={user.id} user={user} />
          ))}
        </>
      )}
    </>
  );
};
