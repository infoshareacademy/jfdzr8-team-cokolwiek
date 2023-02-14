
import { doc, getDoc,} from "firebase/firestore";
import { MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { locationsCollection } from "../firebase/utils/functions";

const BoxNameLocation = styled.span`
	border: 2px solid gray;
	border-radius: 20px;
	width: 16%;
	height: 99px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 65px;
    background:yellowgreen
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
			<BoxNameLocation
				style={{
					
				}}>
				<MDBTypography
					tag="h6"
					style={{
						fontSize: "12px",
						color: "black",
					}}>
					<MDBIcon fas icon="map-marker-alt" />
                    Your Location:<h5 style={{marginTop:"10px"}}>{data.name}</h5>
				</MDBTypography>
			</BoxNameLocation>
		</>
	);
};
