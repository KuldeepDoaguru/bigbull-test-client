import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsSuitHeartFill, BsSuitHeart, BsCart3, BsBell } from "react-icons/bs";
import axios from "axios";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(script);
  });
};

const CartPage = () => {
  const [allCourses, setallCourses] = useState([]);
  const [images, setImages] = useState([]);
  const [Razorpay, isLoaded] = useRazorpay();
  const [payStats, setPayStats] = useState("Pending");

  const [cartItem, setCartItem] = useState({});
  const user = useSelector((state) => state.user);
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

  console.log(allCourses);

  const displayCartItem = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/getCartItems/${user.id}`
      );
      console.log(response.data.message);
      setCartItem(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cartItem);

  useEffect(() => {
    displayCartItem();
  }, []);

  // useEffect(() => {
  //   if (allCourses.length > 0) {
  //     allCourses.forEach((course) => {
  //       responseImage(course.course_id);
  //     });
  //   }
  // }, [allCourses]);

  useEffect(() => {
    responseCourse();
  }, []);

  const coursesInCart = allCourses.filter((course) =>
    cartItem.some((cartItem) => cartItem.item_id === course.course_id)
  );

  console.log(coursesInCart);

  const totalPrice = () => {
    try {
      let total = 0;
      coursesInCart.forEach((item) => {
        total = total + parseFloat(item.price);
      });
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        `https://bigbulls.co.in/api/v1/auth/deleteCartItems/${user.id}`
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const initializeRazorpay = async () => {
    await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    try {
      console.log(user.name);
      const response = await axios.post(
        "https://bigbulls.co.in/api/v1/auth/CoursePayment",
        {
          amount: totalPrice(),
          student_id: user.id,
          student_name: user.name,
          course_id: coursesInCart.map((item) => item.course_id),
          status: payStats,
        }
      );

      console.log(response);
      console.log(payStats);

      const { amount, receipt, id } = response.data;
      console.log(receipt);
      const options = {
        key: "rzp_test_pvIKwqbWsM4wHq",
        amount: amount * 100,
        currency: "INR",
        name: "Bigbulls",
        description: "Description of the purchase",
        handler: async function (response) {
          try {
            const { razorpay_payment_id, orderId } = response;

            console.log(response);

            // Send payment details to your backend for verification
            const paymentVerificationResponse = await axios.put(
              "https://bigbulls.co.in/api/v1/auth/verify-payment",
              {
                paymentId: razorpay_payment_id,
                receipt: receipt,
              }
            );

            console.log(paymentVerificationResponse);
            const paymentStatus = paymentVerificationResponse.data.status;
            console.log(paymentStatus);
            console.log(paymentVerificationResponse.data.id);

            // Update payment status in the database
            const payResponse = await axios.put(
              `https://bigbulls.co.in/api/v1/auth/update-order/${paymentVerificationResponse.data.id}`,
              {
                status: paymentStatus,
              }
            );

            setPayStats(paymentStatus);
            console.log(payResponse);
            console.log(payStats);

            console.log(
              payStats,
              "Payment verification response:",
              paymentVerificationResponse.data
            );
            clearCart();
          } catch (error) {
            console.error("Error verifying payment:", error, error.message);
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="coursepage">
          <h1 className="title mt-5">My Course Cart</h1>
          <div className="container ms-3 me-3 my-5 mb-5">
            <div className="container">
              <div className="row g-3">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                  {coursesInCart?.map((item, index) => (
                    <div className="row d-flex flex-row">
                      <div
                        className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                        key={index}
                      >
                        <div className="card course-card rounded">
                          <div className="relative">
                            {images && (
                              <img
                                src={`${item.thumbnails}`}
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
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                        <div className="card-body">
                          <h5 className="card-title text-start">
                            <Link to={`/course-details/${item.course_id}`}>
                              {item.course_name}
                            </Link>
                          </h5>
                          <p className="text-start">{item.category}</p>
                          <div className="d-flex justify-start">
                            <h5 className="text-start  ">4.9</h5>
                            <ul className="list-unstyled d-flex justify-content-start text-warning mb-1">
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
                          <h5 className="text-start">Price - ₹{item.price}</h5>
                          <div className="d-flex justify-content-start">
                            <a
                              href="/course-cart"
                              className="btn btn-danger mt-1"
                            >
                              Remove from Cart
                            </a>
                          </div>
                        </div>
                      </div>
                      <hr className="mt-2" />
                    </div>
                  ))}
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                  <h4>Cart Summary</h4>
                  <p>Total | Checkout | Payment</p>
                  <hr />
                  <h4>Total :{totalPrice()}</h4>

                  <button
                    className="btn btn-success"
                    onClick={initializeRazorpay}
                  >
                    make payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CartPage;
const Container = styled.div`
  .course-card {
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
