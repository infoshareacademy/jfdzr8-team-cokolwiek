import { useContext, useState } from "react";
import { MenuContent } from "./StateContainer";
import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import styled from "styled-components";
import { useEffect } from "react";
import { dataCollection, getDataByLocation } from "../firebase/utils/functions";
import { useRef } from "react";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TableDiv = styled.div`
`;

const Btns = styled.div`
  font-size: 14px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const TablePack = styled.div`

`;

const AdminHeader = styled.div`
position: absolute;
right: 0;
width: calc(100vw - 250px);
  height: 80px;
  .form-control {
    background: white;
  }
  h2 {
    margin-right: 20px;
    padding-top: 4px;
    font-size:24px;
    font-weight: 500;
  }
  padding: 40px;
  padding-top: 25px;
  button {
    position: absolute;
    right: 40px;
    width: 200px;
  }
  
`
const MyDiv = styled.div`
display: flex;
align-items: center;
margin-top: -2px;
padding: -0;

`
const AdminContent = styled.div`
position: absolute;
right: 0;
width: calc(100vw - 250px);
height: calc(100vh - 260px - 60px);
padding: 40px;
margin-top: 60px;
overflow-y: auto;
.i {
  font-size: 22px;
  text-align: center;
}
td {
  width: 10%;

}
td > span {
  width: 100%;
  display: block;
  text-align: center;

}
th {
  width: 10%;
  text-align: center;
}
.form-control {
  background: white;
  padding: 3px;
  text-align: center;
  max-width:100px;
  margin: 0 auto;
}
.form-outline {
  max-width:100px;
  margin: 0 auto;
}
`



const Wrapper = styled.div`
 
