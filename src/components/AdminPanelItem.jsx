import { useState, useRef } from "react"
import { dellUserFunction, editUserFunction, getLocationsByName } from "../firebase/utils/functions";
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
import styled from "styled-components";



const EmployeeDiv = styled.div`
	font-size: 12px;
`;

export const AdminPanelItem = ({user}) => {
    
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);
    const inputEditUserName = useRef()
  
    const deleteModalToggle = () => setDeleteModalState(!deleteModalState);
  
    const editModalToggle = (user) => {
      setEditModalState(!editModalState);
      if (!editModalState) {
        inputEditUserName.current.value = user.name
        inputEditUserName.current.placeholder = ""
      }
    }
  
    const deleteUser = (id) => {
      dellUserFunction(id)
      deleteModalToggle()
    };
  
    const editUser = (id) => {
      const newName = inputEditUserName.current.value
          editUserFunction({id: id, name: newName})
          editModalToggle()
      };

      return (
        <EmployeeDiv key={user.id}>
            {user.name} {user.lastName}
            <button
className="edit bsmall"
onClick={()=>editModalToggle(user)}
>
<MDBIcon icon="edit" />
</button>
<>
<MDBModal tabIndex="-1" show={editModalState} setShow={setEditModalState}>
  <MDBModalDialog centered>
    <MDBModalContent className="bg-warning bg-gradient">
      <MDBModalHeader>
        <MDBModalTitle>Edycja usera</MDBModalTitle>
        <MDBBtn
          className="btn-close"
          color="orange"
          onClick={()=>editModalToggle(user)}
        ></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
        Imie
        <MDBInput
          ref={inputEditUserName}
          type="text"
          className="bg-light bg-gradient"
        />
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={()=>editModalToggle(user)}>
          Anuluj
        </MDBBtn>
        <MDBBtn color="success" id={user.id} onClick={()=>editUser(user.id)}>Zapisz</MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>
</>
            <button
className="edit bsmall"
onClick={deleteModalToggle}
>
<MDBIcon icon="trash" />
</button>
<>
<MDBModal tabIndex="-1" show={deleteModalState} setShow={setDeleteModalState} >
  <MDBModalDialog centered>
    <MDBModalContent className="bg-danger bg-gradient">
      <MDBModalHeader>
        <MDBModalTitle>Czy na pewno</MDBModalTitle>
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
          onClick={()=>{deleteUser(user.id)}}
        > 
          Usuń
        </MDBBtn>
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>
</>
        </EmployeeDiv>
)
}