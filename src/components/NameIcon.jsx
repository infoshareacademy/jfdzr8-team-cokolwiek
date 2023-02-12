import { getDoc, doc } from 'firebase/firestore';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useContext, useEffect, useState } from 'react';
import { usersCollection } from '../firebase/utils/functions';



export const NameIcon = ({ user }) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const docRef = doc(usersCollection, user.id)
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data())
                } else {
                    console.log("Document does not exist")
                }
            
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    
        }, [])
;
    
    return(
        <>
            <h6
                style={{
						
						borderRadius: "20px",
						width: "200px",
						color: "black",
					}}>  Welcome: <MDBIcon fas icon="user-alt" /> {data.name + " " + data.lastName} </h6>
            
        </>
    )
}