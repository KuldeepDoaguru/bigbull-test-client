import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [resetPasswordPopupVisible, setResetPasswordPopupVisible] =
    useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const closeUpdatePopup = () => {
    setPopupVisible(false);
  };

  const closeResetPasswordPopup = () => {
    setResetPasswordPopupVisible(false);
  };

  const sentOtpResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://admin.bigbulls.co.in/api/v1/auth/sendOtp",
        {
          email,
        }
      );
      console.log(response);
      setPopupVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOtpAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://admin.bigbulls.co.in/api/v1/auth/verifyOtp",
        {
          email,
          otp,
        }
      );
      console.log(response);
      setPopupVisible(false);
      setResetPasswordPopupVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://admin.bigbulls.co.in/api/v1/auth/updateAdminPassword",
        {
          email,
          password,
        }
      );
      console.log(response);
      setResetPasswordPopupVisible(false);
      navigate("/login");
      cogoToast.success("password reset successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <div className="mainforgot">
          {!popupVisible && !resetPasswordPopupVisible ? (
            <div className="container box-cont rounded shadow">
              <h1 className="fw-bold text-center">Reset Password</h1>
              <form className="mt-3" onSubmit={sentOtpResetPassword}>
                <div className="input-group mb-2 d-flex justify-content-between">
                  <label htmlFor="email">Email : </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    className="rounded p-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-center">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="d-flex justify-content-evenly flex-column boxm rounded shadow">
              <label htmlFor="otp" className="fw-bold">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="mb-3 rounded p-1"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-success mt-2 mb-2"
                onClick={verifyOtpAdmin}
              >
                Verify OTP
              </button>
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={closeUpdatePopup}
              >
                Cancel
              </button>
            </div>
          )}

          {resetPasswordPopupVisible && !popupVisible && (
            <div className="d-flex justify-content-evenly flex-column boxm rounded shadow">
              <label htmlFor="password" className="fw-bold">
                Enter New Password
              </label>
              <input
                type="password"
                placeholder="Enter New Password"
                className="mb-3 rounded p-1"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-success mt-2 mb-2"
                onClick={resetPassword}
              >
                Reset Password
              </button>
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={closeResetPasswordPopup}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;

const Container = styled.div`
  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
    z-index: 1;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .mainforgot {
    height: 100vh;
    justify-content: center;
    background: linear-gradient(to right, #4ac29a, #bdfff3);
    align-items: center;
    display: flex;
    .box-cont {
      width: 25rem;
      height: auto;
      background-color: #00a8ff;
      padding: 2rem;

      h1 {
        font-size: 2rem;
      }
    }
  }
  input {
    width: 70%;
  }
  .boxm {
    background-color: #00a8ff;
    padding: 2rem;
    input {
      width: 100%;
    }
  }
`;
