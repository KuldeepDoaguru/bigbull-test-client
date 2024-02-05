import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logoimg from "../photos/register-img.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";

const UpdateProfile = () => {
  const user = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState("tab2");
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  const navigate = useNavigate();
  console.log("User State:", user);
  const [data, setData] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    address: "",
    dob: "",
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
    setUpdateData({
      ...updateData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setUpdateData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/getUserViaId/${user.id}`
      );
      console.log(response);
      setData(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const countryToStatesMap = {
    India: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
    Australia: [
      "New South Wales",
      "Queensland",
      "Victoria",
      "Western Australia",
    ],
    UAE: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman"],
    USA: ["California", "New York", "Texas", "Florida"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    UK: ["England", "Scotland", "Wales", "Northern Ireland"],
    Germany: ["Berlin", "Bavaria", "Hamburg", "North Rhine-Westphalia"],
    Japan: ["Tokyo", "Osaka", "Hokkaido", "Kyoto"],
    Brazil: ["Sao Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia"],
    China: ["Beijing", "Shanghai", "Guangdong", "Zhejiang"],
    SouthAfrica: ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape"],
    // Add more countries and states as needed
  };

  const allCountries = Object.keys(countryToStatesMap);

  const updateUsersDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append user.data fields to formData
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append("profilePicture", profilePicture);
    console.log(updateData, profilePicture);
    try {
      const response = await axios.put(
        `https://bigbulls.co.in/api/v1/auth/update-users/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      cogoToast.success("Details updated successfully!");
      navigate("/public-view-profile");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data.profile_picture);
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      <Container>
        <div className="d">
          <h2 className="text-center">Update Profile</h2>
          <hr />
        </div>
        <div className="container">
          <form onSubmit={updateUsersDetails} enctype="multipart/form-data">
            <div className="outer-enrollnow-container">
              <div className="enrollnow-container">
                {/* <div className="enrollnow-left">
                  <img src={logoimg} alt="user" />
                </div> */}

                <div className="enrollnow-right">
                  {/* <h1>Register to Bigbulls</h1> */}
                  <br />

                  <div className="sub">
                    <div className="row g-3">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label for="name">
                            Name<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={updateData.name}
                            onChange={handleInputChange}
                            placeholder={data.name}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label for="email">
                            Email<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={updateData.email}
                            onChange={handleInputChange}
                            placeholder={data.email}
                          />
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label>
                            Enter Mobile number
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={updateData.phone}
                            maxLength={10}
                            onChange={handleInputChange}
                            placeholder={data.phone}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label>
                            Gender<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            value={updateData.gender}
                            onChange={handleInputChange}
                            className="inputsel"
                          >
                            <option value="">{data.gender}</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="other">ohter</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label htmlFor="country">
                            Choose your country from the list
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={updateData.country}
                            onChange={handleInputChange}
                            className="inputsel"
                          >
                            <option value="">{data.country}</option>
                            {allCountries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label htmlFor="state">
                            Choose your state from the list
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="state"
                            name="state"
                            value={updateData.state}
                            onChange={handleInputChange}
                            className="inputsel"
                            // disabled={!data.country}
                          >
                            <option value="">{data.state}</option>
                            {updateData.country &&
                              countryToStatesMap[updateData.country].map(
                                (state) => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                )
                              )}
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label>
                            Enter City<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={updateData.city}
                            onChange={handleInputChange}
                            placeholder={data.city}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label>
                            Enter Address<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={updateData.address}
                            onChange={handleInputChange}
                            placeholder={data.address}
                          />
                        </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label for="dateInput">
                            Enter Date of Birth
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <div class="input-group">
                            {/* <DatePicker
                            selected={data.dob}
                            onChange={(date) => handleDateChange(date)}
                            className="form-control inputsel"
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Enter Date of Birth"
                          /> */}

                            <DatePicker
                              selected={updateData.dob}
                              onChange={(date) => handleDateChange(date)}
                              className="form-control"
                              dateFormat="yyyy-MM-dd"
                              placeholderText="Select a date"
                              value={updateData.dob}
                              showMonthDropdown={true}
                              showYearDropdown={true}
                              scrollableYearDropdown={false}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="d-flex flex-column">
                          <label for="profilePicture">
                            Upload Profile Picture
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="file"
                            name="profilePicture"
                            accept=".pdf, .jpg, .jpeg, .png"
                            onChange={handleBirthCertificateChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />
                  <button className="submitbtn mb-2" type="submit">
                    submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default UpdateProfile;
const Container = styled.div`
  .w8 {
    width: 80%;
  }
`;
