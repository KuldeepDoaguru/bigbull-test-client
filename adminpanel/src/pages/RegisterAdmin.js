import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { MdEmail, MdPassword } from "react-icons/md";
import cogoToast from "cogo-toast";

const RegisterAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const adminRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:6060/api/v1/auth/AdminRegister",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      cogoToast.success("Admin Registered Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <div className="mainbox p-5 vh-100">
          <div className="container">
            <div className="container mangocont">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <h1 class="text-center h1 fw-bold mx-1 mx-md-4 mt-4 galleryhead">
                    Admin Register
                  </h1>

                  <form onSubmit={adminRegister} class="mx-1 mx-md-4 mt-5">
                    <div class="d-flex flex-row align-items-center">
                      {/* <MdEmail className="icon-cont" /> */}
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="email"
                          class="form-control"
                          placeholder="Enter your email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                        <label class="form-label text-start" for="email">
                          Your Email
                        </label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-2">
                      {/* <MdPassword className="icon-cont" /> */}
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="pass"
                          class="form-control"
                          name="password"
                          placeholder="Enter your password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          required
                        />
                        <label class="form-label" for="form3Example4c">
                          Password
                        </label>
                      </div>
                    </div>

                    <div class="d-flex justify-content-start">
                      <button type="submit" class="btn btn-primary btn-lg">
                        Register
                      </button>
                    </div>
                    <p className="text-start">
                      Already have an Admin Account ?{" "}
                      <Link to="/login">Login</Link>
                    </p>
                  </form>
                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid"
                    alt="Sample"
                    style={{ boxShadow: "1px 10px 60px #e0d2d2" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RegisterAdmin;
const Container = styled.div`
  .mainbox {
    background-color: #78d3e9;
  }
  .imgadminreg {
  }

  h1 {
    font-size: 3rem;
    color: grey;
    font-weight: bold;
  }

  .formcont {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mangocont {
    height: 15rem !important;
    width: 100%;
  }
  a {
    color: grey;
    font-weight: bold;
  }
`;
