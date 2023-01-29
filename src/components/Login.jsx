import { signInWithGoogle } from "../firebase/utils/functions";
import React from "react";
import styles from "./Login.module.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 40%;
`;

export const Login = () => {
  return (
    <Wrapper>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-light text-grey my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className=" shadow-strong p-5  d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Logowanie</h2>
                <p className="text-white-50 mb-3"></p>
                <p className="text-white-50 mb-5">
                  <MDBIcon color="black" size="3x" fas icon="fingerprint" />
                </p>

                <MDBBtn
                  className="mb-2 w-100"
                  size="lg"
                  onClick={signInWithGoogle}
                  style={{ backgroundColor: "#dd4b39" }}
                >
                  <MDBIcon fab icon="google" className="mx-2" />
                  Zaloguj kontem Google
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Wrapper>
  );
};
