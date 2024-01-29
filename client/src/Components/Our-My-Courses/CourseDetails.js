import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import WhatLearn from "../CourseDetailsTabs/WhatLearn";
import CourseModule from "../CourseDetailsTabs/CourseModule";
import TestimonialCourse from "../CourseDetailsTabs/TestimonialCourse";
import cogoToast from "cogo-toast";
import { useSelector } from "react-redux";

const CourseDetails = () => {
  let { courseid } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [videoPlay, setVideoPlay] = useState(false);
  const videoRef = useRef(null);
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const [purchaseCourse, setPurchaseCourse] = useState(false);

  const playVideo = () => {
    setVideoPlay(true);
  };

  console.log(courseid);

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
    return item == courseid;
  });

  console.log(filteredData);

  const CourseDetails = async () => {
    console.log("function run");
    try {
      const res = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/coursePage/${courseid}`
      );
      console.log(res.data);
      setCourseData(res.data);
      localStorage.setItem("courseData", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const storedCourseData = JSON.parse(localStorage.getItem("courseData"));
  console.log(courseData);
  // setCourseData(storedCourseData);
  // console.log(storedCourseData.name);

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
      console.log(error);
      cogoToast.error("course already in the cart");
    }
  };

  console.log(courseData);

  useEffect(() => {
    CourseDetails();
    getPurchasedCart();
  }, []);

  return (
    <>
      <Container>
        <div className="maindiv">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="container">
                  {videoPlay ? (
                    <video
                      src="https://res.cloudinary.com/dq5upuxm8/video/upload/v1697973901/Stranger_Things_4___Volume_2_Trailer___Netflix_u6dbve.mp4"
                      controls
                      autoPlay
                    ></video>
                  ) : (
                    <>
                      <img
                        className="card-img-top imgthumb"
                        src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697625839/bigbull_cards_cpbg4n.png"
                        alt="Card cap"
                      />
                      <button
                        className="btn btn-success mt-2"
                        onClick={playVideo}
                      >
                        Watch Demo
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="container">
                  <h1>
                    {courseData &&
                      courseData.length > 0 &&
                      courseData[0].course_name}
                  </h1>
                  <p className="mt-3 mb-0">
                    {" "}
                    {courseData &&
                      courseData.length > 0 &&
                      courseData[0].description}
                  </p>

                  <p>
                    <strong>Category :</strong>{" "}
                    {courseData &&
                      courseData.length > 0 &&
                      courseData[0].category}
                  </p>
                  <p className="fw-bold">
                    Rs. ₹
                    {courseData && courseData.length > 0 && courseData[0].price}
                  </p>
                  {filteredData.length === 0 ? (
                    <button
                      className="btn btn-info"
                      onClick={() => addCartTo(courseData[0].course_id)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <>
                      <div>
                        <h4>You have already purchased this course</h4>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="container mt-3 mb-3 p-5 tabcont">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="tab1-tab"
                      data-toggle="tab"
                      href="#tab1"
                      role="tab"
                      aria-controls="tab1"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="tab2-tab"
                      data-toggle="tab"
                      href="#tab2"
                      role="tab"
                      aria-controls="tab2"
                      aria-selected="false"
                    >
                      Course Module
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="tab3-tab"
                      data-toggle="tab"
                      href="#tab3"
                      role="tab"
                      aria-controls="tab3"
                      aria-selected="false"
                    >
                      Testimonials
                    </a>
                  </li>
                </ul>

                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="tab1"
                    role="tabpanel"
                    aria-labelledby="tab1-tab"
                  >
                    <WhatLearn />
                  </div>
                  <div
                    class="tab-pane fade"
                    id="tab2"
                    role="tabpanel"
                    aria-labelledby="tab2-tab"
                  >
                    <CourseModule id={courseid} />
                  </div>
                  <div
                    class="tab-pane fade"
                    id="tab3"
                    role="tabpanel"
                    aria-labelledby="tab3-tab"
                  >
                    <TestimonialCourse />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="container mt-5">
                <div class="card h-100 w-100">
                  <img
                    class="card-img-top"
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697630200/bull_co43rp.png"
                    alt="Card cap"
                  />
                  <div class="card-body">
                    <h5 class="card-title">
                      Subscribe to Bigbull’s top courses
                    </h5>
                    <p class="card-text">
                      Get this course, plus 500+ of our courses. For our
                      Guidance <Link to="/contact">Contact us</Link>
                    </p>
                    <button className="btn btn-info w-100">
                      Subscribe Now
                    </button>
                    <div className="mt-2">
                      <button className="btn btn-outline-success">
                        Share this Course
                      </button>
                      <button className="btn btn-outline-success ml-2">
                        Gift this course
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CourseDetails;
const Container = styled.div`
  .maindiv {
    padding-top: 3rem;
    padding-bottom: 2rem;
    background: linear-gradient(to right, #ffefba, #ffffff);
  }

  .imgthumb {
    height: 12rem;
    width: 14rem;
  }
`;
