import React, { useEffect, useState } from "react";
import "../Recentpurchases/RecentPurchases.css";
import Navbar from "../Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Leaderboard = () => {
  const [lbdetails, setlbDeatils] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [userLeader, setUsersLeader] = useState([]);
  const [allUser, setAllUser] = useState([]);

  const getLeaderBoardDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6060/api/v1/auth/LeaderBoardData"
      );
      console.log(response.data.result);
      setUsersLeader(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:6060/api/v1/auth/usersList"
      );
      console.log(response.data);
      setAllUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaderBoardDetails();
    getAllUsers();
  }, []);

  console.log(allUser);

  const filterData = userLeader.filter((item) =>
    allUser.map((user) => user.id).includes(item.student_id)
  );

  console.log(filterData);

  // Calculate total amount from the filtered data using reduce
  const totalAmount = filterData.reduce(
    (sum, item) => sum + parseInt(item.amount, 10),
    0
  );

  console.log("Total Amount:", totalAmount);

  return (
    <>
      <div className="recentpurchases-outer">
        <Navbar />
        <div className="head-main">Leaderboard</div>
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
            placeholder="Search by username or coursename or date"
            value={keyword}
            onChange={(e) => setkeyword(e.target.value.toLowerCase())}
          />
        </div>
        <div className="table">
          <div className="table-head">
            <p className="table-sno">Sno.</p>
            <p className="table-small">Email ID</p>
            <p className="table-small">User name</p>
            <p className="table-small">Total Amount</p>
          </div>
          <div className="table-body">
            {allUser
              .map((e, i) => {
                // Filter userLeader for the current user and calculate total amount
                const totalAmount = userLeader
                  .filter((item) => item.student_id === e.id)
                  .reduce((sum, item) => sum + parseInt(item.amount, 10), 0);

                return {
                  index: i,
                  email: e.email,
                  name: e.name,
                  totalAmount: totalAmount,
                };
              })
              .sort((a, b) => b.totalAmount - a.totalAmount) // Sort by totalAmount in descending order
              .map((user, i) => (
                <div className="table-row" key={user.index}>
                  <p className="table-sno">{i + 1}</p>
                  <p className="table-small">{user.email}</p>
                  <p className="table-small">{user.name}</p>
                  <p className="table-small">₹ {user.totalAmount}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Leaderboard;
