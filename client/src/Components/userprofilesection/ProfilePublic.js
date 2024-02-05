import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProfilePublic = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

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

  const addBioData = async () => {
    try {
      const response = await axios.post(
        `https://bigbulls.co.in/api/v1/auth/addUserBio/${user.id}`,
        { text: text }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const updateBioData = async () => {
    try {
      const response = await axios.put(
        `https://bigbulls.co.in/api/v1/auth/updateUserBio/${user.id}`,
        { text: text }
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(text);
  console.log(data);
  useEffect(() => {
    getUserProfile();
  }, []);

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <>
      <Container>
        <div className="">
          <div className="header pt-5">
            <h1 className="mt-5 text-center text-white">{user.name}</h1>
          </div>
          <div className="container imgct d-flex justify-content-center align-items-center flex-column">
            <img src={data.profile_picture} alt="profile" srcset="" />
            <p className="mt-3">{data.bio}</p>
            <button onClick={handleToggle} className="btn btn-info mb-3">
              {show ? "Close" : "Add Details"}
            </button>
            <div className={show ? "div-active" : "hidden-div"}>
              <textarea
                name="text"
                id="text"
                cols="90"
                rows="10"
                className="border rounded p-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <br />
              <div className="d-flex">
                <button
                  className="btn btn-outline-success mb-2"
                  onClick={addBioData}
                >
                  Add Details
                </button>
                <button
                  className="btn btn-outline-warning mb-2 mx-2"
                  onClick={updateBioData}
                >
                  Update Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProfilePublic;
const Container = styled.div`
  height: 100%;
  .header {
    background-color: #000;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgct {
    height: 100%;
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
  .div-active {
    display: block;
  }

  .hidden-div {
    display: none;
  }
`;
