import React, { useEffect, useState } from "react";
import "./RecentPurchases.css";
import axios from "axios";

const Recentpurchases = () => {
  const [keyword, setkeyword] = useState("");
  const [data, setData] = useState([]);
  // console.log(data[0].updatedAt.split('T'))

  const getBoughtCourseData = async () => {
    try {
      const response = await axios.get(
        "https://admin.bigbulls.co.in/api/v1/auth/getBoughtCourseDetails"
      );
      console.log(response.data.result);
      setData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  console.log(data);

  useEffect(() => {
    getBoughtCourseData();
  }, []);
  return (
    <div className="recentpurchases-outer">
      <div className="head-main">Recent Purchases</div>
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
        {/* {data.map((kycdetails) => {

                })} */}
        <div className="table-head">
          <p className="table-sno">Sno.</p>
          <p className="table-small">username</p>
          <p className="table-small">Course ID's</p>
          <p className="table-small">Payment ID</p>
          <p className="table-small">Amount</p>
          <p className="table-small">Date</p>
        </div>
        <div className="table-body">
          {data
            .filter((val) => {
              if (keyword === "") {
                return true;
              } else if (
                val.student_name.toLowerCase().includes(keyword) ||
                val.student_name.toLowerCase().includes(keyword)
              ) {
                return val;
              }
            })
            .map((invoicedetails, i) => (
              // console.log(kycdetails.client_name)
              <div className="table-row" key={i}>
                <p className="table-sno">{i + 1}</p>
                <p className="table-small">{invoicedetails.student_name}</p>
                <p className="table-small">{invoicedetails.course_id}</p>
                <p className="table-small">{invoicedetails.rzrpay_id}</p>
                <p className="table-small">{invoicedetails.amount}</p>
                <p className="table-small">
                  {invoicedetails.purchase_time.toString().split("T")[0]}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Recentpurchases;
