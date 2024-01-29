// src/components/VideoPlaylist.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoPlayer from "./VideoPlayer";
import cogoToast from "cogo-toast";

const VideoPlaylist = ({ videos, onVideoSelect }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  console.log(videos);

  const getListVideoChapterWise = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/getAllVideosViaCourseIdChapterId/${videos.course_id}/${videos.chapter_id}`
      );
      console.log(response.data.message);
      setVideoList(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadQuestionPaper = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/downloadQuestionSheet/${videos.course_id}/${videos.chapter_id}`,
        {
          responseType: "blob", // Specify responseType as blob
        }
      );

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Open the blob URL in a new tab
      window.open(blobUrl, "_blank");

      cogoToast.success("Question Paper Downloaded");
    } catch (error) {
      console.error(error);
    }
  };

  const answerUpload = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListVideoChapterWise();
    console.log(videoList);
  }, [videos]);

  const handleVideoSelect = (video) => {
    console.log(video);
    setSelectedVideo(video);
  };

  // console.log(onVideoSelect);

  console.log(videoList);

  useEffect(() => {
    if (videoList.length > 0 && !selectedVideo) {
      // Set the first video as the initially selected video
      setSelectedVideo(videoList[0]);
    }
  }, [videoList, selectedVideo]);
  return (
    <>
      <Container>
        <div className="video-playlist">
          <h2>Video Playlist</h2>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12">
              <ul>
                {videoList.map((video, index) => (
                  <li
                    className={`li-btn ${
                      video === selectedVideo ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleVideoSelect(video)}
                  >
                    {video.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
              <VideoPlayer video={selectedVideo} />
              <div className="d-flex flex-column btn-group mt-5">
                <div>
                  <button
                    className="btn btn-info"
                    onClick={downloadQuestionPaper}
                  >
                    Download Question Paper
                  </button>
                </div>
                <hr />
                <div className="d-flex flex-column">
                  <input type="file" />
                  <button className="btn btn-info mt-2">Upload Answer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default VideoPlaylist;
const Container = styled.div`
  .li-btn {
    background-color: #78d3e9;
    padding: 5px;
    text-align: center;
    border-radius: 0.5rem;
    color: #1c1b1b;
    margin-top: 5px;
  }
  h2 {
    font-size: 1.2rem;
  }
`;
