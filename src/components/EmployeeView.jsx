import { query, where, getDocs, addDoc } from "firebase/firestore";
import { dataCollection } from "../firebase/utils/functions";
import { useContext, useEffect, useRef, useState } from "react";
import { MenuContent } from "./StateContainer";
import React from "react";
import {
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBInput,
	MDBBtn,
} from "mdb-react-ui-kit";
import styled from "styled-components";
import { NameLocation } from "./NameLocation";

const TableDiv = styled.div`
	width: 60%;
`;

const TablePack = styled.div`
	display: flex;
	justify-content: center;
`;

const currentWeek = function () {
	var options = { year: "numeric" };
	var now = new Date();
	var onejan = new Date(now.getFullYear(), 0, 1);
	var w = Math.ceil(((now - onejan) / 86400000 + onejan.getDay() - 1) / 7);
	if (w < 10) w = "0" + w;
	return now.toLocaleString("en-US", options) + "-W" + w;
};

const initData = user => {
	const newData = {
		pn: 0,
		wt: 0,
		sr: 0,
		czw: 0,
		pt: 0,
		sn: 0,
		nd: 0,
		sum: 0,
		name: user.name + " " + user.lastName,
		userId: user.id,
		locationId: user.location_id,
	};

	return newData;
};

export const EmployeeView = ({ user }) => {
	const context = useContext(MenuContent);
	const [data, setData] = useState(null);

	// const [draftId, setDraftId] = useState(null);

	const [week, setWeek] = useState(currentWeek(data));
	const weekInput = useRef(null);
	const w = currentWeek();
	if (weekInput.current) weekInput.current.value = w == week ? w : week;
	useEffect(() => {
		getDocs(
			query(
				dataCollection,
				where("location_id", "==", user.location_id),
				where("user_id", "==", user.id),
				where("week", "==", week)
			)
		).then(querySnapshot => {
			const data = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			if (data.length == 0) {
				const ddd = initData(user);
				setData(ddd);
			} else {
				const ddd = {
					pn: data[0].pn,
					wt: data[0].wt,
					sr: data[0].sr,
					czw: data[0].czw,
					pt: data[0].pt,
					sn: data[0].sn,
					nd: data[0].nd,
					sum: data[0].sum,
				};
				setData(ddd);
			}
		});
	}, [week]);

	const handleChange = (id, day, e) => {
		const val = parseFloat(e.target.value);
		const error = isNaN(val) || val < 0;
		let sum = data.sum;
		if (!error)
			sum =
				data.pn * 1 +
				data.wt * 1 +
				data.sr * 1 +
				data.czw * 1 +
				data.pt * 1 +
				data.sn * 1 +
				data.nd * 1;

		setData({ ...data, [day]: e.target.value, sum:sum });
		console.log(data, e, id, day);
	};

	const handleSubmit = event => {
		alert(`Zapisano : ${event.target.value}`);
		event.preventDefault();
	};

	// const getFormData = (e) => {
	//     const form = e.target;
	//     const { pn,wt,sr,czw,pt,sn,nd } = form;

	//     const dat = {
	//       pn: pn.value,
	//       wt: wt.value,
	//         sr: sr.value,
	//         czw: czw.value,
	//         pt: pt.value,
	//         sn: sn.value,
	//         nd: nd.value

	//     };

	//     return dat;
	//   };
	// const handleSubmit = (e) => {
	//     e.preventDefault();
	//     addDoc(dataCollection, getFormData(e));
	// };

	// const handleUpdate = () => {
	//     e.preventDefault();
	//     const docRef = doc(dataCollection,);

	//     updateDoc(docRef, getFormData(e));

	//     setDraftId(null);

	// }

   

	return (
		<>
			<NameLocation user={user} />
			{console.log(data, "week", week)}

			<form onSubmit={handleSubmit}>
				<MDBInput
					type="week"
					onChange={e => {
						setWeek(e.target.value);
					}}
					ref={weekInput}></MDBInput>
				<TablePack>
					<TableDiv>
						<MDBTable hover responsive>
							<MDBTableHead dark>
								<tr>
									<th scope="col">Employee</th>
									<th scope="col">Monday</th>
									<th scope="col">Tuesday</th>
									<th scope="col">Wednesday</th>
									<th scope="col">Thursday</th>
									<th scope="col">Friday</th>
									<th scope="col">Saturday</th>
									<th scope="col">Sunday</th>
									<th scope="col">Sum</th>
								</tr>
							</MDBTableHead>
							<MDBTableBody>
								<tr>
									<td>{data?.name}</td>
									<td>
										<MDBInput
											value={data ? data.pn : ""}
											onChange={e => handleChange(user.id, "pn", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data ? data.wt : ""}
											onChange={e => handleChange(user.id, "wt", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data ? data.sr : ""}
											onChange={e => handleChange(user.id, "sr", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data ? data.czw : ""}
											onChange={e => handleChange(user.id, "czw", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data ? data.pt : ""}
											onChange={e => handleChange(user.id, "pt", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data ? data.sn : ""}
											onChange={e => handleChange(user.id, "sn", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data ? data.nd : ""}
											onChange={e => handleChange(user.id, "nd", e)}
										/>
									</td>
									<td>
										<span
											className="form-control"
											style={{ background: "transparent", width: "100px" }}>
											{data?.sum}
										</span>
									</td>
								</tr>
							</MDBTableBody>
						</MDBTable>
					</TableDiv>
				</TablePack>

				<MDBBtn type="submit" >
					Submit
				</MDBBtn>
			</form>
		</>
	);
};
