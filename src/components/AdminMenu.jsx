import styled from "styled-components"
import { Link } from "react-router-dom"
import { addLocation } from "../firebase/utils/functions"

const Wrapper = styled.div`
.edit {
    display: ${({isEditView}) => !isEditView ? 'none' : 'initial'}};
}
`

const LinkBox = styled(Link)`
display: block;
min-height: 430px;
text-transform: capitalize;
text-decoration: none;
border-radius: 10px;
box-shadow: 0px 0px 5px 0px black;
`

export const AdminMenu = ({isEditView }) => {
    
    const addLocationModal = () => {
        addLocation({name: "test"})
    }

    return (
    <Wrapper isEditView = {isEditView}>
    <h1>Admin Menu</h1>
    <button className="edit" onClick={addLocationModal}>Dodaj Lokalizacje</button>
    <ul>
        <li>Sklep 1 <button className="edit">edit</button></li>
        <li>Sklep 2 <button className="edit">edit</button></li>
        <li>Sklep 3 <button className="edit">edit</button></li>
    </ul>
 
    <LinkBox to='/AdminPanel'>Admin panel</LinkBox>
    </Wrapper>
    )
  }