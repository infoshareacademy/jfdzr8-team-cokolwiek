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

export const AdminHome = () => {
  const context = useContext(MenuContent);

  const TableDiv = styled.div`
    max-width: 600px;
  `;

  const Btns = styled.div`
    font-size: 14px;
    align-self: start;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const TablePack = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <>
      <h1>Admin Home</h1>
      <hr></hr>
      {context.location && <h2>selected location: {context.location.name}</h2>}
      <hr></hr>
      <TablePack>
        <TableDiv>
          <MDBTable>
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
                  <p>{user.name}</p>
                  <th>
                    <MDBInput />
                  </th>
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
      <Btns>
        <button
          style={{
            background: "yellowgreen",
            borderRadius: "20px",
            width: "200px",
            color: "black",
          }}
        >
          Accept
          <MDBIcon size="lg" className="ms-2" fas icon="check-circle" />
        </button>
      </Btns>
    </>
  );
};
