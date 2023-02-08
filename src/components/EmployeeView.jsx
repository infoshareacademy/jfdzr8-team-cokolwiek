import { query, where, getDocs, } from "firebase/firestore";
import {
	dataCollection,
	
} from "../firebase/utils/functions";
import { useContext, useEffect, useRef, useState } from "react";
import { MenuContent } from "./StateContainer";
import React from "react";
import {
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBInput,
} from "mdb-react-ui-kit";
import styled from "styled-components";


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

const initData = (user) => {
    const newData = {
        pn: 0, wt: 0, sr: 0, cz: 0, pt: 0, sn: 0, nd: 0, sum: 0, name: user.name + " " + user.lastName, userId: user.id, locationId: user.location_id, 
    }
          
    return newData
  
  }

export const EmployeeView = ({ user}) => {

	const context = useContext(MenuContent);
	const [data, setData] = useState([]);
	const [week, setWeek] = useState(currentWeek());
    const weekInput = useRef(null);
    const w = currentWeek()
    if (weekInput.current) weekInput.current.value = w == week ? w : week
    useEffect(() => {
		getDocs(
			query(
				dataCollection,
				where("location_id", "==", user.location_id),
				where("user_id", "==", user.id),
                where("week", "==", week),
                
			)
		).then(querySnapshot => {
			const data = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
            if (data.length == 0) {
                const ddd = initData(user)
                setData(ddd)
                
            } else {
                const ddd = {
                    pn: data[0].pn,
                    wt: data[0].wt,
                    sr: data[0].sr,
                    czw: data[0].czw,
                    pt: data[0].pt,
                    sn: data[0].sn,
                    nd: data[0].nd,
                    sum:data[0].sum
                
                }
                setData(ddd)
            }
			
		});
	}, [week]);

	return (
        <>
            <h2>name</h2>
            {console.log(data, "week", week,)}
           <MDBInput type="week" onChange={(e)=>{
            setWeek(e.target.value)
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
									<td>{data.name}</td>
									<td>
										<MDBInput
											value={data.pn }
											onKeyDown={e => handleKey(data.pn, e)}
											onKeyUp={e => handleKey(user.id, "pn", e)}
											onBlur={e => handleBlur(user.id, "pn", e)}
											onChange={e => handleChange(user.id, "pn", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data.wt}
											onKeyDown={e => handleKey(user.id, "wt", e)}
											onKeyUp={e => handleKey(user.id, "wt", e)}
											onBlur={e => handleBlur(user.id, "wt", e)}
											onChange={e => handleChange(user.id, "wt", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data.sr}
											onKeyDown={e => handleKey(user.id, "sr", e)}
											onKeyUp={e => handleKey(user.id, "sr", e)}
											onBlur={e => handleBlur(user.id, "sr", e)}
											onChange={e => handleChange(user.id, "sr", e)}
										/>
									</td>
									<td>
										<MDBInput
                                        value={data.cz}
											onKeyDown={e => handleKey(user.id, "cz", e)}
											onKeyUp={e => handleKey(user.id, "cz", e)}
											onBlur={e => handleBlur(user.id, "cz", e)}
											onChange={e => handleChange(user.id, "cz", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data.pt}
											onKeyDown={e => handleKey(user.id, "pt", e)}
											onKeyUp={e => handleKey(user.id, "pt", e)}
											onBlur={e => handleBlur(user.id, "pt", e)}
											onChange={e => handleChange(user.id, "pt", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data.sn}
											onKeyDown={e => handleKey(user.id, "sn", e)}
											onKeyUp={e => handleKey(user.id, "sn", e)}
											onBlur={e => handleBlur(user.id, "sn", e)}
											onChange={e => handleChange(user.id, "sn", e)}
										/>
									</td>
									<td>
										<MDBInput
											value={data.nd}
											onKeyDown={e => handleKey(user.id, "nd", e)}
											onKeyUp={e => handleKey(user.id, "nd", e)}
											onBlur={e => handleBlur(user.id, "nd", e)}
											onChange={e => handleChange(user.id, "nd", e)}
										/>
									</td>
									<td>
										<span
											className="form-control"
											style={{ background: "transparent", width: "100px" }}>
											{data[user.id] ? data[user.id].sum : ""}
										</span>
									</td>
								</tr>
						</MDBTableBody>
					</MDBTable>
				</TableDiv>
			</TablePack>
		</>
	);
};

// cos w stylu getDocs(query(usersCollection,  where("location_id", "==", ""), tu dodaj where na usera, tu dodaj where na tydzien))

// no i oczywiscie kolakcja Data
