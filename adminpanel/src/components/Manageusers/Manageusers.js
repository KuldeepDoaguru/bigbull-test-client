import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Manageusers = () => {
  const [userdetails, setuserDeatils] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [newdata, setnewdata] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://admin.bigbulls.co.in/api/v1/auth/usersList"
      );
      console.log(response.data);
      setuserDeatils(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = () => {
    if (keyword.trim() === "") {
      setShowResults(false);
    } else {
      const matchingUsers = userdetails.filter((user) => {
        return user.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setShowResults(matchingUsers);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://admin.bigbulls.co.in/api/v1/auth/deleteUser/${id}`
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userdetails);
  return (
    <>
      <Container>
        <Navbar />
        <div className="container">
          <div className="head-main">Manage Users</div>
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
            <input
              placeholder="Search any course by title or user name"
              value={keyword}
              onChange={(e) => setkeyword(e.target.value.toLowerCase())}
              type="text"
            />
          </div>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead className="table-head">
                <tr>
                  <th>Sno.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {userdetails
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
                        <td>{i + 1}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.gender}</td>
                        <td>{e.phone}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteUser(e.id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <Link
                            to={`/edituserdetails/${e.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <button className="btn btn-info">Edit</button>
                          </Link>
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

export default Manageusers;
const Container = styled.div`
  .table-head {
    background-color: #583b04;
    color: white;
  }
`;
