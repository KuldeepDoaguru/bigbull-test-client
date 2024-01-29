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
      //   navigate("/newpassword");
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
            <p>Forgot Password</p>
            <div className="contact-innermost">
              <img src={contactpic} />

              <form onSubmit={sendCode}>
                <p>Verify Yourself</p>
                <input
                  type="email"
                  name="email"
                  id="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <button type="submit">Send Code</button>
              </form>
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
