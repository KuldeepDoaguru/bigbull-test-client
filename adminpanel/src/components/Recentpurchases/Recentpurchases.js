import React, { useEffect, useState } from "react";
import "./RecentPurchases.css";
import axios from "axios";
import styled from "styled-components";

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
    <>
      <Container>
        <div className="container">
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
              placeholder="Search by username or course name or date"
              value={keyword}
              onChange={(e) => setkeyword(e.target.value.toLowerCase())}
            />
          </div>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead className="table-head">
                <tr>
                  <th>SN</th>
                  <th>username</th>
                  <th>Course ID's</th>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
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
                    <tr className="table-row" key={i}>
                      <td className="table-sno">{i + 1}</td>
                      <td className="table-user">
                        {invoicedetails.student_name}
                      </td>
                      <td className="table-small">
                        {invoicedetails.course_id}
                      </td>
                      <td className="table-user">{invoicedetails.rzrpay_id}</td>
                      <td className="table-small">{invoicedetails.amount}</td>
                      <td className="table-date">
                        {invoicedetails.purchase_time.toString().split("T")[0]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Recentpurchases;
const Container = styled.div`
  width: 100%;
  .table-sno {
    width: 10%;
    @media screen and (max-width: 500px) {
      width: 10%;
    }
  }

  .table-user {
    width: 20%;
    margin-left: 1rem;
    @media screen and (max-width: 500px) {
      width: 50%;
    }
  }

  .table-small {
    width: 15%;
    margin-left: 1rem;
    @media screen and (max-width: 500px) {
      width: 50% !important;
    }
  }

  .table-date {
    width: 20%;
    @media screen and (max-width: 500px) {
      width: 50% !important;
    }
  }

  .table {
    width: 100%;
    @media screen and (max-width: 500px) {
      width: 100%;
    }
  }

  .table-head {
    background-color: #583b04;
    color: white;
  }
`;
