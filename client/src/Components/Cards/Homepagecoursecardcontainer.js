import React, { useState, useEffect } from "react";
import "react-owl-carousel2/src/owl.carousel.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsSuitHeartFill } from "react-icons/bs";
import cogoToast from "cogo-toast";
import { useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel2";

const Homepagecoursecardcontainer = () => {
  const [allCourses, setAllCourses] = useState([]);
  const user = useSelector((state) => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);

  const responseCourse = async () => {
    try {
      const res = await axios.get(
        "https://bigbulls.co.in/api/v1/auth/getAllCourses"
      );
      setAllCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    responseCourse();
  }, []);

  const addCartTo = async (id) => {
    try {
      const response = await axios.post(
        "https://bigbulls.co.in/api/v1/auth/add-to-cart",
        {
          userId: user.id,
          itemId: id,
        }
      );

      console.log(response);
      cogoToast.success("Course added to the cart");
    } catch (error) {
      console.log(error);
      cogoToast.error("Course already in the cart");
    }
  };

  const options = {
    items: 1,
    nav: true,
    rewind: true,
    autoplay: true,
    loop: true,
    margin: 10,
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1000: { items: 5 },
    },
  };

  const test = allCourses.map((item, index) => {
    console.log(item);
    console.log(index);
  });
  return (
    <Container>
      <div className="home-all-card-container-outer">
        <div className="container">
          <h2 className="text-center mb-5 mt-5" id="spo">
            Special Offers
          </h2>
        </div>
        <OwlCarousel options={options}>
          {allCourses.map((item, index) => (
            <div key={index} className="item">
              <div className="card course-card border rounded">
                <div className="relative">
                  <img
                    src={item.thumbnails}
                    className="card-img-top"
                    alt="Course Thumbnail"
                  />
                  <div
                    className="absolute"
                    style={{ top: "10px", right: "10px" }}
                  >
                    <div className="relative">
                      <BsSuitHeartFill className="icons" />
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      <Link to={`/course-details/${item.course_id}`}>
                        {" "}
                        {item.course_name}
                      </Link>
                    </h5>
                    <p className="text-center">{item.category}</p>
                    <div className="d-flex justify-center">
                      <h5 className="text-center  ">4.9</h5>
                      <ul className="list-unstyled d-flex justify-content-center text-warning mb-1">
                        <li>
                          <i className="fas fa-star fa-sm"></i>
                        </li>
                        {/* Other stars */}
                      </ul>
                    </div>
                    <h5 className="text-center">Price - ₹{item.price}</h5>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary mt-1"
                        onClick={() => addCartTo(item.course_id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Homepagecoursecardcontainer;

const Container = styled.div`
  .course-card {
    height: 27rem !important;
    width: 100%;
  }
  h5 {
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
  }
  p {
    margin: 0;
  }

  .absolute {
    position: absolute;
  }

  .relative {
    position: relative;
  }

  .icons {
    font-size: 1.5rem;
    color: white;
  }

  .owl-carousel {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    flex-direction: column;
  }

  .item {
    background: #f8f8f8;
    border: 1px solid #ddd;
    padding: 0px;
    margin: 10px;
    border-radius: 5px;
    width: 100%;
    text-align: center;
  }
  img {
    height: 15rem;
  }
  /* .owl-carousel .item:first-child {
    margin-left: -250px;
  } */

  /* .owl-carousel .owl-stage:after {
    content: ".";
    display: block;
    clear: both;
    width: 0px;
    visibility: hidden;
    line-height: 0;
    height: 0;
  } */

  /* .owl-stage {
    display: none;
  } */
`;
