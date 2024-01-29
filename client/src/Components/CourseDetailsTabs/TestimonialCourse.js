import React from "react";
import styled from "styled-components";

const TestimonialCourse = () => {
  return (
    <>
      <Container>
        <h2 className="mt-5">Why people choose Bigbull's this course</h2>
        <div className="container">
          <div className="row g-3 mt-5">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div class="card">
                <div class="card-body">
                  <div className="card-dvi mt-3 d-flex justify-content-between">
                    <img
                      src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697632905/tty_kok97u.png"
                      alt=""
                      srcset=""
                    />
                    <div>
                      <h5>Mahesh Kuldeep</h5>
                      <p className="subh">Full Stack Developer</p>
                    </div>
                  </div>
                  <p class="card-text">
                    "Some quick example text to build on the card title and make
                    up the bulk of the card's content."
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div class="card">
                <div class="card-body">
                  <div className="card-dvi mt-3 d-flex justify-content-between">
                    <img
                      src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697632905/tty_kok97u.png"
                      alt=""
                      srcset=""
                    />
                    <div>
                      <h5>Mahesh Kuldeep</h5>
                      <p className="subh">Full Stack Developer</p>
                    </div>
                  </div>
                  <p class="card-text">
                    "Some quick example text to build on the card title and make
                    up the bulk of the card's content."
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div class="card">
                <div class="card-body">
                  <div className="card-dvi mt-3 d-flex justify-content-between">
                    <img
                      src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1697632905/tty_kok97u.png"
                      alt=""
                      srcset=""
                    />
                    <div>
                      <h5>Mahesh Kuldeep</h5>
                      <p className="subh">Full Stack Developer</p>
                    </div>
                  </div>
                  <p class="card-text">
                    "Some quick example text to build on the card title and make
                    up the bulk of the card's content."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TestimonialCourse;
const Container = styled.div`
  .card-dvi {
    img {
      height: 3rem;
      border-radius: 50%;
      width: 3rem;
    }
  }
`;
