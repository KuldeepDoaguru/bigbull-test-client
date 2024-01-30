import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar";
import ManageNav from "./ManageNav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Addvideo.css";

const Addvideo = () => {
  const { cid } = useParams();

  const [video_Duration, setvideoDuration] = useState("");
  const [video_title, setvideotitle] = useState("");
  const [video_category, setvideoCategory] = useState("");
  const [video_description, setvideodescription] = useState("");
  const [course_video, setcoursevideo] = useState(null);

  const addVideoCourse = async (e) => {
    e.preventDefault();

    const addvideoformdata = new FormData();
    addvideoformdata.append("duration", video_Duration);
    addvideoformdata.append("title", video_title);
    addvideoformdata.append("videoFile", course_video);
    addvideoformdata.append("description", video_description);
    addvideoformdata.append("category", video_category);

    try {
      const response = await axios.post(
        `https://bigbulls.co.in/api/v1/auth/courses/${cid}/videos`,
        addvideoformdata
      );

      console.log(response);

      // Add success message handling here, e.g., using react-toastify
      toast.success("Video added successfully");
    } catch (error) {
      console.log(error);

      // Add error message handling here, e.g., using react-toastify
      toast.error("Failed to add video");
    }
  };

  return (
    <>
      <div className="addvideo-outer">
        <Navbar />
        <ManageNav
          editcourse={false}
          addvideo={true}
          showvideos={false}
          courseid={cid}
        />
        <div className="head-main"> Add New Video </div>
        <form onSubmit={addVideoCourse} encType="multipart/form-data">
          <div className="form-inner">
            <div>
              <label>Video Title</label>
              <input
                name="title"
                onChange={(e) => {
                  setvideotitle(e.target.value);
                }}
                placeholder="Enter Video Title"
              />
            </div>

            <div>
              <label>Video duration</label>
              <input
                name="duration"
                onChange={(e) => {
                  setvideoDuration(e.target.value);
                }}
                placeholder="Enter Video Duration"
              />
            </div>
          </div>

          <div className="form-inner">
            <div>
              <label>Video Category</label>
              <select
                name="category"
                onChange={(e) => {
                  setvideoCategory(e.target.value);
                }}
              >
                <option>Select video type</option>
                <option value="Paid">Paid</option>
                <option value="Free">Free</option>
              </select>
            </div>

            <div>
              <label>
                Video<span className="spantag"> (* mp4 or mkv)</span>
              </label>
              <input
                type="file"
                name="videoFile" // Corrected from filename
                onChange={(e) => {
                  setcoursevideo(e.target.files[0]);
                }}
                placeholder="Upload Video"
                accept="video/mp4, video/mkv"
              />
            </div>
          </div>

          <div className="form-textarea">
            <label>Video Description</label>
            <textarea
              name="video_description"
              onChange={(e) => {
                setvideodescription(e.target.value);
              }}
              placeholder="Enter Video Description"
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Addvideo;
