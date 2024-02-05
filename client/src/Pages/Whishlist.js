import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsSuitHeartFill, BsSuitHeart, BsCart3, BsBell } from "react-icons/bs";
import axios from "axios";
import cogoToast from "cogo-toast";

const Whishlist = () => {
  const [allCourses, setallCourses] = useState([]);
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user);
  const [wishlistItem, setWishlistItem] = useState({});
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);

  const responseCourse = async () => {
    try {
      const res = await axios.get(
        "https://bigbulls.co.in/api/v1/auth/getAllCourses"
      );
      console.log(res.data);
      setallCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const displayWishlistItem = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/getWishlistItems/${user.id}`
      );
      console.log(response);
      setWishlistItem(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(wishlistItem);

  useEffect(() => {
    displayWishlistItem();
  }, []);

  useEffect(() => {
    responseCourse();
  }, []);

  const coursesInWishlist = allCourses.filter((course) =>
    wishlistItem.some((cartItem) => cartItem.item_id === course.course_id)
  );

  console.log(coursesInWishlist);

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

  const removeWishlistItems = async (cid) => {
    try {
      const response = await axios.delete(
        `https://bigbulls.co.in/api/v1/auth/deleteCourseFromWishlist/${cid}`
      );
      console.log(response);
      cogoToast.success("wishlist items removed successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <div className="coursepage">
          <h1 className="title mt-5">My Wishlist</h1>
          <div className="container ms-3 me-3 my-5 mb-5">
            <div className="container">
              <div className="row g-3">
                {coursesInWishlist?.map((item, index) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                    key={index}
                  >
                    <div className="card course-card border rounded">
                      <div className="relative">
                        {images && (
                          <img
                            src={`https://bigbulls.co.in/${item.thumbnails}`}
                            className="card-img-top"
                            alt="Course Thumbnail"
                          />
                        )}

                        <div
                          className="absolute"
                          style={{ top: "10px", right: "10px" }}
                        >
                          <div className="relative">
                            <BsSuitHeartFill className="icons-added" />
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title text-center">
                            <Link to={`/course-details/${item.course_id}`}>
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
                              <li>
                                <i className="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i className="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i className="far fa-star fa-sm"></i>
                              </li>
                            </ul>
                          </div>
                          <h5 className="text-center">Price - ₹{item.price}</h5>
                          <div className="d-flex justify-content-evenly">
                            <button
                              className="btn btn-primary mt-1"
                              onClick={() => addCartTo(item.course_id)}
                            >
                              Add to Cart
                            </button>
                            <button
                              className="btn btn-danger mt-1"
                              onClick={() =>
                                removeWishlistItems(item.course_id)
                              }
                            >
                              Remove from wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Whishlist;
const Container = styled.div`
  .course-card {
    height: 25rem !important;
    width: 100%;
    border-radius: 1rem;
    img {
      height: 13rem;
    }
  }
  h5 {
    font-size: 1rem;
    font-weight: bold;
    margin: 5px;
  }
  p {
    margin: 5px;
  }

  .icons {
    color: white;
  }

  .icons-added {
    color: red;
  }
`;
