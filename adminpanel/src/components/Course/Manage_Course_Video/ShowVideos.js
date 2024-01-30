import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Navbar";
import ManageNav from "./ManageNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowVideos = () => {
  const { cid } = useParams();
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [keyword, setKeyword] = useState("");

  const displayCourseVideo = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/videoListViaCourseId/${cid}`
      );
      setSelectedCourse(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    displayCourseVideo();
  }, [cid]);

  return (
    <>
      <div className="recentpurchases-outer">
        <Navbar />
        <ManageNav
          editcourse={false}
          showvideos={true}
          addvideos={false}
          courseid={cid}
        />
        <div className="head-main"> Update Course Videos </div>

        <div className="searchbar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            placeholder="Search Course Video"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />
        </div>

        <div className="table">
          <div className="table-head">
            <p style={{ width: "5%" }}>Sno.</p>
            <p style={{ width: "20%" }}>Video</p>
            <p style={{ width: "20%" }}>Video Title</p>
            <p style={{ width: "25%" }}>Description</p>
            <p style={{ width: "15%" }}>Category</p>
            <p style={{ width: "15%" }}>Edit</p>
          </div>
          <div className="table-body">
            {selectedCourse.map((video, index) => (
              <div className="table-row" key={video._id}>
                <p style={{ width: "5%" }}>{index + 1}</p>
                <video controls width="150">
                  <source
                    src={`https://bigbulls.co.in/${video.url}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <p style={{ width: "20%" }}>{video.title}</p>
                <p style={{ width: "25%" }}>{video.description}</p>
                <p style={{ width: "15%" }}>{video.category}</p>
                <Link to={`/editvideo/${cid}/${video._id}`}>
                  <button style={{ width: "100%" }}>Edit</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ShowVideos;
