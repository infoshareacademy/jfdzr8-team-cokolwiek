import styled from "styled-components";
import { useState, useEffect } from "react";
import { onSnapshot } from "@firebase/firestore";
import { usersCollection } from "../../firebase/utils/functions";

const EmployeeButton = styled.button`
	font-size: 12px;
`;
export const ButtonEmployee = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		onSnapshot(usersCollection, querySnapshot => {
			const users = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			setUsers(users);
		});
	}, []);

	const editUserModal = e => {
		alert("edit " + e.target.id);
		console.log(e.target);
	};

	const delUserModal = e => {
		alert("del " + e.target.id);
		console.log(e.target);
	};

	return (
		<>
			{users.map(({ id, name, lastName }) => (
				<EmployeeButton key={id}>
					{name} {lastName}
					<button id={id}  onClick={editUserModal}>
						edit
					</button>
					<button id={id}  onClick={delUserModal}>
						del
					</button>
				</EmployeeButton>
			))}
		</>
	);
};
