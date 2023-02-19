
import { doc, getDoc,} from "firebase/firestore";
import { MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { locationsCollection } from "../firebase/utils/functions";

const BoxNameLocation = styled.div`
margin-top: 70px
`;

export const NameLocation = ({ user }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const docRef = doc(locationsCollection, user.location_id);
			try {
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setData(docSnap.data());
				} else {
					console.log("Document does not exist");
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return (
		<>
			<BoxNameLocation>
				<p style={{
					fontSize: "20px"
				}}>
					 <MDBIcon fas icon="map-marker-alt" /> <span> </span>
                     Your Location:<p style={{marginTop:"10px", fontSize:"25px"}}>{data.name}</p>
					</p> 
			</BoxNameLocation>
		</>
	);
};
