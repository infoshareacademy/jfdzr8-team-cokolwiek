
import { doc, getDoc,} from "firebase/firestore";
import { MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { locationsCollection } from "../firebase/utils/functions";

const BoxNameLocation = styled.span`
	border: 7px double #ab8567;
	border-radius: 20px;
    box-shadow: 10px 7px 13px rgb(171, 133, 103);
	width: 16%;
	height: 99px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 65px;
    background: rgb(247,235,223);
    padding:2px
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
                    Your Location:<p style={{marginTop:"10px", fontSize:"25px"}}>{data.name}</p>
				</MDBTypography>
			</BoxNameLocation>
		</>
	);
};
