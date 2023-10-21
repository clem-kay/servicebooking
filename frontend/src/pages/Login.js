import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { API_URL } from "../shared";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const formData = {
    username: username,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(API_URL + "/auth/login", formData)
      .then((response) => {
        return response.data.data;
      })
      .then((data) => {
        localStorage.setItem("access", data.access_token);
        localStorage.setItem("refresh", data.refresh_token);
        localStorage.setItem("username", data.username);
        setUsername("");
        setPassword("");
        setShowError(false);
        setError("");
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response) {
          setShowError(true);
          setError("Sign In Failed : " + error.response.data.message);
          console.log(error);
        } else {
          setShowError(false);
          setError("");
        }
      });
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="4" className="d-none d-sm-block ps-5 pt-5"></MDBCol>
        <MDBCol sm="4">
          <div className="d-flex flex-row ps-5 pt-5 mt-5">
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: "#709085" }} />
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3
              className="fw-normal fw-bold mb-0 mx-5 ps-5" 
              style={{ letterSpacing: "1px" }}
            >
              Log in
            </h3>
            <p className="error-message ps-5 mb-4 mx-5 w-100"> {showError ? error : ""} </p>
            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="username"
                id="formControlLg"
                type="text"
                value={username}
                size="lg"
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn className="mb-4 px-5 mx-5 w-100" color="info" size="lg">
                Login
              </MDBBtn>
            </form>
          </div>
        </MDBCol>

        <MDBCol sm="4" className="d-none d-sm-block ps-5 pt-5"></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