`
const currentWeek = function() {
  var options = { year: 'numeric' };
  var now = new Date();
  var onejan = new Date(now.getFullYear(), 0, 1);
  var w = Math.ceil((((now - onejan) / 86400000) + onejan.getDay() -1) / 7) 
  if (w < 10) w = '0'+w
  return now.toLocaleString("en-US",options)+"-W"+w;
}

const initData = (users) => {
  const newData = []
  users.map((user) => {
    newData[user.id] = {pn:0,wt:0,sr:0,czw:0,pt:0,sn:0,nd:0,sum:0,docId:0, isApproved: false}
  })
  return newData
}

export const AdminHome = () => {
const context = useContext(MenuContent);
const [reload,setReload] = useState(false)
const [data, setData] = useState([])
const [week, setWeek] = useState(currentWeek())
const weekInput = useRef(null)

useEffect(()=>{
  const d = initData(context.users)
  setData(d)

  const w = currentWeek()
  if (weekInput.current) weekInput.current.value = w == week ? w : week

  getDataByLocation(context.location.id,week).then(querySnapshot => {
    const dd = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const newData = []
    dd.map((d) => {
      newData[d.user_id] = {pn:d.pn,wt:d.wt,sr:d.sr,czw:d.czw,pt:d.pt,sn:d.sn,nd:d.nd,sum:d.pn+d.wt+d.sr+d.czw+d.pt+d.sn+d.nd,docId:d.id,isApproved:d.isApproved}
    })
    setData((d)=>{return {
      ...d,
      ...newData
    }})
  })
},[context.users,week,reload])

const handleChange = (id, day, e) => {
  const val = parseFloat(e.target.value) 
  const error = isNaN(val) || val < 0 
  let sum = data[id].sum
  if (!error) sum = data[id].pn*1 + data[id].wt*1 + data[id].sr*1 + data[id].czw*1 + data[id].pt*1 + data[id].sn*1 + data[id].nd*1
  setData((data)=>{
    return (
    {
      ...data, [id]: {...data[id], [day]: e.target.value, sum: sum} 
    })
  });
}

const handleKey = (id, day, e) => {
  let val = parseFloat(e.target.value) 
  let error = (isNaN(val) || val < 0) 
  const old_sum = data[id].sum
  const sum = data[id].pn*1 + data[id].wt*1 + data[id].sr*1 + data[id].czw*1 + data[id].pt*1 + data[id].sn*1 + data[id].nd*1
  if (e.target.value == '') {
    val = ''
    error = false
  } 
  setData((data)=>{
    return (
    {
      ...data, [id]: {...data[id], [day]: error ? 0: val, sum: isNaN(sum) ? old_sum : sum
      } 
    })
  });
}

const handleBlur = (id, day, e) => {
  if (e.target.value == '') 
  setData((data)=>{
    return (
    {
      ...data, [id]: {...data[id], [day]: 0
      } 
    })
  });
}

const saveData = (data) => {
  context.users.forEach((user)=>{
    //console.log("week:",week,"location:",context.location.id,"user id:",user.id,"data:",data[user.id])
    if (data[user.id].docId == 0) {
      addDoc(dataCollection, {
        isApproved: true,
        location_id: context.location.id,
        week: week,
        user_id: user.id,
        pn: data[user.id].pn,
        wt: data[user.id].wt,
        sr: data[user.id].sr,
        czw: data[user.id].czw,
        pt: data[user.id].pt,
        sn: data[user.id].sn,
        nd: data[user.id].nd,
      });
    } else {
      updateDoc(doc(db, "Data", data[user.id].docId), {
        isApproved: true,
        location_id: context.location.id,
        week: week,
        user_id: user.id,
        pn: data[user.id].pn,
        wt: data[user.id].wt,
        sr: data[user.id].sr,
        czw: data[user.id].czw,
        pt: data[user.id].pt,
        sn: data[user.id].sn,
        nd: data[user.id].nd,
      });
    }
  })
  setReload(reload=> !reload)
}

  return (
    <Wrapper>
      {context.location && <>
        <AdminHeader>
          <MyDiv >
          <h2>{context.location.name}</h2> {context.users.length > 0 && <><MDBInput type="week" onChange={(e)=>{
            setWeek(e.target.value)
          }} 
          ref={weekInput}></MDBInput>
          <Btns>
        <button onClick={()=>saveData(data)}
          style={{
            background: "yellowgreen",
            color: "black"
          }} className="btn primary"
        >
          Approve
          <MDBIcon size="lg" className="ms-2" fas icon="check-circle" />
        </button>
      </Btns></>}
      </MyDiv>
      <hr style={{width:"100%"}}></hr>
          </AdminHeader>
           
      <AdminContent> 
      
      {!context.users.length ? <h2>No data to display</h2> :    
      <TablePack>
        <TableDiv>
          <MDBTable hover responsive className="table-sm">
            <MDBTableHead dark >
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
                <th scope="col">Approved</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
              {context.users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span>{user.name + ' ' +  user.lastName}</span>
                  </td>
                  <td>
                    <MDBInput value={data[user.id] ? data[user.id].pn : ''} 
                    onKeyDown={(e)=>handleKey(user.id,"pn",e)} 
                    onKeyUp={(e)=>handleKey(user.id,"pn",e)} 
                    onBlur={(e)=>handleBlur(user.id,"pn",e)} 
                    onChange={(e)=>handleChange(user.id,"pn",e)}/>
                  </td>
                  <td>
                  <MDBInput value={data[user.id] ? data[user.id].wt : ''} 
                    onKeyDown={(e)=>handleKey(user.id,"wt",e)} 
                    onKeyUp={(e)=>handleKey(user.id,"wt",e)} 
                    onBlur={(e)=>handleBlur(user.id,"wt",e)} 
                    onChange={(e)=>handleChange(user.id,"wt",e)}/>
                  </td>
                  <td>
                  <MDBInput value={data[user.id] ? data[user.id].sr : ''} 
                    onKeyDown={(e)=>handleKey(user.id,"sr",e)} 
                    onKeyUp={(e)=>handleKey(user.id,"sr",e)} 
                    onBlur={(e)=>handleBlur(user.id,"sr",e)} 
                    onChange={(e)=>handleChange(user.id,"sr",e)}/>
                  </td>
                  <td>
                  <MDBInput value={data[user.id] ? data[user.id].czw : ''} 
                    onKeyDown={(e)=>handleKey(user.id,"czw",e)} 
                    onKeyUp={(e)=>handleKey(user.id,"czw",e)} 
                    onBlur={(e)=>handleBlur(user.id,"czw",e)} 
                    onChange={(e)=>handleChange(user.id,"czw",e)}/>
                  </td>
                  <td>
                  <MDBInput value={data[user.id] ? data[user.id].pt : ''} 
                    onKeyDown={(e)=>handleKey(user.id,"pt",e)} 
                    onKeyUp={(e)=>handleKey(user.id,"pt",e)} 
                    onBlur={(e)=>handleBlur(user.id,"pt",e)} 
                    onChange={(e)=>handleChange(user.id,"pt",e)}/>
                  </td>
                  <td>
                  <MDBInput value={data[user.id] ? data[user.id].sn : ''} 
                    onKeyDown={(e)=>handleKey(user.id,"sn",e)} 
                    onKeyUp={(e)=>handleKey(user.id,"sn",e)} 
                    onBlur={(e)=>handleBlur(user.id,"sn",e)} 
                    onChange={(e)=>handleChange(user.id,"sn",e)}/>
                  </td>
                  <td>
                  <MDBInput value={data[user.id] ? data[user.id].nd : ''} 
                    onKeyDown={(e)=>handleKey(user.id,"nd",e)} 
                    onKeyUp={(e)=>handleKey(user.id,"nd",e)} 
                    onBlur={(e)=>handleBlur(user.id,"nd",e)} 
                    onChange={(e)=>handleChange(user.id,"nd",e)}/>
                  </td>
                  <td><span className="form-control" style={{background: "transparent"}}>{data[user.id] ? data[user.id].sum : ''}</span></td>
                  <td className="i">{data[user.id]?.isApproved ? <i className="fas fa-check-circle"></i>  : <i className="fas fa-times-circle"></i> }</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </TableDiv>
      </TablePack>
      }
      </AdminContent>  
     </> }      
      </Wrapper>);
};
