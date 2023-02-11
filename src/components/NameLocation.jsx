import { async } from '@firebase/util';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore'
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
            <h2>Twoja Lokalizacja:{data.name} </h2>
            
        </>
    )
}