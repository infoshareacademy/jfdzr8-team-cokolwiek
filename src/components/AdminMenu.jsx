import styled from "styled-components"
import { Link } from "react-router-dom"
import { addLocation, getLocations } from "../firebase/utils/functions"
import { useState, useEffect } from "react"
import { locationsCollection } from "../firebase/utils/functions"
import { onSnapshot } from "@firebase/firestore"

const Wrapper = styled.div`
.edit {
    display: ${({isEditView}) => !isEditView ? 'none' : 'initial'}};
}
.bbig {
    color:#fbfbfb;
    width: 200px;
    height: 35px;
    padding: 5px;
    margin-top: 10px;
}
.bsmall {
    height: 25px;
    width: 50px;
    color:#fbfbfb;
    margin-left: 5px;
    padding: 2px;
    font-size: 0.8em;
}
h2 {
    color:#fbfbfb;
}
h4 {
    height: 25px;
    margin-top: 10px;
}
box-shadow: 0px 0px 5px 0px black;
min-height: 100%;
display: flex;
flex-direction: column;
align-items: center;
min-width: 220px;
padding-top: 20px;


`

const LinkBox = styled(Link)`
border-radius: 5px;
box-shadow: 0px 0px 5px 0px black;
display: flex;
justify-content: center;
min-width: 200px;
height: 35px;
padding: 5px;
color: #1a1a1a;
background-color: #fbfbfb;
margin-bottom: 10px;
&:hover{
   
}
`
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
 &:hover{
    background: #e4a11b;
    cursor: pointer;
 }
 span {
    width:80%;
    text-align: center;
 }
`
const List = styled.ul`
    list-style-type: none;
    height: 66vh;
    min-height: 65vh;
    overflow-y: auto;
    padding-right: 15px;
    width: 100%;
    margin-top: 10px;
    border-top: 1px solid;
    padding: 10px;
    box-shadow: 0px 0px 2px 0px black;
`

export const AdminMenu = () => {
    const [locations, setLocations] = useState([])
    const [isEditView, setEditView] = useState(false)

    useEffect(() => {
        onSnapshot(locationsCollection,querySnapshot => {
            const locations = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }))
            setLocations(locations)
          })
      }, [])

    const addLocationModal = () => {
        {addLocation({name: "test"})}
        alert("add new")
    }

    const editLocationModal = (e) => {
        alert("edit "+e.target.id)
        console.log(e.target)
    }

    const delLocationModal = (e) => {
        alert("del "+e.target.id)
        console.log(e.target)
    }

    return (
    <Wrapper isEditView = {isEditView}>
    <h2>Admin Menu</h2>
    {isEditView ? <LinkBox to='/' onClick={()=>setEditView(false)}>Disable Edit Mode</LinkBox> :
    <LinkBox to='/AdminPanel'onClick={()=>setEditView(true)}>Enable Edit Mode</LinkBox>
    }
    {isEditView ? <button className="edit bbig" onClick={addLocationModal}>Add Location</button> : <h4>Select Location</h4>}
    <List>
        {locations.map((location)=>{
         return (<ListItem key={location.id}><span>{location.name}</span>
         <button id={location.id} className="edit bsmall" onClick={editLocationModal}>edit</button> 
         <button id={location.id} className="edit bsmall" onClick={delLocationModal}>del</button></ListItem> 
         )
        })}
    </List>
    </Wrapper>
    )
  }