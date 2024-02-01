import React, { useEffect, useState } from "react";
import "../../Recentpurchases/RecentPurchases.css";
import Navbar from "../../Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaExternalLinkAlt } from "react-icons/fa";

const Managecourses = () => {
  const [allCourses, setallCourses] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [newdata, setnewdata] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const getCourse = async () => {
    try {
      const res = await axios.get(
        "https://admin.bigbulls.co.in/api/v1/auth/getAllCourses"
      );
      console.log(res.data.result);
      setallCourses(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  const deleteCourse = async (id) => {
    try {
      const res = await axios.delete(
        `https://admin.bigbulls.co.in/api/v1/auth/deleteCourse/${id}`
      );
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    const matchingCourses = allCourses.filter((course) => {
      return course.name.toLowerCase().includes(keyword.toLowerCase());
    });

    console.log(matchingCourses);
    setShowResults(matchingCourses);
  };

  console.log(showResults);
  console.log(searchResults);

  console.log(allCourses);

  return (
    <>
      <Container>
        <div className="recentpurchases-outer">
          <Navbar />
          <div className="head-main">Manage Courses</div>
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
              placeholder="Search any course by course name"
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

          <div>
            {showResults && (
              <div className="searchDiv">
                <h2>Search Results:</h2>
                <ul>
                  {showResults.map((result, index) => (
                    <li key={index}>
                      <a
                        href={`http://localhost:5500/course-details/${result._id}`}
                        target="_blank"
                      >
                        {result.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="table">
            <div className="table-head">
              <p className="table-sno">Course Name</p>
              <p className="table-small">Course Category</p>
              <p className="table-email">Courses Price</p>
              <p className="table-btn">Delete</p>

              <p className="table-btn">Edit</p>
            </div>
            <div className="table-body">
              {allCourses
                ?.filter((val) => {
                  if (keyword === "") {
                    return true;
                  } else if (
                    val.course_name.toLowerCase().includes(keyword) ||
                    val.course_name.toLowerCase().includes(keyword)
                  ) {
                    return val;
                  }
                })
                .map((item, index) => (
                  <>
                    <div className="table-row" key={index}>
                      <p className="table-small">
                        <Link to={`/course-details/${item.course_id}`}>
                          <span>
                            <FaExternalLinkAlt />
                          </span>
                          {item.course_name}
                        </Link>
                      </p>
                      <p className="table-small">{item.category}</p>
                      <p className="table-email">{item.price}</p>
                      <p
                        className="table-btn"
                        style={{ color: "black" }}
                        onClick={() => deleteCourse(item.course_id)}
                      >
                        Delete
                      </p>
                      <Link
                        to={`/editcourse/${item.course_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <p className="table-btn">Edit</p>
                      </Link>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Managecourses;
const Container = styled.div`
  .table-row {
    border-radius: 5px;
  }

  .table-sno {
    width: 10rem;
    a {
      text-decoration: none;
      color: #22a6b3;
    }
  }
  .handlesearchbtn {
    border: none;
    background: transparent;
    padding: 0.5rem;
    border-radius: 5px;
    &:hover {
      background-color: #dff9fb;
    }
  }
`;
