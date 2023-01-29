
import { useContext, useState, useRef } from "react"
import { AdminPanelItem } from "./AdminPanelItem"
import { MenuContent } from "./StateContainer"
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
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem 
} from "mdb-react-ui-kit";
import {
  getUsersByEmail, addUserFunction
} from "../firebase/utils/functions";


export const AdminPanel = () => {
  const context = useContext(MenuContent)
  const [addModalState, setAddModalState] = useState(false);
  const inputAddUserName = useRef();
  const inputAddUserLastName = useRef();
  const inputAddUserEmail = useRef();

  const addModalToggle = user => {
		setAddModalState(!addModalState);
		if (!addModalState) {
			inputAddUserName.current.value = ""
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
    const newLocationId = context.location.id

    let ok = true;

    if (newEmail == "") {
      ok = false;
      inputAddUserEmail.current.placeholder = "Enter value";
      inputAddUserEmail.current.focus()
    } else getUsersByEmail(newEmail).then(querySnapshot => {
      const isUnique = querySnapshot.empty ? true : false
      if (!isUnique) {
        ok = false
        inputAddUserEmail.current.value = "";
        inputAddUserEmail.current.placeholder = "Enter unique value";
        inputAddUserEmail.current.focus()
      }
      if (newLastName == "") {
        ok = false;
        inputAddUserLastName.current.placeholder = "Enter value";
        inputAddUserLastName.current.focus()
      }
  
      if (newName == "") {
        ok = false;
        inputAddUserName.current.placeholder = "Enter value";
        inputAddUserName.current.focus()
      }
   
      if (ok) {
        //console.log({ name: newName, lastName: newLastName, locationId: newLocationId, email: newEmail})
        addUserFunction({ name: newName, lastName: newLastName, locationId: newLocationId, email: newEmail});
        addModalToggle();
      }
    })
    
	};

    return (<>
    <h1>Admin Panel</h1>
      {context.location &&
        <>
          <div>selected location: {context.location.name}</div>
          <>
        <button className="edit bbig" onClick={addModalToggle}>
          Add Location
          <MDBIcon icon="plus" className="ms-3" />
        </button>
        <MDBModal
					tabIndex="-1"
					show={addModalState}
					setShow={setAddModalState}>
					<MDBModalDialog centered>
						<MDBModalContent className="bg-warning bg-gradient">
							<MDBModalHeader>
								<MDBModalTitle>CREATE USER</MDBModalTitle>
								<MDBBtn
									className="btn-close"
									color="orange"
									onClick={addModalToggle}></MDBBtn>
							</MDBModalHeader>
							<MDBModalBody>
								Imie
								<MDBInput
									ref={inputAddUserName}
									type="text"
									className="bg-light bg-gradient"
								/>
							</MDBModalBody>
							<MDBModalBody>
								Nazwisko
								<MDBInput
									ref={inputAddUserLastName}
									type="text"
									className="bg-light bg-gradient"
								/>
                E-mail
								<MDBInput
									ref={inputAddUserEmail}
									type="text"
									className="bg-light bg-gradient"
								/>
							</MDBModalBody>
							<MDBModalFooter>
								<MDBBtn color="secondary" onClick={addModalToggle}>
									Anuluj
								</MDBBtn>
								<MDBBtn
									color="success"
									onClick={addUser}>
									Zapisz
								</MDBBtn>
							</MDBModalFooter>
						</MDBModalContent>
					</MDBModalDialog>
				</MDBModal>
    </>   {console.log(`contet users for location ${context.location.name} ${context.location.id}`,context.users)}
          {
            context.users.map(user =>(context.location.id == user.location_id ) ? 
            <AdminPanelItem key={user.id} user={user}/> 
            : false
            )
          }
          
        </>
      }
    </>
    )
  }