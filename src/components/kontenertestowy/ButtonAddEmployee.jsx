import styled from "styled-components";
import { addUser } from '../../firebase/utils/functions';
const AddEmployee = styled.button`
	position: relative;
	top: 2%;
	left: -34%;
`;
export const ButtonAddEmployee = () => {
   
    const addUserModal = () => {
        {addUser({name: "test"})}
        alert("add new")
    }

	return <AddEmployee onClick={addUserModal}>Dodaj pracownika</AddEmployee>;
};
