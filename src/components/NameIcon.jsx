import { getDoc, doc } from 'firebase/firestore';
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
            <h2> Witaj: {data.name + " " + data.lastName} </h2>
            
        </>
    )
}