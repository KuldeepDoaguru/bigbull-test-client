import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

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
      <div className="recentpurchases-outer">
        <Navbar />
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
          <button
            className="btn btn-info handlesearchbtn"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* <div>
          {showResults && (
            <div className="searchDiv">
              <h2>Search Results:</h2>
              <ul>
                {showResults.map((result, index) => (
                  <li key={index}>{result.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div> */}
        <div className="table">
          <div className="table-head">
            <p className="table-sno" style={{ width: "10%" }}>
              Sno.
            </p>
            <p className="table-small" style={{ width: "15%" }}>
              Name
            </p>
            <p className="table-smail" style={{ width: "35%" }}>
              Email
            </p>
            <p className="table-small text-center" style={{ width: "15%" }}>
              Gender
            </p>
            <p className="table-small" style={{ width: "15%" }}>
              Phone
            </p>
            <p className="table-btn">Delete</p>
            <p className="table-btn">Edit</p>
          </div>
          <div className="table-body">
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
                  <div className="table-row" key={e.id}>
                    <p className="table-sno" style={{ width: "10%" }}>
                      {i + 1}
                    </p>
                    <p className="table-small" style={{ width: "15%" }}>
                      {e.name}
                    </p>
                    <p className="table-smail" style={{ width: "35%" }}>
                      {e.email}
                    </p>
                    <p
                      className="table-small text-center"
                      style={{ width: "15%" }}
                    >
                      {e.gender}
                    </p>
                    <p className="table-small" style={{ width: "15%" }}>
                      {e.phone}
                    </p>
                    <p
                      className="table-btn"
                      style={{ color: "black" }}
                      onClick={() => deleteUser(e.id)}
                    >
                      Delete
                    </p>
                    <Link
                      to={`/edituserdetails/${e.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <p className="table-btn">Edit</p>
                    </Link>
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

export default Manageusers;
