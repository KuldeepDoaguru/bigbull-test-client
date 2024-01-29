import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VideoPlaylist from "../VideoPlaylist";
// import VideoPlayer from "../VideoPlayer";
import axios from "axios";
import { useSelector } from "react-redux";

const CourseModule = ({ id }) => {
  const [selectedVideo, setSelectedVideo] = useState();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showVideos, setShowVideos] = useState(false);
  const [chaptersWiseData, setChaptersWiseData] = useState([]);
  const [chaptersList, setChapterList] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const [purchaseCourse, setPurchaseCourse] = useState(false);

  console.log(id);
  // console.log(chaptersWiseData);
  // const chapters = {
  //   chapterOne: [
  //     {
  //       title: "Chapter 1 - Video 1",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1697973901/Stranger_Things_4___Volume_2_Trailer___Netflix_u6dbve.mp4",
  //     },
  //     {
  //       title: "Chapter 1 - Video 2",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1696504303/samples/sea-turtle.mp4",
  //     },
  //   ],
  //   chapterTwo: [
  //     {
  //       title: "Chapter 2 - Video 1",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1697973901/Another_Video_URL.mp4",
  //     },
  //     {
  //       title: "Chapter 2 - Video 2",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1696504303/Yet_Another_Video_URL.mp4",
  //     },
  //   ],
  //   chapterThree: [
  //     {
  //       title: "Chapter 3 - Video 1",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1697973901/Another_Video_URL.mp4",
  //     },
  //     {
  //       title: "Chapter 3 - Video 2",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1696504303/Yet_Another_Video_URL.mp4",
  //     },
  //   ],
  //   chapterFour: [
  //     {
  //       title: "Chapter 4 - Video 1",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1697973901/Another_Video_URL.mp4",
  //     },
  //     {
  //       title: "Chapter 4 - Video 2",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1696504303/Yet_Another_Video_URL.mp4",
  //     },
  //   ],
  //   chapterFive: [
  //     {
  //       title: "Chapter 5 - Video 1",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1697973901/Another_Video_URL.mp4",
  //     },
  //     {
  //       title: "Chapter 5 - Video 2",
  //       url: "https://res.cloudinary.com/dq5upuxm8/video/upload/v1696504303/Yet_Another_Video_URL.mp4",
  //     },
  //   ],
  //   // Add more chapters as needed
  // };

  const getPurchasedCart = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/PurchasedCourseViaUser/${user.id}`
      );
      console.log(response.data.result);
      setBoughtCourses(response.data.result);
      setPurchaseCourse(true);
    } catch (error) {
      console.log(error);
    }
  };

  let parsedCourses = boughtCourses.map((item) => {
    return item.course_id;
  });

  // Now, parsedCourses contains objects with parsed course_id properties
  const mergedArray = parsedCourses.flatMap((str) => JSON.parse(str));

  console.log(mergedArray);

  const filteredData = mergedArray.filter((item) => {
    console.log(item);
    return item == id;
  });

  console.log(filteredData);

  const getCourseVid = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/videoListViaCourseId/${id}`
      );

      console.log(response.data.message);
      setChaptersWiseData(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getChapterVid = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/getAllChaptersViaCourse/${id}`
      );
      console.log(response.data.message);
      setChapterList(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseVid();
    getChapterVid();
    getPurchasedCart();
  }, []);

  const handleVideoSelect = (video) => {
    console.log(video);
    setSelectedVideo(video);
  };

  const handleChapterSelect = (chapterName) => {
    console.log(chapterName);
    setSelectedChapter(chapterName);
  };

  console.log(selectedChapter);

  // const matchChapter = chaptersWiseData.find(
  //   (chapter) => chapter.chapter_id === selectedChapter.ch_id
  // );

  console.log(chaptersWiseData.find((chapter) => chapter.chapter_id));
  // console.log(selectedChapter.ch_id);

  useEffect(() => {
    if (chaptersList.length > 0 && !selectedChapter) {
      // Set the first chapter as the initially selected chapter
      setSelectedChapter(chaptersList[0]);
    }
  }, [chaptersList, selectedChapter]);
  return (
    <>
      <Container>
        <div className="container">
          <h2 className="mt-5">Course content</h2>
          <p>6 Section * 24 Videos</p>
        </div>
        {filteredData.length === 0 ? (
          <>
            <h3 className="" style={{ color: "red" }}>
              You need to buy this course to watch videos
            </h3>
          </>
        ) : (
          <>
            <div className="divfull">
              {/* Mapping over chapters */}
              <div className={`btn-group mt-1`}>
                {chaptersList.map((chapterName) => (
                  <button
                    key={chapterName.ch_id}
                    className="btn btn-primary"
                    onClick={() => handleChapterSelect(chapterName)}
                  >
                    {chapterName.ch_name}
                  </button>
                ))}
              </div>
              <div className="border p-2">
                <div className="card card-body mt-1 border">
                  <div className="watch-playlist">
                    <div className="border-right">
                      {selectedChapter && (
                        <VideoPlaylist
                          videos={
                            chaptersWiseData.find(
                              (chapter) =>
                                chapter.chapter_id === selectedChapter.ch_id
                            ) || []
                          }
                          // onVideoSelect={selectedChapter}
                        />
                      )}
                    </div>
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12"></div>
                      <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-12">
                        <div className="border-left">
                          {/* {selectedVideo && (
                            <VideoPlayer video={selectedVideo} />
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default CourseModule;

const Container = styled.div`
  .divfull {
    button {
      width: 100%;
      text-align: start;
      /* background: #596262; */
      border: none;
    }
  }

  .videoModule {
    height: 12rem;
    width: 14rem;
  }

  .carvide {
    width: 18rem;
  }

  .border-left {
    height: 100%;
  }

  .border-right {
    border-right: 1px solid black;
    height: 100%;
    padding: 1rem;
  }

  ul {
    padding: 0rem;
  }

  .btn-group {
    display: flex;
    gap: 4px; /* Adjust gap as needed */
  }

  .quiz-container {
    margin-top: 1rem;
  }
`;
