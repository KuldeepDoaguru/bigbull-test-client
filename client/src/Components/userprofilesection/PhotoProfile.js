import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PhotoProfile = () => {
  const user = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (e) => {
    // const file = event.target.files[0];
    // console.log(file.name);
    // setImageFile(file);

    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      // Update the state with the selected file
      setImageFile(selectedFile);
    }
  };

  console.log(imageFile);

  const updateProfilePicture = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profilePicture", imageFile);

      const response = await axios.put(
        `https://bigbulls.co.in/api/v1/auth/update-profile-picture/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <div className="d">
          <h2 className="text-center">Update Profile Picture</h2>
          <hr />
        </div>

        <div>
          <div className="mt-3 fileIn">
            <form onSubmit={updateProfilePicture} encType="multipart/form-data">
              <div class="">
                <input
                  type="file"
                  name="profilePicture"
                  accept=".pdf, .jpg, .jpeg, .png"
                  onChange={handleImageUpload}
                />
              </div>
              <button className="btn btn-info mt-5" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PhotoProfile;

const Container = styled.div`
  .imgpreview {
    height: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e0e0e0;
    img {
      height: 100%;
    }
  }
  .fileIn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
