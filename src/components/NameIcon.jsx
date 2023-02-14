import { getDoc, doc } from "firebase/firestore";
import { MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { usersCollection } from "../firebase/utils/functions";

const ViewName = styled.p`
	margin: 0;
`;
const BoxNameIcon = styled.span`
	border: 2px solid gray;
	border-radius: 20px;
	width: 16%;
	height: 99px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 65px;
    background:yellowgreen;
    padding:2px
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
						fontSize: "16px",
						color: "black",
					}}>
					<MDBIcon fas icon="user-alt" /> <ViewName>{data.name}</ViewName>
					<ViewName>{data.lastName}</ViewName>
				</MDBTypography>
			</BoxNameIcon>
		</>
	);
};
