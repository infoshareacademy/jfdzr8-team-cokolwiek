import { async } from '@firebase/util';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { MDBIcon, MDBTypography } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase';
import { locationsCollection } from '../firebase/utils/functions'


export const NameLocation = ({ user }) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const docRef = doc(locationsCollection, user.location_id)
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
            <span>
            
            <MDBTypography tag='h6'
                style={{
						font: "10px",
						borderRadius: "20px",
						width: "300px",
						color: "black",
                    }}>
                    <MDBIcon  fas icon="map-marker-alt" />Your Location: <h5
                   >{data.name}</h5> </MDBTypography>
                </span>
            
        </>
    )
}