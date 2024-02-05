import React, { useEffect, useState } from "react";
// import mainlogo from "../photos/mainlogo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navigationbar.css";
import Cookies from "js-cookie";
import testimg from "../photos/no-profile.jpg";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BsSuitHeart, BsSuitHeartFill, BsCart3, BsBell } from "react-icons/bs";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";

const Navigationbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userdetails, setuserDetails] = useState();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Courses", path: "/courses" },
    { text: "About", path: "/about" },
    { text: "Blogs", path: "/blogs" },
    { text: "Contact", path: "/contact" },
  ];

  console.log(user);

  const authToken = Cookies.get("authToken");

  const logoutHandler = () => {
    try {
      sessionStorage.clear();

      // Remove cookies
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const cookieName = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
      localStorage.removeItem("userData");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(authToken);

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/getUserViaId/${user.id}`
      );
      console.log(response);
      setData(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <Container>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1704632318/bigbull/bigbull_logosmall_psuvum.png"
                class="navbar-brand"
                alt="logo"
              />
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon">
                <RxHamburgerMenu />
              </span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                {navLinks.map((link, index) => (
                  <li className="nav-item" key={index}>
                    <Link
                      className={`nav-link navLk ${
                        location.pathname === link.path ? "active" : ""
                      }`}
                      to={link.path}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
              <div class="d-flex align-items-center" role="search">
                {authToken ? (
                  <>
                    <Link className="nav-link subLink" to="/mylearning">
                      My Learning
                    </Link>
                    <Link className="nav-link" to="/whishlist">
                      <BsSuitHeartFill className="icons" />
                    </Link>
                    <Link className="nav-link" to="/course-cart">
                      <BsCart3 className="icons" />
                    </Link>

                    <Link className="nav-link" to="/notification">
                      <BsBell className="icons" />
                    </Link>
                    <Link className="nav-link" to="/public-view-profile">
                      <div class="icon-container">
                        <img src={data.profile_picture} alt="profile" />
                        {/* <RxAvatar className="icons" /> */}
                        <ul class="list rounded">
                          <li>
                            <div className="d-flex justify-content-around ">
                              <div>
                                <RxAvatar className="icons-user" />
                              </div>
                              <div className="ml-1">
                                <p
                                  className="fw-bold m-0 fs-5"
                                  style={{ color: "black" }}
                                >
                                  {user.name}
                                </p>
                                <p className="m-0" style={{ color: "#7f8fa6" }}>
                                  {user.name}
                                </p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <hr class="dropdown-divider" />
                          </li>
                          <li>
                            <Link to="/notification">Notifications</Link>
                          </li>

                          <li>
                            <hr class="dropdown-divider" />
                          </li>
                          <li>Public Profile</li>
                          <li>
                            <Link to="/edit-profile">Edit Profile</Link>
                          </li>
                          <li>
                            <hr class="dropdown-divider" />
                          </li>
                          <li>
                            <Link to="/help-page">Help</Link>
                          </li>
                          <li>
                            <button
                              className="btn btn-danger"
                              onClick={logoutHandler}
                            >
                              Logout
                            </button>{" "}
                          </li>
                        </ul>
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="nav-link btn btn-danger" to="/enrollnow">
                      Enroll Now
                    </Link>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </>
  );
};

export default Navigationbar;
const Container = styled.div`
  .navbtns {
    a {
      color: white;
      font-weight: bold;
      margin-top: 1rem;
    }
  }
  nav {
    background: #269edf;
  }
  .nav-link {
    color: #f8c291;
    font-weight: bold;
    // background: #000;
    // margin-left: 1rem;
    // border-radius: 5px;
  }
  .navLk {
    color: #f8c291;
    font-weight: bold;
  }
  .active {
    color: yellow;
    font-weight: bold;
  }
  .icons {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .icon-container {
    position: relative;
    display: inline-block;
    /* width: 3rem;
    height: 3rem;
    overflow: hidden;
    border-radius: 2rem; */
    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 2rem;
    }
  }

  .list {
    display: none;
    position: absolute;
    top: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    list-style: none;
    padding: 0.5rem;
    width: 240px;
    right: 0;
    li {
      color: #7f8fa6;
      margin-top: 1rem;
      margin-bottom: 1rem;
      a {
        color: #7f8fa6;
        text-decoration: none;
      }
    }
  }

  .icon-container:hover .list {
    display: block; /* Show the list on hover */
  }

  .icons-user {
    font-size: 3rem;
  }

  .navbar-toggler-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    height: 5rem;
    width: 11rem;
  }
`;
