import React from "react";
import Styled from "styled-components";
import backgroundImg from "../../image/bgwebp.webp";
import aboutbanner from "../../image/About_bbtone.webp";
import { GiSkills } from "react-icons/gi";
function Aboutus() {
  return (
    <>
      <Container>
        <div>{/* <img src={aboutbanner} alt="about" /> */}</div>
        <div className="container-fluid bgColor">
          <div className="row">
            <div className="col-sm-6">
              <h2>About Us</h2>
              <p>
                Welcome to Bigbulls where we believe that financial knowledge is
                the key to a secure future. We are dedicated to providing you
                with comprehensive and accessible financial education that will
                pave the way for your prosperity.
              </p>
              <p>
                Our personalized approach and industry expertise set us apart,
                ensuring that you receive tailored guidance for your specific
                financial goals.
              </p>

              <p className="row mt-5">
                <span className="col-sm-2 iconkey">
                  <img
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1700389872/bigbull/skills_1_bx45nn.png"
                    width={"50px"}
                    alt="key"
                  />
                </span>
                <span className="col-sm-10 content">
                  <strong>
                    Expert-led courses and workshops for all skill levels.
                  </strong>
                </span>
              </p>

              <p className="row my-3">
                <span className="col-sm-2 iconkey">
                  <img
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1700390714/bigbull/tools_kkdnuj.png"
                    width={"50px"}
                    alt="key"
                  />
                </span>
                <span className="col-sm-10 content">
                  <strong>
                    Interactive tools for practical application of financial
                    strategies
                  </strong>
                </span>
              </p>

              <p className="row my-3">
                <span className="col-sm-2 iconkey">
                  <img
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1700390980/bigbull/consult_zoskcl.png"
                    width={"50px"}
                    alt="icon"
                  />
                </span>
                <span className="col-sm-10 content">
                  <strong>
                    Personalized consultations to address your unique financial
                    needs
                  </strong>
                </span>
              </p>

              <button className="btn btn-primary btn-lg my-5">
                Contact us
              </button>
            </div>
            <div className="col-sm-6 ">
              <img
                className="img-fluid"
                src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697631822/bullt_p8ivfj.png"
                alt="contact"
              />
            </div>
          </div>
          {/* editing  */}
          <div className="container mb-5 mt-5 ">
            <div className="text-center mb-5">
              <h3>Meet Our Expert</h3>
            </div>
            <div>
              <div>
                <div>
                  <div className="card-group">
                    <div className="card cardteam d-flex mr-3  h-100">
                      <img
                        src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697632905/tty_kok97u.png"
                        className="card-img-top"
                        alt=""
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">Mr. Narendra Singh</h5>
                        <p>Advisor</p>
                      </div>
                    </div>
                    <div className="card cardteam d-flex mr-3  h-100">
                      <img
                        src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697632905/tty_kok97u.png"
                        className="card-img-top"
                        alt=""
                      />

                      <div className="card-body text-center">
                        <h5 className="card-title">Mr. Narendra Singh</h5>
                        <p>Advisor</p>
                      </div>
                    </div>
                    <div className="card cardteam d-flex mr-3  h-100">
                      <img
                        src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697632905/tty_kok97u.png"
                        className="card-img-top"
                        alt=""
                      />

                      <div className="card-body text-center">
                        <h5 className="card-title">Mr. Narendra Singh</h5>
                        <p>Advisor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid py-3 my-5 ">
            <div className="container-fluid ">
              <div className="row">
                {/* <div className="col-sm-6">
                  <img
                    className="img-fluid"
                    src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697632311/avvvv_gybcz1.png"
                    alt="meme"
                  />
                </div> */}
                <div className="col-sm-12">
                  <h2 className="mb-4 text-center textshadow">
                    Why Choose Us for Your Financial Education?
                  </h2>
                  <p>
                    At Bigbulls , we stand apart as your premier destination for
                    comprehensive and accessible financial education. Here's why
                    our platform is the optimal choice for your journey towards
                    financial empowerment:
                  </p>
                  <div className="container">
                    <div className="row mt-5 g-4">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="card shadow p-2">
                          <div class="card-body">
                            <h4 className="text-center">
                              Expertise and Credibility
                            </h4>
                            <p>
                              Our content is curated and created by seasoned
                              financial experts with a wealth of experience in
                              diverse financial domains. Trust the insights and
                              guidance from professionals who understand the
                              nuances of personal finance.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="card shadow p-2 rounded">
                          <div class="card-body">
                            <h4 className="text-center">
                              Accessible Learning Experience
                            </h4>
                            <p>
                              We prioritize simplicity without sacrificing
                              depth. Complex financial concepts are broken down
                              into easily digestible content, ensuring everyone,
                              regardless of background, can grasp and apply
                              essential financial knowledge.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="card shadow p-2 rounded">
                          <div class="card-body">
                            <h4 className="text-center">
                              Practical Application
                            </h4>
                            <p>
                              Beyond theory, we focus on actionable advice. Our
                              content is designed to equip you with practical
                              tools, strategies, and resources that you can
                              immediately implement in your financial life.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="card shadow p-2 rounded">
                          <div class="card-body">
                            <h4 className="text-center">
                              Continuous Updates and Relevance
                            </h4>
                            <p>
                              The financial landscape evolves rapidly. We're
                              committed to providing up-to-date information,
                              keeping you informed about the latest trends,
                              regulations, and strategies, ensuring the content
                              remains relevant and valuable.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="card shadow p-2 rounded">
                          <div class="card-body">
                            <h4 className="text-center">
                              Community and Support
                            </h4>
                            <p>
                              Join a vibrant community of individuals dedicated
                              to enhancing their financial literacy. Engage in
                              discussions, share experiences, and seek guidance
                              from both experts and fellow learners through our
                              forums and interactive features.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="card shadow p-2 rounded">
                          <div class="card-body">
                            <h4 className="text-center">
                              Privacy and Security
                            </h4>
                            <p>
                              Your privacy and security are paramount to us.
                              Rest assured that your information is handled with
                              the utmost care, adhering to stringent security
                              protocols to safeguard your data. your data will
                              be safe with us.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mb-5">
            <div className="text-center mb-5">
              <h2 className="stuh">Student Reviews of our Institution</h2>
            </div>
            <div
              id="carouselExampleControls"
              class="carousel slide text-center carousel-dark"
              data-bs-ride="carousel"
            >
              <div>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="card cardshadow h-100 w-100">
                        <div className="d-flex justify-content-center">
                          <img
                            class="rounded-circle shadow-1-strong m-3"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                            alt="avatar"
                          />
                        </div>
                        <div class="row d-flex justify-content-center">
                          <div className="">
                            <h5>Anna Deynah</h5>
                            <p>UX Designer</p>
                            <ul class="list-unstyled d-flex justify-content-center text-warning mb-1">
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="far fa-star fa-sm"></i>
                              </li>
                            </ul>
                            <p class="text-justify p-2">
                              I never thought managing my finances could be this
                              empowering! Thank you, Bigbulls, for the
                              eye-opening experience.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="card cardshadow h-100 w-100">
                        <div className="d-flex justify-content-center">
                          <img
                            class="rounded-circle shadow-1-strong m-3"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                            alt="avatar"
                          />
                        </div>
                        <div class="row d-flex justify-content-center">
                          <div>
                            <h5 class="">Anna Deynah</h5>
                            <p>UX Designer</p>
                            <ul class="list-unstyled d-flex justify-content-center text-warning  my-0 mb-1">
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="far fa-star fa-sm"></i>
                              </li>
                            </ul>
                            <p class="text-justify p-2">
                              your project involves creating complex,
                              interactive, and data-driven web applications,
                              ReactJS is an excellent choice. It excels in
                              handling real-time updates, dynamic content, and
                              single-page applications (SPAs).
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div className="card cardshadow h-100 w-100">
                        <div className="d-flex justify-content-center">
                          <img
                            class="rounded-circle shadow-1-strong m-3"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                            alt="avatar"
                          />
                        </div>
                        <div class="row d-flex justify-content-center p-3">
                          <div>
                            <h5 class="">Anna Deynah</h5>
                            <p>UX Designer</p>
                            <ul class="list-unstyled d-flex justify-content-center text-warning  my-0">
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="fas fa-star fa-sm"></i>
                              </li>
                              <li>
                                <i class="far fa-star fa-sm"></i>
                              </li>
                            </ul>
                            <p class="text-justify">
                              your project involves creating complex,
                              interactive, and data-driven web applications,
                              ReactJS is an excellent choice. It excels in
                              handling real-time updates, dynamic content, and
                              single-page applications (SPAs).
                            </p>
                          </div>
                        </div>
                      </div>
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
}

export default Aboutus;
const Container = Styled.div`
background: url("https://res.cloudinary.com/dq5upuxm8/image/upload/v1696838093/backgroupbb_t9p15q.png");
// margin-top:6rem;
.bgColor {
    // background-color: #eee;
    padding:40px;
    @media screen and (max-width:500px){
      padding:20px;
    }
}
.card-img-top{
  height:250px;
  justify-content:center;
  align-items:center;
}
.bgColorCount{
    background: rgba(237, 205, 205, 0.67);
}


.tag{
    text-align: center;
    font-size: 1.1rem
}
.fa-heart{
    color: rgba(255, 230, 0, 0.959);
    font-size: 30px
}

.cardteam{
  background-color: #652d8f;
    border: none;
    display: flex!important;
    align-content: center;
    justify-content: center;
    padding: 1rem;
    align-items: center;
    border-radius: 1rem;
    img{
      height: auto;
      width: 10rem;
    }
    .card-title{
      color:white;

    }
    p{
      color:grey;
    }
}
.content{
  display: flex;
  align-items: center;
}

.iconkey{
  display: flex;
  justify-content: flex-end;
}

.textshadow{
  text-shadow:1px 1px 1px black;
}

.cardshadow{
  background-color:transparent !important;
  border:none;
  img{
    box-shadow: 0px 3px 14px #645c5c;
  }
  h5{
    margin:0rem;
    
  }
  p{
    margin:0rem;
  }
}

.stuh{
  color: orange;
  text-shadow: 1px 1px 5px black;
}


`;
