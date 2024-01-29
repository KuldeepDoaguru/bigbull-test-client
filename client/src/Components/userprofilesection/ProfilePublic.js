import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProfilePublic = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);

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
        <div className="">
          <div className="header pt-5">
            <h1 className="mt-5 text-center text-white">{user.name}</h1>
          </div>
          <div className="container imgct d-flex justify-content-center align-items-center flex-column">
            <img src={`${data.profile_picture}`} alt="profile" srcset="" />
            <p className="mt-3">
              Devansh is a Full stack developer. It excels in handling real-time
              updates, dynamic content, and single-page applications (SPAs).
              Devansh is a Full stack developer. It excels in handling real-time
              updates, dynamic content, and single-page applications (SPAs).
              Devansh is a Full stack developer. It excels in handling real-time
              updates, dynamic content, and single-page applications (SPAs).
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProfilePublic;
const Container = styled.div`
  height: 100vh;
  .header {
    background-color: #000;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgct {
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      border-radius: 50%;
      //   background-color: #000;
      height: 6rem;
      width: 6rem;
    }
  }
`;
