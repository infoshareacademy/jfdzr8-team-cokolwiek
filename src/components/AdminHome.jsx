import { useContext } from "react";
import { MenuContent } from "./StateContainer";
import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
} from "mdb-react-ui-kit";
import styled from "styled-components";

export const AdminHome = () => {
  const context = useContext(MenuContent);

  const TableDiv = styled.div`
    max-width: 600px;
  `;

  return (
    <>
      <h1>Admin Home</h1>
      <hr></hr>
      {context.location && <h2>selected location: {context.location.name}</h2>}
      <hr></hr>
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
            <tr>
              <th scope="row">Tim Cook</th>
              <th scope="row">
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
              <td>Suma</td>
            </tr>
            <tr>
              <th scope="row">Steve Jobs</th>
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
              <td>
                <MDBInput />
              </td>
              <td>Suma</td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </TableDiv>
    </>
  );
};
