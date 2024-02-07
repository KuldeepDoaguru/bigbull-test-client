import React, { useEffect, useState } from "react";
import "./Courses.css";
import Card3 from "../Cards/Card3.js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card1 from "../Cards/Card1";
import styled from "styled-components";
import coursebanner from "../../image/coursebannertone.webp";
import { BsSuitHeartFill, BsSuitHeart, BsCart3, BsBell } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  height: 100vh;
`;

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [allCourses, setallCourses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showAllCourses, setShowAllCourses] = useState(true);
  const [images, setImages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const user = useSelector((state) => state.user);
  const [wishlistItem, setWishlistItem] = useState({});
  const [cartItem, setCartItem] = useState({});
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const responseCourse = async () => {
    try {
      const res = await axios.get(
        "https://bigbulls.co.in/api/v1/auth/getAllCourses"
      );
      console.log(res.data);
      setallCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    responseCourse();
  }, []);

  const handleSearch = () => {
    console.log(keyword);
    const keywordLower = keyword.toLowerCase();
    console.log(allCourses);

    const matchingCourses = allCourses.filter((course) => {
      const nameMatch =
        course.name && course.name.toLowerCase().includes(keywordLower);
      const creatorMatch =
        course.creatorName &&
        course.creatorName.toLowerCase().includes(keywordLower);

      return nameMatch || creatorMatch;
    });
    setSearchResults(matchingCourses);
    setShowResults(true);
    console.log();
  };

  const handleClearSearch = () => {
    setKeyword(""); // Clear the search input
    setShowResults(false); // Show all courses again
  };

  console.log(showResults);

  console.log(allCourses);

  const addWishlist = async (id) => {
    console.log(id);
    console.log(user.id);
    try {
      const response = await axios.post(
        `https://bigbulls.co.in/api/v1/auth/addToWishlist/${user.id}/${id}`
      );

      console.log(response);
      cogoToast.success("Course addded to the wishlist");
      window.location.reload();
    } catch (error) {
      console.log(error.response.data);
      cogoToast.error(error.response.data);
    }
  };

  const displayWishlistItem = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/getWishlistItems/${user.id}`
      );
      console.log(response.data);
      setWishlistItem(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allCourses);

  useEffect(() => {
    displayWishlistItem();
  }, []);

  const addCartTo = async (id) => {
    try {
      const response = await axios.post(
        `https://bigbulls.co.in/api/v1/auth/add-to-cart`,
        {
          userId: user.id,
          itemId: id,
        }
      );

      console.log(response);
      cogoToast.success("Course addded to the cart");
    } catch (error) {
      console.log(error.response.data);
      cogoToast.error(error.response.data);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCourses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="sweet-loading d-flex justify-content-center align-items-center mt-5 mb-5">
        <RingLoader color={"#123abc"} css={override} size={150} />
      </div>
    );
  }
  return (
    <>
      <Container>
        <div className="mainbanner">
          <img src={coursebanner} alt="about" />
        </div>
        <div className="coursepage">
          <h1 className="title">Our Courses</h1>
          <div className="course-searchbar">
            <FontAwesomeIcon icon={faSearch} />
            <input
              placeholder="Search any course by title or creator name"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.toLowerCase())}
              type="text"
            />
            {/* <button onClick={handleSearch}>Search</button> */}
          </div>

          {allCourses ? (
            <div className="container ms-3 me-3 my-5 mb-5">
              <div className="container">
                <ul>
                  {currentItems
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
                      <li key={index}>
                        <div className="card course-card border rounded">
                          <div className="relative">
                            <img
                              src={item.thumbnails}
                              className="card-img-top"
                              alt="Course Thumbnail"
                            />

                            <div
                              className="absolute"
                              style={{ top: "10px", right: "30px" }}
                            >
                              <div className="absolute">
                                {Array.isArray(wishlistItem) &&
                                wishlistItem.some(
                                  (wishlistItem) =>
                                    wishlistItem.item_id === item.course_id
                                ) ? (
                                  <BsSuitHeartFill className="icons-added" />
                                ) : (
                                  <BsSuitHeartFill
                                    onClick={() => addWishlist(item.course_id)}
                                    className="icons"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title text-start">
                              <Link to={`/course-details/${item.course_id}`}>
                                {item.course_name}
                              </Link>
                            </h5>
                            <p className="text-start">{item.category}</p>
                            <div className="d-flex justify-content-start">
                              <h5 className="text-start">4.9</h5>
                              <ul className="list-unstyled d-flex justify-content-center text-warning mb-1">
                                <li>
                                  <i className="fas fa-star fa-sm"></i>
                                </li>
                                <li>
                                  <i className="fas fa-star fa-sm"></i>
                                </li>
                                <li>
                                  <i className="fas fa-star fa-sm"></i>
                                </li>
                                <li>
                                  <i className="fas fa-star fa-sm"></i>
                                </li>
                                <li>
                                  <i className="far fa-star fa-sm"></i>
                                </li>
                              </ul>
                            </div>
                            <h5 className="text-start">
                              Price - ₹{item.price}
                            </h5>
                            <div className="d-flex justify-content-start">
                              <button
                                className="btn btn-primary mt-1"
                                onClick={() => addCartTo(item.course_id)}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <ul className="pagination">
                  {Array.from(
                    { length: Math.ceil(allCourses.length / itemsPerPage) },
                    (_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          onClick={() => paginate(i + 1)}
                          className="page-link"
                        >
                          {i + 1}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="container searchDiv">
              <h2>Search Results:</h2>
              <button
                className="btn btn-danger mb-3"
                onClick={handleClearSearch}
              >
                Clear Search
              </button>
              <ul>
                {searchResults.map((result, index) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                    key={index}
                  >
                    <div className="card course-card border rounded">
                      <div className="relative">
                        <img
                          src={result.thumbnails}
                          className="card-img-top"
                          alt="Course Thumbnail"
                        />

                        <div
                          className="absolute"
                          style={{ top: "10px", right: "30px" }}
                        >
                          <div className="relative">
                            <BsSuitHeartFill className="icons" />
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title text-center">
                            <Link to={`/course-details/${result._id}`}>
                              {result.name}
                            </Link>
                          </h5>
                          <p className="text-center">{result.category}</p>
                          <div className="d-flex justify-center">
                            <h5 className="text-center  ">4.9</h5>
                            <ul className="list-unstyled d-flex justify-content-center text-warning mb-1">
                              <li>
                                <i className="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i className="far fa-star fa-sm"></i>
                              </li>
                            </ul>
                          </div>
                          <h5 className="text-center">
                            Price - ₹{result.price}
                          </h5>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-primary mt-1"
                              onClick={() => addCartTo(result._id)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>

      <ToastContainer />
    </>
  );
};

export default Courses;
const Container = styled.div`
  background: url("https://res.cloudinary.com/dq5upuxm8/image/upload/v1696505140/background1_d81fmy.png");
  .mainbanner {
    box-shadow: 1px 1px 21px #e0e0e0;
  }

  .course-card {
    height: auto;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    img {
      height: 13rem;
    }
  }
  h5 {
    font-size: 1rem;
    font-weight: bold;
    margin: 5px;
  }
  p {
    margin: 5px;
  }

  .icons {
    color: black;
  }

  .icons-added {
    color: red;
  }

  .card-body {
    padding-left: 7rem;
    @media (max-width: 500px) {
      padding-left: 0rem;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    list-style: none;
    padding: 0;
    .page-item {
      margin: 0 5px;
      button {
        cursor: pointer;
        color: #007bff;
        background-color: transparent;
        border: 1px solid #dee2e6;
        padding: 5px 10px;
        border-radius: 5px;
        transition: background-color 0.3s, color 0.3s;
        &:hover {
          background-color: #f8f9fa;
        }
      }
      &.active button {
        background-color: #007bff;
        border-color: #007bff;
        color: white;
      }
    }
  }

  .card-title {
    a {
      text-decoration: none;
      color: #583b04;
    }
  }
`;
