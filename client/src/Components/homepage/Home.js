import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Navbar from './Navigationbar'
import Carousel from "react-bootstrap/Carousel";
import "./Home.css";

import carouselimg1 from "../../image/RegisterNow.webp";
import carouselimg2 from "../../image/b2tone.webp";
import carouselimg3 from "../../image/bb3tone.webp";

import imgtexthome1 from "../photos/img-text-home/1.png";
import imgtexthome2 from "../photos/img-text-home/2.png";
import imgtexthome3 from "../photos/img-text-home/3.png";

import Homepagecoursecardcontainer from "../Cards/Homepagecoursecardcontainer";
import Productslider1 from "../product-slider/Productslider1";
import Productslider from "../product-slider/Productslider";
import Homeblogs from "./Homeblogs";
import styled from "styled-components";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  height: 100vh;
`;

const Home = () => {
  const [carousel, setcarousel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/carouseldata/carouseldata/`)
      .then((response) => {
        setcarousel(response.data);
      })
      .catch((e) => {
        toast.error(e, {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="sweet-loading d-flex justify-content-center align-items-center mt-5 mb-5">
        <RingLoader color={"#123abc"} css={override} size={150} />
      </div>
    );
  }

  return (
    <>
      <Container>
        <div>
          {/* Carousel */}
          <div className="carousel-container">
            <Carousel>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 cr-img"
                  src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1703232532/bigbull/bb3_smmawt.png"
                  alt="First slide"
                  // style={{ height: "35rem" }}
                />
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 cr-img"
                  // src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1703231921/bigbull/Bigbulls_Course_1_wsnw1w.png"
                  src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1704629586/bigbull/BIGBULLS_PROVIDES_1_ccuujw.png"
                  alt="Second slide"
                  // style={{ height: "35rem" }}
                />
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 cr-img"
                  // src={carouselimg1}
                  src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1704630665/bigbull/NEW_REGISTRATION_dddgfd.png"
                  alt="third slide"
                  // style={{ height: "35rem" }}
                />
              </Carousel.Item>
            </Carousel>
          </div>

          {/* <div className="big-heading">
        <span>We are Bigbulls</span>
      </div> */}
          <Homepagecoursecardcontainer />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
            <path
              fill="#85110F"
              fillOpacity="1"
              d="M0,64L120,80C240,96,480,128,720,133.3C960,139,1200,117,1320,106.7L1440,96L1440,200L1320,200C1200,200,960,200,720,200C480,200,240,200,120,200L0,200Z"
            ></path>
          </svg>
          <div className="home-paragraph pb-5">
            <div className="container">
              <h2 className="mb-4 textshadow fs-1 text-center mt-5">
                Who We Are: Your Gateway to Financial Wisdom 📈💡
              </h2>
              <p className="textjustify">
                At Bigbulls, we're not just another corner of the internet;
                we're your go-to destination for unlocking the mysteries of
                finance. Here's our identity in a nutshell: Educators & Guides:
                We're a team of passionate educators and finance aficionados
                dedicated to simplifying the complex world of finance. Our
                expertise isn't just in numbers; it's in breaking down financial
                concepts into relatable, understandable bits. Advocates of
                Empowerment: Beyond spreadsheets and investment jargon, we're
                advocates of empowerment. Our aim is to arm you with the
                knowledge and tools necessary to make confident and informed
                financial decisions. Your Learning Hub: Think of us as your
                digital classroom for financial literacy. From the basics of
                budgeting to the intricacies of investment strategies, we've got
                your back every step of the way. Champions of Inclusivity:
                Financial education should be for everyone. We're here to ensure
                that regardless of your background or experience, you'll find a
                welcoming space to enhance your financial literacy. Your
                Financial Ally: Consider us your ally in the financial
                landscape. We're not just about imparting information; we're
                here to offer support, guidance, and a wealth of resources to
                help you navigate your financial journey. Community Builders:
                Join our vibrant community! Share insights, seek advice, and
                engage with others who share your passion for financial growth.
                Together, we're stronger and wiser.
              </p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path
              fill="#85110F"
              fillOpacity="1"
              d="M0,192L120,176C240,160,480,128,720,122.7C960,117,1200,139,1320,149.3L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            ></path>
          </svg>

          <Productslider1 />
          {/* img -text */}
          <div className="hrline"></div>
          <div className="container">
            {/* <h1 className="head-small">
              🎯 Our Goal: Empowering Financial Mastery 🌟
            </h1> */}
            {/* <h5>
              At Bigbulls, our mission transcends just numbers and charts. We're
              dedicated to transforming lives through financial empowerment.
              Here's our roadmap to your financial success.
            </h5> */}
            <div>
              <div class="container mb-5">
                <div class="row">
                  <div class="col-lg-12">
                    <h3 class="text-center head-small">
                      🎯 Our Goal: Empowering Financial Mastery 🌟
                    </h3>
                    <p className="text-center">
                      At Bigbulls, our mission transcends just numbers and
                      charts. We're dedicated to transforming lives through
                      financial empowerment. Here's our roadmap to your
                      financial success.
                    </p>
                    <ul class="timeline timelineul">
                      <li>
                        <div class="timeline-image">
                          <img
                            class="img-circle img-responsive"
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1700389872/bigbull/skills_1_bx45nn.png"
                            alt=""
                          />
                        </div>
                        <div class="timeline-panel">
                          <div class="timeline-heading">
                            <h4>Accessible Knowledge</h4>
                            {/* <h4 class="subheading">Subtitle</h4> */}
                          </div>
                          <div class="timeline-body">
                            <p class="text-muted">
                              We strive to demystify finance, making it
                              accessible to everyone. Our goal is to break down
                              complex concepts into bite-sized, understandable
                              nuggets of wisdom.
                            </p>
                          </div>
                        </div>
                        <div class="line"></div>
                      </li>
                      <li class="timeline-inverted">
                        <div class="timeline-image">
                          <img
                            class="img-circle img-responsive"
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1700390980/bigbull/consult_zoskcl.png"
                            alt=""
                          />
                        </div>
                        <div class="timeline-panel">
                          <div class="timeline-heading">
                            <h4>Practical Guidance</h4>
                            {/* <h4 class="subheading">Subtitle</h4> */}
                          </div>
                          <div class="timeline-body">
                            <p class="text-muted">
                              It's not just about theory; it's about actionable
                              steps. We're committed to offering practical
                              tools, strategies, and resources that you can
                              immediately implement to enhance your financial
                              well-being.
                            </p>
                          </div>
                        </div>
                        <div class="line"></div>
                      </li>
                      <li>
                        <div class="timeline-image">
                          <img
                            class="img-circle img-responsive"
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1700829981/bigbull/inclusivity_2_mz8tez.png"
                            alt=""
                          />
                        </div>
                        <div class="timeline-panel">
                          <div class="timeline-heading">
                            <h4>Inclusivity</h4>
                            {/* <h4 class="subheading">Subtitle</h4> */}
                          </div>
                          <div class="timeline-body">
                            <p class="text-muted">
                              Financial literacy knows no bounds. We're here to
                              support and educate individuals from all walks of
                              life, regardless of background or financial
                              expertise.
                            </p>
                          </div>
                        </div>
                        <div class="line"></div>
                      </li>
                      <li class="timeline-inverted">
                        <div class="timeline-image">
                          <img
                            class="img-circle img-responsive"
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1700389635/bigbull/skills_kpqbkv.png"
                            alt=""
                          />
                        </div>
                        <div class="timeline-panel">
                          <div class="timeline-heading">
                            <h4>Continuous Learning</h4>
                            {/* <h4 class="subheading">Subtitle</h4> */}
                          </div>
                          <div class="timeline-body">
                            <p class="text-muted">
                              The financial landscape evolves, and so do we. Our
                              commitment to staying updated with the latest
                              trends, insights, and changes ensures that you're
                              equipped with the most relevant and valuable
                              information.
                            </p>
                          </div>
                        </div>
                        <div class="line"></div>
                      </li>
                      <li>
                        <div class="timeline-image">
                          <img
                            class="img-circle img-responsive"
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1700830186/bigbull/engagement_bntldp.png"
                            alt=""
                          />
                        </div>
                        <div class="timeline-panel">
                          <div class="timeline-heading">
                            <h4>Community Engagement</h4>
                            {/* <h4 class="subheading">Subtitle</h4> */}
                          </div>
                          <div class="timeline-body">
                            <p class="text-muted">
                              Join our thriving community of learners! Share
                              experiences, seek advice, and grow together on
                              your financial journey. We believe in the strength
                              of collective wisdom.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Productslider /> */}
          <Homeblogs />
        </div>
      </Container>
    </>
  );
};

