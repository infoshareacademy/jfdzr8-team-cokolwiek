import { getDocs, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { usersCollection } from '../firebase/utils/functions';
import { MenuContent } from './StateContainer';

const initData = user => {
	const newData = {
		name: user.name + " " + user.lastName,
		userId: user.id,
		locationId: user.location_id,
    };
    return newData;
};

export const NameIcon = ({ user }) => {
    const context = useContext(MenuContent);
    const [data, setData] = useState([]);
    useEffect(() => {
		getDocs(
			query(
				usersCollection,
                // where("name", "==", name),
                // where("id", "==", user.location_id)
				
                
            )
            
		).then(querySnapshot => {
			const data = querySnapshot.docs.map(doc => ({
				id: doc.id,
                ...doc.data(),
                
            }));
            if (data.length == 0) {
				const ddd = initData(user);
				setData(ddd);
			} 
            setData(ddd);
			
		});
    }, []);
    return (
        <h4>{data.name}</h4>
    )
}