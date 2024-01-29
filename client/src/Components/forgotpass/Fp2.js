import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import contactpic from "../photos/contactuspic.png";
import cogoToast from "cogo-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <div className="contact-outer">
        <div className="contact-inner pt-5">
          <p>Forgot Password</p>
          <div className="contact-innermost">
            <img src={contactpic} />
            <form>
              <p>Reset Password</p>
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
              />

              <input
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter Verification Code"
                type={"text"}
              />

              <button onClick={changePassword} style={{ width: "200px" }}>
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Fp2;
