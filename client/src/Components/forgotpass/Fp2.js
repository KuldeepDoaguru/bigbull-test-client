import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import contactpic from "../photos/contactuspic.png";
import cogoToast from "cogo-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Fp2 = (props) => {
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  console.log(props.email);

  const changePassword = async (e) => {
    const email = props.email;
    e.preventDefault();
    try {
      if (pwd === cpwd) {
        const response = await axios.post(
          "https://bigbulls.co.in/api/v1/auth/updatePassword",
          {
            email,
            password: pwd,
            cpassword: cpwd,
            otp: code,
          }
        );

        console.log(response);
        navigate("/login");
        window.location.reload();
        cogoToast.success("password update successfully");
      } else {
        cogoToast.error("password and confirm password do not match");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <div className="contact-outer">
          <div className="contact-inner">
            <p className="fw-bold text-center fs-1">Reset Password</p>
            <div className="container mt-3">
              <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <img src={contactpic} />
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <form>
                    <p className="fw-bold">Reset Password</p>
                    <div className="inputgroup">
                      <input
                        name="pwd"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        id="pwd"
                        placeholder="New Password"
                        type={"password"}
                      />

                      <input
                        name="cpwd"
                        value={cpwd}
                        onChange={(e) => setCpwd(e.target.value)}
                        id="cpwd"
                        placeholder="Confirm Password"
                        type={"password"}
                        className="mt-2"
                      />

                      <input
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter Verification Code"
                        type={"text"}
                        className="mt-2"
                      />

                      <button
                        className="btn btn-info mt-2 mb-5"
                        onClick={changePassword}
                        style={{ width: "200px" }}
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Fp2;
const Container = styled.div`
  .inputgroup {
    display: flex;
    flex-direction: column;
    input {
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 0.5rem;
    }
  }
`;
