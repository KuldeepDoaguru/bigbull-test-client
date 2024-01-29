import React, { useState } from "react";
import styled from "styled-components";
// import Layout from "../Layout/Layout";
import { FiPhoneCall, FiTwitter } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookSquare, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import MapLocation from "../component/MapLocation";
import cogoToast from "cogo-toast";

const Contact = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhoat:8080/api/v1/auth/contactInquiry", {
        name: fullname,
        email,
        message,
        number: mobile,
      });
      cogoToast.success("Message sent Successfully !");
      setFullName("");
      setEmail("");
      setMessage("");
      setMobile("");
      // navigate("/about");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        {/* <Layout title={"Contact - wings of joy"}> */}
        <div
          className="body-contact pt-5 pb-5"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className="secondDiv"></div>
          <div className="container contact-body">
            <div className="contact-form contact-body-less">
              <div className="row mt-5 pt-5 pb-5">
                {/* <div className="col-2"></div> */}
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="container">
                    <h2 className="text-start">Have a query?</h2>
                    <form onSubmit={onSubmit}>
                      <div class="mb-3">
                        <input
                          type="Name"
                          class="form-control p-3"
                          aria-describedby="emailHelp"
                          placeholder="Enter your Name"
                          id="fullname"
                          value={fullname}
                          required
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div class="mb-3">
                        <input
                          type="email"
                          class="form-control p-3"
                          placeholder="Enter your Email"
                          id="email"
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div class="mb-3">
                        <input
                          type="text"
                          class="form-control p-3"
                          placeholder="Enter your mobile number without country code"
                          id="mobile"
                          value={mobile}
                          maxLength={10}
                          required
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                      <textarea
                        class="form-control mb-3 p-3"
                        placeholder="Enter your message"
                        id="message"
                        value={message}
                        required
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                      <button
                        type="submit"
                        class="btn btn-primary w-100 subBtn border"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <h1>Contact Info</h1>

                  <div className="mt-3 g-5">
                    <FiPhoneCall className="svgcontact" />{" "}
                    <a href="tel:+918602480679">+918602480679</a>{" "}
                  </div>
                  <p className="text-start">
                    <span>
                      <AiOutlineMail className="svgcontact" />
                    </span>{" "}
                    <a
                      href="mailto:bigbulleducation0@gmail.com
"
                    >
                      bigbulleducation0@gmail.com
                    </a>
                  </p>
                  <div className="text-start">
                    <span>
                      <FaMapMarkerAlt className="svgcontact" />
                    </span>{" "}
                    Vijay Nagar, Jabalpur - 482002 (M.P.)
                  </div>

                  <div className="widthsett">
                    <ul className="socialcontact">
                      <li>
                        <a
                          href="https://www.facebook.com/profile.php?id=61553490796165"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1704627042/bigbull/youtube-1495277_1280_a5cu8c.png"
                            alt="youtube"
                            srcset=""
                            className="socialImagenav"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/profile.php?id=61553490796165"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1704627884/bigbull/icons-842861_1280_lxvv8q.png"
                            alt="linkedin"
                            srcset=""
                            className="socialImagenav"
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/profile.php?id=61553490796165"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://res.cloudinary.com/antrix/image/upload/v1678714799/facebook-2429746_640_pwgv7r.png"
                            alt=""
                            srcset=""
                            className="socialImagenav"
                          />
                        </a>
                      </li>

                      <li>
                        <a
                          href="https://www.instagram.com/bigbulls_co"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://res.cloudinary.com/antrix/image/upload/v1678771526/instagram-1675670_640_qpdp85.png"
                            alt=""
                            srcset=""
                            className="socialImagenav"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-fluid">
            <MapLocation />
          </div> */}
        {/* </Layout> */}
      </Container>
    </>
  );
};

export default Contact;
const Container = styled.div`
  .subBtn {
    background-color: #8a2be2;
  }

  .socialcontact > li {
    list-style: none;
  }

  ul {
    margin: 0;
    padding-left: 0rem;
  }
  .socialImagenav {
    height: 2rem;
    width: 2rem;
    margin: 1rem;
  }

  .socialcontact {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .secondDiv {
    background-color: #8a2be2;
    height: 10rem;
    width: 100%;
    margin-top: 6rem;
    position: absolute;
    z-index: -9999;
  }

  .contact-form {
    background-color: white;
  }

  .widthsett {
    width: auto;
    margin-left: 0rem;
  }

  .contact-body {
    box-shadow: 0px 8px 25px #8a2be2;
    border-radius: 7px;
  }

  .svgcontact {
    color: #8a2be2;
    display: inline;
  }

  .contact-body-less {
    /* display: flex;
    justify-content: space-evenly; */
  }

  /* .body-contact {
  background-color: #c1c1c1;
  position: absolute;
  z-index: 1;
} */

  @media screen and (max-width: 542px) {
    .contact-body-less {
      text-align: center;
    }
    .socialcontact {
      display: flex;
      justify-content: space-around;
    }
    .widthsett {
      width: auto;
      margin-left: 0rem;
    }
  }

  .qrbox {
    img {
      height: auto;
      width: 10rem;
    }
  }
  .qrcont {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
  }
  a {
    text-decoration: none;
    color: sky-blue;
  }
`;
