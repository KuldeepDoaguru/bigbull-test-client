import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditUserpage.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditUserpage = () => {
  const { uid } = useParams();
  let navigate = useNavigate();
  const [useractive, setUseractive] = useState();
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState({
    name: userData.name,
    phone: userData.phone || "",
    email: userData.email || "",
    gender: userData.gender || "",
    dob: userData.dob || "",
    country: userData.country || "",
    state: userData.state || "",
    city: userData.city || "",
    address: userData.address || "",
  });

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

  const getUserViaId = async () => {
    try {
      const response = await axios.get(
        `https://admin.bigbulls.co.in/api/v1/auth/getUserViaId/${uid}`
      );
      console.log(response.data);
      setUserData(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserViaId();
  }, [uid]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      if (data.dob !== "") {
        const modifiedDate = new Date(data.dob);
        modifiedDate.setDate(modifiedDate.getDate() + 1);
        console.log(modifiedDate);

        const response = await axios.put(
          `https://admin.bigbulls.co.in/api/v1/auth/users/${uid}`,
          {
            ...data,
            dob: modifiedDate.toISOString().split("T")[0],
          }
        );
        if (response.data.success) {
          toast.success("User details updated successfully");
        } else {
          toast.error("Failed to update user details");
        }
        console.log(response.data);
      } else {
        const response = await axios.put(
          `https://admin.bigbulls.co.in/api/v1/auth/users/${uid}`,
          data
        );
        if (response.data.success) {
          toast.success("User details updated successfully");
        } else {
          toast.error("Failed to update user details");
        }
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (date) => {
    console.log(date);
    setData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  const formattedDate = userData.dob
    ? userData.dob.toString().split("T")[0]
    : "";
  console.log(userData);
  console.log(data);

  console.log(formattedDate);

  return (
    <>
      <div className="user-profile">
        <Navbar />
        <div className="head-main">Edit / Delete User Data</div>
        <div className="userprofile-container">
          <form onSubmit={updateUserProfile}>
            <div className="content-half">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputs}
                placeholder={userData.name}
              />
            </div>

            <div className="content-half">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={handleInputs}
                placeholder={userData.phone}
                maxLength={10}
              />
            </div>

            <div className="content-half">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputs}
                placeholder={userData.email}
              />
            </div>
            <div className="content-half">
              <label>Gender</label>
              <select
                id="gender"
                name="gender"
                defaultValue={data.gender}
                onChange={handleInputs}
                placeholder={userData.gender}
              >
                <option disabled>{userData.gender}</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="content-half">
              <label>DOB</label>
              {/* <small>Current DOB : {userData.dob}</small> */}
              <DatePicker
                selected={data.dob}
                onChange={(date) => handleDateChange(date)}
                className="form-control"
                dateFormat="yyyy-MM-dd"
                placeholderText={formattedDate}
                // value={formattedDate}
                placeholder={formattedDate}
                showMonthDropdown={true}
                showYearDropdown={true}
                scrollableYearDropdown={false}
              />
            </div>
            <div className="content-half">
              <label>Select Country</label>
              <select
                id="country"
                name="country"
                value={data.country}
                onChange={handleInputs}
                placeholder={userData.country}
                className="inputsel"
              >
                <option value="">{userData.country}</option>
                {allCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="content-half">
              <label>Select State</label>
              <select
                id="state"
                name="state"
                value={data.state}
                onChange={handleInputs}
                placeholder={userData.state}
                className="inputsel"
                disabled={!data.country}
              >
                <option value="">{userData.state}</option>
                {data.country &&
                  countryToStatesMap[data.country].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>
            </div>
            <div className="content-half">
              <label>Enter City</label>
              <input
                name="city"
                value={data.city}
                onChange={handleInputs}
                placeholder={userData.city}
              />
            </div>
            <div className="contentfullwidth">
              <label>Address</label>
              <textarea
                name="address"
                defaultValue={data.address}
                onChange={handleInputs}
                placeholder={userData.address}
              />
            </div>

            <div className="btn-group">
              <button type="submit">Save Changes</button>
              {/* <button onClick={Deleteuser}>Delete User</button> */}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default EditUserpage;
