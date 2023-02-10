import { doc, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { locationsCollection } from '../firebase/utils/functions'

// const locationName = (name) => {
//     const newName = {
//         name:newName
//     }
//     return newName
// }

export const NameLocation = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
		getDocs(
			query(
				locationsCollection,
                // // where("name", "==", name),
                // where("id", "==", user.location_id)
				
                
            )
            
		).then(querySnapshot => {
			const data = querySnapshot.docs.map(doc => ({
				id: doc.id,
                ...doc.data(),
                
            }));
            setData(data)
            console.log(data)
           
			
		});
    }, []);
    
    return(
        <>
            
            <h2>Twoja Lokalizacja:{data.name} </h2>
            
        </>
    )
}