export default Home;
const Container = styled.div`
  // background: url("https://res.cloudinary.com/dq5upuxm8/image/upload/v1696505140/background1_d81fmy.png");

  .home-paragraph {
    margin-top: -1px;
  }
  .carousel-control-prev,
  .carousel-control-next {
    top: auto;
    bottom: 0;
    transform: translateY(50%);
  }

  /* Adjust the size of the Carousel control buttons */
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 30px;
    height: 30px;
  }

  /* Customize the appearance of the Carousel control buttons */
  .carousel-control-prev-icon:before,
  .carousel-control-next-icon:before {
    content: "";
    border: 2px solid #fff; /* You can change the border color */
    border-radius: 50%; /* Make the buttons circular */
  }

  .textjustify {
    text-align: justify;
  }

  .textshadow {
    text-shadow: 1px 1px 13px black;
  }

  .timeline {
    position: relative;
    padding: 4px 0 0 0;
    margin-top: 22px;
    list-style: none;
  }

  .timeline > li:nth-child(even) {
    position: relative;
    margin-bottom: 50px;
    height: 180px;
    right: -100px;
  }

  .timeline > li:nth-child(odd) {
    position: relative;
    margin-bottom: 50px;
    height: 180px;
    left: -100px;
  }

  .timeline > li:before,
  .timeline > li:after {
    content: " ";
    display: table;
  }

  .timeline > li:after {
    clear: both;
    min-height: 170px;
  }

  .timeline > li .timeline-panel {
    position: relative;
    float: left;
    width: 41%;
    padding: 0 20px 20px 30px;
    text-align: right;
  }

  .timeline > li .timeline-panel:before {
    right: auto;
    left: -15px;
    border-right-width: 15px;
    border-left-width: 0;
  }

  .timeline > li .timeline-panel:after {
    right: auto;
    left: -14px;
    border-right-width: 14px;
    border-left-width: 0;
  }

  .timeline > li .timeline-image {
    z-index: 100;
    position: absolute;
    left: 50%;
    border: 7px solid #3b5998;
    border-radius: 100%;
    background-color: #3b5998;
    box-shadow: 0 0 5px #4582ec;
    width: 200px;
    height: 200px;
    margin-left: -100px;
  }

  .timeline > li .timeline-image h4 {
    margin-top: 12px;
    font-size: 10px;
    line-height: 14px;
  }

  .timeline > li.timeline-inverted > .timeline-panel {
    float: right;
    padding: 0 30px 20px 20px;
    text-align: left;
  }

  .timeline > li.timeline-inverted > .timeline-panel:before {
    right: auto;
    left: -15px;
    border-right-width: 15px;
    border-left-width: 0;
  }

  .timeline > li.timeline-inverted > .timeline-panel:after {
    right: auto;
    left: -14px;
    border-right-width: 14px;
    border-left-width: 0;
  }

  .timeline > li:last-child {
    margin-bottom: 0;
  }

  .timeline .timeline-heading h4 {
    margin-top: 22px;
    margin-bottom: 4px;
    padding: 0;
    color: #583b04;
  }

  .timeline .timeline-heading h4.subheading {
    margin: 0;
    padding: 0;
    text-transform: none;
    font-size: 18px;
    color: #333333;
  }

  .timeline .timeline-body > p,
  .timeline .timeline-body > ul {
    margin-bottom: 0;
    color: #808080;
  }
  /*Style for even div.line*/
  .timeline > li:nth-child(odd) .line:before {
    content: "";
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 690px;
    width: 4px;
    height: 340px;
    background-color: #3b5998;
    -ms-transform: rotate(-44deg); /* IE 9 */
    -webkit-transform: rotate(-44deg); /* Safari */
    transform: rotate(-44deg);
    box-shadow: 0 0 5px #4582ec;
  }
  /*Style for odd div.line*/
  .timeline > li:nth-child(even) .line:before {
    content: "";
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 450px;
    width: 4px;
    height: 340px;
    background-color: #3b5998;
    -ms-transform: rotate(44deg); /* IE 9 */
    -webkit-transform: rotate(44deg); /* Safari */
    transform: rotate(44deg);
    box-shadow: 0 0 5px #4582ec;
  }
  /* Medium Devices, .visible-md-* */
  @media (min-width: 992px) and (max-width: 1199px) {
    .timeline > li:nth-child(even) {
      margin-bottom: 0px;
      min-height: 0px;
      right: 0px;
    }
    .timeline > li:nth-child(odd) {
      margin-bottom: 0px;
      min-height: 0px;
      left: 0px;
    }
    .timeline > li:nth-child(even) .timeline-image {
      left: 0;
      margin-left: 0px;
    }
    .timeline > li:nth-child(odd) .timeline-image {
      left: 690px;
      margin-left: 0px;
    }
    .timeline > li:nth-child(even) .timeline-panel {
      width: 76%;
      padding: 0 0 20px 0px;
      text-align: left;
    }
    .timeline > li:nth-child(odd) .timeline-panel {
      width: 70%;
      padding: 0 0 20px 0px;
      text-align: right;
    }
    .timeline > li .line {
      display: none;
    }
  }
  /* Small Devices, Tablets */
  @media (min-width: 768px) and (max-width: 991px) {
    .timeline > li:nth-child(even) {
      margin-bottom: 0px;
      min-height: 0px;
      right: 0px;
    }
    .timeline > li:nth-child(odd) {
      margin-bottom: 0px;
      min-height: 0px;
      left: 0px;
    }
    .timeline > li:nth-child(even) .timeline-image {
      left: 0;
      margin-left: 0px;
    }
    .timeline > li:nth-child(odd) .timeline-image {
      left: 520px;
      margin-left: 0px;
    }
    .timeline > li:nth-child(even) .timeline-panel {
      width: 70%;
      padding: 0 0 20px 0px;
      text-align: left;
    }
    .timeline > li:nth-child(odd) .timeline-panel {
      width: 70%;
      padding: 0 0 20px 0px;
      text-align: right;
    }
    .timeline > li .line {
      display: none;
    }
  }
  /* Custom, iPhone Retina */
  @media only screen and (max-width: 767px) {
    .timeline > li:nth-child(even) {
      margin-bottom: 0px;
      min-height: 0px;
      right: 0px;
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .timeline > li:nth-child(odd) {
      margin-bottom: 0px;
      min-height: 0px;
      left: 0px;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
    }
    .timeline > li .timeline-image {
      position: static;
      width: 150px;
      height: 106px;
      margin-bottom: 0px;
    }
    .timeline > li:nth-child(even) .timeline-image {
      left: 0;
      margin-left: 0;
    }
    .timeline > li:nth-child(odd) .timeline-image {
      float: right;
      left: 0px;
      margin-left: 0;
    }
    .timeline > li:nth-child(even) .timeline-panel {
      width: 100%;
      padding: 0 0 20px 14px;
      text-align: center;
    }
    .timeline > li:nth-child(odd) .timeline-panel {
      width: 100%;
      padding: 0 14px 20px 0px;
      text-align: center;
    }
    .timeline > li .line {
      display: none;
    }
  }

  .cr-img {
    height: 35rem;
    @media screen and (max-width: 500px) {
      height: 20rem !important;
    }
  }

  .timelineul {
    @media screen and (max-width: 500px) {
      display: flex;
      flex-direction: column;
      li {
        display: flex !important;
        flex-direction: row !important;
        margin-top: 2rem;
      }
    }
  }
`;
