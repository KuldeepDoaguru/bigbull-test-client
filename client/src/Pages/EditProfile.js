import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Userprofile from "../Components/userprofileOld/Userprofile";
import UpdateProfile from "../Components/userprofilesection/UpdateProfile";
import { Link } from "react-router-dom";
import PhotoProfile from "../Components/userprofilesection/PhotoProfile";
import axios from "axios";
import DeleteProfile from "../Components/DeleteProfile";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState("tab2");
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const [data, setData] = useState([]);

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

  console.log(data.profile_picture);
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      <Container>
        <div className="container pt-5">
          <div className="container border mt-5">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <div className="leftdiv">
                  <div className="imgdc">
                    <img
                      src={`${data.profile_picture}`}
                      alt="profile"
                      srcset=""
                    />
                    <h3 className="mt-2">{user.name}</h3>
                    <div>
                      <Nav
                        className="flex-column side-cont"
                        activeKey={selectedTab}
                        onSelect={(selectedKey) => setSelectedTab(selectedKey)}
                      >
                        <Nav.Item>
                          <Link to="/public-view-profile" className="navlink">
                            View Profile as Public
                          </Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Link to="/subscription" className="navlink">
                            Subscriptions
                          </Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab2" className="navlink">
                            Edit Profile
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="tab3" className="navlink">
                            Change Profile Photo
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link eventKey="tab5" className="navlink">
                            Delete Account
                          </Nav.Link>
                        </Nav.Item>

                        {/* <button
                          className="btn btn-success logoutbtn"
                          onClick={logoutHandler}
                        >
                          Logout
                        </button> */}
                      </Nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                <div className="flex-grow-1 p-3 mainback">
                  {selectedTab === "tab1" && <Userprofile />}
                  {selectedTab === "tab2" && <UpdateProfile />}
                  {selectedTab === "tab3" && <PhotoProfile />}
                  {selectedTab === "tab4" && <Userprofile />}
                  {selectedTab === "tab5" && <DeleteProfile />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditProfile;
const Container = styled.div`
  .leftdiv {
    border-right: 1px solid #e0e0e0;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    .imgdc {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        border-radius: 50%;
        //   background-color: #000;
        height: 6rem;
        width: 6rem;
      }
    }
  }

  .side-cont {
    a {
      color: black;
      font-weight: bold;
    }
  }

  .active {
    background-color: #f53237;
  }
`;
