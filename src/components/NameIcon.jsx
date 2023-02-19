import { getDoc, doc } from "firebase/firestore";
import { MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { usersCollection } from "../firebase/utils/functions";

// const ViewName = styled.p`
// 	margin: 0;
// `;
const BoxNameIcon = styled.div`
	margin-top: 70px;
	width: 10rem;
`;

export const NameIcon = ({ user }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const docRef = doc(usersCollection, user.id);
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
			<BoxNameIcon>
				<MDBTypography
					tag="h6"
					style={{
						fontSize: "20px",
						color: "black",
					}}>
					 <p> <MDBIcon fas icon="user-alt" />  {data.name + " " + data.lastName}</p>
			
				</MDBTypography>
			</BoxNameIcon>
		</>
	);
};
