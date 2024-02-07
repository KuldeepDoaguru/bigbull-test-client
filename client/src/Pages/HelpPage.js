import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import styled from "styled-components";

const HelpPage = () => {
  return (
    <>
      <Container>
        <div className="help-cont">
          <div className="container">
            <h1 className="mt-2 text-center">
              We will be very happy to help you
            </h1>
            <div className="row mt-3 g-2">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                <div class="card shadow pt-5 pb-5">
                  <div class="card-body">
                    <h5 class="card-title text-center">Payment Support</h5>
                    <div className="spcont mt-3 g-5">
                      <FiPhoneCall className="svgcontact" />
                      <a href="tel:+918602480679">+918602480679</a>
                    </div>

                    <div className="spcont">
                      <span>
                        <AiOutlineMail className="svgcontact" />
                      </span>
                      <a href="mailto:bigbulleducation0@gmail.com">
                        bigbulleducation0@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                {" "}
                <div class="card shadow pt-5 pb-5">
                  <div class="card-body">
                    <h5 class="card-title text-center">Technical Support</h5>
                    <div className="spcont mt-3 g-5">
                      <FiPhoneCall className="svgcontact" />
                      <a href="tel:+918602480679">+918602480679</a>
                    </div>

                    <div className="spcont">
                      <span>
                        <AiOutlineMail className="svgcontact" />
                      </span>
                      <a href="mailto:bigbulleducation0@gmail.com">
                        bigbulleducation0@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                {" "}
                <div class="card shadow pt-5 pb-5">
                  <div class="card-body">
                    <h5 class="card-title text-center">Instructor Support</h5>
                    <div className="spcont mt-3 g-5">
                      <FiPhoneCall className="svgcontact" />
                      <a href="tel:+918602480679">+918602480679</a>
                    </div>

                    <div className="spcont">
                      <span>
                        <AiOutlineMail className="svgcontact" />
                      </span>
                      <a href="mailto:bigbulleducation0@gmail.com">
                        bigbulleducation0@gmail.com
                      </a>
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

export default HelpPage;
const Container = styled.div`
  .help-cont {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spcont {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    a {
      margin-left: 0.5rem;
      text-decoration: none;
      color: #2f6d73;
    }
  }
`;
