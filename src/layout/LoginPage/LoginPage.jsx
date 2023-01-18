import styles from "../LoginPage/LoginPage.module.css";
import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [hidden, setHidden] = useState(true);
  let [emptyPassword, setEmptyPassword] = useState(true);

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  function mailInputValidation() {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      setHidden((hidden = true));
      return true;
    } else {
      setHidden((hidden = false));
      return false;
    }
  }

  function passwordInputValidation() {
    if (password === "") {
      setEmptyPassword((emptyPassword = false));
    } else {
      setEmptyPassword((emptyPassword = true));
    }
  }

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Logowanie</h2>
              <p className="text-white-50 mb-5">
                Wprowadź swój login oraz hasło
              </p>

              <MDBInput
                wrapperClass="mb-1 mx-5 w-100"
                labelClass="text-white"
                label="E-mail"
                id="emailInput"
                contrast
                type="email"
                size="lg"
                onChange={handleUpdateEmail}
              />
              {!hidden ? (
                <p className={styles.alert}>Błędny adres e-mail!</p>
              ) : null}
              <p className="small mb-3 pb-lg-2"></p>
              <MDBInput
                wrapperClass="mb-1 mx-5 w-100"
                labelClass="text-white"
                label="Hasło"
                id="passwordInput"
                contrast
                type="password"
                size="lg"
                onChange={handlePassword}
              />
              {!emptyPassword ? (
                <p className={styles.alert}>Wprowadź hasło!</p>
              ) : null}

              <p className="small mb-5 pb-lg-2"></p>
              <MDBBtn
                outline
                className="mx-2 px-5"
                color="light"
                rippleColor="light"
                size="lg"
                onClick={() => {
                  mailInputValidation();
                  passwordInputValidation();
                }}
              >
                Zaloguj się
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginPage;
