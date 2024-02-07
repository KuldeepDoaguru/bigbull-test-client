import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../Navbar";
import "./Contact.css";
import styled from "styled-components";

const Contact = () => {
  const [contactus, setcontactus] = useState([]);
  const [keyword, setkeyword] = useState("");

  const getContact = async () => {
    try {
      const response = await axios.get(
        "https://admin.bigbulls.co.in/api/v1/auth/contactInquiry"
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
      <Container>
        <Navbar />
        <div className="container">
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

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead className="table-head">
                <tr>
                  <th className="table-sno">Sno.</th>
                  <th className="table-small">Name</th>
                  <th className="table-small">Email ID</th>
                  <th className="table-small">Mobile</th>
                  <th className="table-small">Message</th>
                  <th className="table-small">Time</th>
                </tr>
              </thead>
              <tbody>
                {contactus
                  .filter((val) => {
                    if (keyword === "") {
                      return true;
                    } else if (
                      val.name.toLowerCase().includes(keyword) ||
                      val.name.toLowerCase().includes(keyword)
                    ) {
                      return val;
                    }
                  })
                  .map((e, i) => {
                    return (
                      <tr className="table-row" key={e.id}>
                        <td className="table-sno">{i + 1}</td>
                        <td className="table-small">{e.name}</td>
                        <td className="table-small">{e.email}</td>
                        <td className="table-small">{e.mobile}</td>
                        <td className="table-small">{e.message}</td>
                        <td className="table-small">
                          {e.time.toString().split("T")[0]}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Contact;
const Container = styled.div`
  .table-head {
    background-color: #583b04;
    color: white;
  }
`;
