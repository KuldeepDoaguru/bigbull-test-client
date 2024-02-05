import React, { useState } from "react";
import contactpic from "../photos/contactuspic.png";
import axios from "axios";
import Fp2 from "./Fp2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";

const Fp = () => {
  const [email, setEmail] = useState("");
  const [fpForm, showForm] = useState(true);
  const navigate = useNavigate();
  console.log(fpForm);
  const sendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bigbulls.co.in/api/v1/auth/sendOtp",
        { email }
      );

      console.log(response);
      cogoToast.success("OTP sent successfully");
      // navigate("/newpassword");
      showForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="contact-outer pt-5">
        {fpForm ? (
          <div className="contact-inner mt-3">
            <p className="fw-bold text-center">Forgot Password</p>
            <div className="container mt-5">
              <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  {" "}
                  <img src={contactpic} />
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <form onSubmit={sendCode}>
                    <p className="fw-bold text-start">Verify Yourself</p>
                    <input
                      type="email"
                      name="email"
                      id="username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="border p-2 rounded"
                    />
                    <br />
                    <button className="btn btn-info mt-2" type="submit">
                      Send Code
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Fp2 email={email} />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Fp;
