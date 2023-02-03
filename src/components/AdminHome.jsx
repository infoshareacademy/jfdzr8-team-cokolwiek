import { useContext } from "react";
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

const TableDiv = styled.div`
`;

const Btns = styled.div`
  font-size: 14px;
  align-self: start;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
`;

const TablePack = styled.div`

`;

const AdminHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  h2 {
    margin-right: 20px;
    font-size: 44px;
    font-weight: 700;
  }
`
const AdminContent = styled.div`

`

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  width: calc(100vw - 250px);
  height: calc(100vh - 260px);
  padding: 40px;
  overflow-y: scroll;


`

export const AdminHome = () => {
  const context = useContext(MenuContent);



  return (
    <Wrapper>
      {context.location && <>
        <AdminHeader>
          <h2>{context.location.name}</h2> {context.users.length > 0 && <><MDBInput type="week"></MDBInput>
          <Btns>
        <button
          style={{
            background: "yellowgreen",
            borderRadius: "20px",
            width: "200px",
            color: "black"
          }}
        >
          Accept
          <MDBIcon size="lg" className="ms-2" fas icon="check-circle" />
        </button>
      </Btns></>}
      <hr></hr>
          </AdminHeader>
          <hr/>
            
      <AdminContent> 
      {!context.users.length ? <h2>No data to display</h2> :    
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
              {context.users.map((user) => (
                <tr key={user.id}>
                  <td>
                  {user.name + ' ' + user.lastName}
                  </td>
                  <td>
                    <MDBInput value={0}/>
                  </td>
                  <td>
                    <MDBInput />
                  </td>
                  <td>
                    <MDBInput />
                  </td>
                  <td>
                    <MDBInput />
                  </td>
                  <td>
                    <MDBInput />
                  </td>
                  <td>
                    <MDBInput />
                  </td>
                  <td>
                    <MDBInput />
                  </td>
                  <td>suma</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </TableDiv>
      </TablePack>
      }
      </AdminContent>  
      </>}
      </Wrapper>
  );
};
