import styled from "styled-components"
import { Link } from "react-router-dom"
import { addLocation } from "../firebase/utils/functions"

const Wrapper = styled.div`
.edit {
    display: ${({isEditView}) => !isEditView ? 'none' : 'initial'}};
}
display: block;
box-shadow: 0px 0px 5px 0px black;
min-height: 100%;
display: flex;
flex-direction: column;
align-items: center;
min-width: 220px;
padding-top: 20px;
`

const LinkBox = styled(Link)`
display: block;
border-radius: 10px;
box-shadow: 0px 0px 5px 0px black;
width: 200px;
display: flex;
justify-content: center;
`

export const AdminMenu = ({isEditView }) => {
    
    const addLocationModal = () => {
        addLocation({name: "test"})
    }

    return (
    <Wrapper isEditView = {isEditView}>
    <h2>Admin Menu</h2>
    <button className="edit" onClick={addLocationModal}>Dodaj Lokalizacje</button>
    <ul>
        <li>Sklep 1 <button className="edit">edit</button></li>
        <li>Sklep 2 <button className="edit">edit</button></li>
        <li>Sklep 3 <button className="edit">edit</button></li>
    </ul>
    {isEditView ? <LinkBox to='/'>Admin home</LinkBox> :
    <LinkBox to='/AdminPanel'>Admin panel</LinkBox>
    }
    </Wrapper>
    )
  }