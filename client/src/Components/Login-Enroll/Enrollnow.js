import React, { useEffect, useState } from "react";
import logoimg from "../photos/register-img.png";
import "../Login-Enroll/Enrollnow.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import enroll from "../../image/EnrollNow.webp";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cogoToast from "cogo-toast";

const Enrollnow = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    cpassword: "",
    country: "",
    state: "",
    address: "",
    dob: "",
    refferelCode: "",
  });

  const handleBirthCertificateChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      // Update the state with the selected file
      setProfilePicture(selectedFile);
    }
  };
  console.log(profilePicture);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Use spread syntax to update only the changed field
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  console.log(data);

  const register = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append user.data fields to formData
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append("profilePicture", profilePicture);
    console.log(data, profilePicture);

    try {
      const response = await axios.post(
        "https://bigbulls.co.in/api/v1/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        cogoToast.success("Registration successful!");
        navigate("/login");
      } else {
        cogoToast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      cogoToast.error(error.response?.data || "An Error occured");
    }
  };

  return (
    <>
      <Container>
        <div>{/* <img src={enroll} alt="about" /> */}</div>
        <div className="marginseter">
          <form onSubmit={register} enctype="multipart/form-data">
            <div className="outer-enrollnow-container">
              <div className="enrollnow-container">
                <div className="enrollnow-left">
                  <img src={logoimg} alt="user" />
                </div>

                <div className="enrollnow-right">
                  <h1>Register to Bigbulls</h1>
                  <br />

                  <div className="sub">
                    <div className="row g-3">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label for="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={handleInputChange}
                          placeholder="Enter your Full Name"
                        />
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label for="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={handleInputChange}
                          placeholder="xyz@gmail.com"
                        />
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label>Enter Mobile number</label>
                        <input
                          type="number"
                          name="phone"
                          value={data.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your 10 digit Mobile phone"
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label>Gender</label>
                        <select
                          id="gender"
                          name="gender"
                          value={data.gender}
                          onChange={handleInputChange}
                          className="inputsel"
                        >
                          <option value="">Select an Option</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="other">ohter</option>
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label>Create password</label>
                        <input
                          name="password"
                          value={data.password}
                          onChange={handleInputChange}
                          className="inputsel"
                          type="password"
                          placeholder="Enter Password"
                          id="password"
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label>Confirm password</label>
                        <input
                          type="password"
                          name="cpassword"
                          placeholder="Enter Password"
                          id="cpassword"
                          value={data.cpassword}
                          className="inputsel"
                          onChange={handleInputChange}
                        />
                        <span id="message"></span>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label for="country">
                          Choose your country from the list:
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={data.country}
                          onChange={handleInputChange}
                          className="inputsel"
                        >
                          <option value="">Select an Option</option>
                          <option value="India">India</option>
                          <option value="Australia">Australia</option>
                          <option value="UAE">UAE</option>
                          <option value="USA">USA</option>
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label for="state">
                          Choose your state from the list:
                        </label>
                        <select
                          id="state"
                          name="state"
                          value={data.state}
                          onChange={handleInputChange}
                          className="inputsel"
                        >
                          <option value="">Select an Option</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="UP">UP</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Assam">Assam</option>
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label>Enter Address</label>
                        <input
                          type="text"
                          name="address"
                          value={data.address}
                          onChange={handleInputChange}
                          placeholder="Enter your address"
                        />
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <label for="dateInput">Enter Date of Birth:</label>
                        <div class="input-group">
                          <DatePicker
                            selected={data.dob}
                            onChange={(date) => handleDateChange(date)}
                            className="form-control inputsel"
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Enter Date of Birth"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <label for="profilePicture">Upload Profile Picture</label>
                      <input
                        type="file"
                        name="profilePicture"
                        accept=".pdf, .jpg, .jpeg, .png"
                        onChange={handleBirthCertificateChange}
                      />
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <label for="refferelCode">Add Referrel Code</label>
                      <input
                        name="refferelCode"
                        value={data.refferelCode}
                        onChange={handleInputChange}
                        placeholder="Enter Referral Code"
                        type="text"
                      />
                    </div>
                  </div>
                  <br />
                  <button className="submitbtn" type="submit">
                    submit
                  </button>

                  <hr className="light-grey-hr" />
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <ToastContainer />
      </Container>
    </>
  );
};

export default Enrollnow;
const Container = styled.div`
  .inputsel {
    width: 100%;
  }

  input {
    width: 100%;
  }
  .marginseter {
    margin-top: 4rem;
    margin-bottom: 4rem;
    @media screen and (max-width: 500px) {
      margin-top: 8rem;
      margin-bottom: 8rem;
    }
  }
`;