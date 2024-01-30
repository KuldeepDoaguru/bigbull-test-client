import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../Navbar";
import "./Contact.css";

const Contact = () => {
  const [contactus, setcontactus] = useState([]);

  const getContact = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6060/api/v1/auth/contactInquiry"
      );
      console.log(response.data.result);
      setcontactus(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <div className="recentpurchases-outer">
        <Navbar />
        <div className="head-main">Contact Requests</div>
        <div className="searchbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input placeholder="Search by username or coursename or date" />
        </div>
        <div className="table">
          <div className="table-head">
            <p className="table-sno">Sno.</p>
            <p className="table-small">Name</p>
            <p className="table-small">Email ID</p>
            <p className="table-small">Mobile</p>
            <p className="table-small">Message</p>
            <p className="table-small">Time</p>
          </div>
          <div className="table-body">
            {contactus.map((e, i) => {
              return (
                <div className="table-row">
                  <p className="table-sno">{i + 1}</p>
                  <p className="table-small">{e.name}</p>
                  <p className="table-small">{e.email}</p>
                  <p className="table-small">{e.mobile}</p>
                  <p className="table-small">{e.message}</p>
                  <p className="table-small">
                    {e.time.toString().split("T")[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Contact;
