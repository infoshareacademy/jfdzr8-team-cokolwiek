import React, { useEffect, useState } from "react";
import { onSnapshot } from "@firebase/firestore";
import { usersCollection } from "../firebase/utils/functions";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

export const AdminEmployeesList = () => {
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

  return (
    
		<>
			<h1>Admin Employees List</h1>

			<MDBTable bordered borderColor="primary">
				<MDBTableHead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Poniedziałek </th>
						<th scope="col">Wtorek</th>
						<th scope="col">Środa</th>
						<th scope="col">Czwartek</th>
						<th scope="col">Piątek</th>
						<th scope="col">Sobota</th>
						<th scope="col">Niedziela</th>
						<th scope="col">Razem</th>
					</tr>
        </MDBTableHead>
        
        {users.map(({ id, name }) => (
          <MDBTableBody key={id}>
            <tr>
              <th scope="col">{name}</th>
              <td>
                <input></input>
              </td>
              <td>
                <input></input>
              </td>
              <td>
                <input></input>
              </td>
              <td>
                <input></input>
              </td>
              <td>
                <input></input>
              </td>
              <td>
                <input></input>
              </td>
              <td>
                <input></input>
              </td>
              <td>
                <div></div>
              </td>
            </tr>
          </MDBTableBody>
        ))}
			</MDBTable>
		</>
	);
};
