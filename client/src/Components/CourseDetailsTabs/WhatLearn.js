import React from "react";
import styled from "styled-components";
import { BsCheck2Circle } from "react-icons/bs";
import { MdOndemandVideo, MdOutlineArticle } from "react-icons/md";
import { GrResources, GrCertificate } from "react-icons/gr";
import { BiMobileAlt } from "react-icons/bi";

const WhatLearn = () => {
  return (
    <>
      <Container>
        <div>
          <h2 className="mt-5">What you'll learn</h2>
          <div>
            <div className="row mt-5">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="d-flex justify-content-evenly">
                  <div className="mr-3 mt-1">
                    {" "}
                    <BsCheck2Circle />
                  </div>

                  <p>
                    Master the most up-to-date concepts, tools, principles, and
                    language project managers use in their daily roles.
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="d-flex justify-content-evenly">
                  <div className="mr-3 mt-1">
                    {" "}
                    <BsCheck2Circle />
                  </div>

                  <p>
                    Master the most up-to-date concepts, tools, principles, and
                    language project managers use in their daily roles.
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="d-flex justify-content-evenly">
                  <div className="mr-3 mt-1">
                    {" "}
                    <BsCheck2Circle />
                  </div>

                  <p>
                    Master the most up-to-date concepts, tools, principles, and
                    language project managers use in their daily roles.
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="d-flex justify-content-evenly">
                  <div className="mr-3 mt-1">
                    {" "}
                    <BsCheck2Circle />
                  </div>

                  <p>
                    Master the most up-to-date concepts, tools, principles, and
                    language project managers use in their daily roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mt-4">This course includes:</h4>
            <div>
              <div className="row mt-5">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <ul>
                    <li>
                      <div className="d-flex ">
                        <div className="mr-3 mt-1">
                          <MdOndemandVideo />
                        </div>
                        <p>39.5 hours on-demand video</p>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex ">
                        <div className="mr-3 mt-1">
                          <MdOutlineArticle />
                        </div>
                        <p>28 articles</p>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex ">
                        <div className="mr-3 mt-1">
                          <GrResources />
                        </div>
                        <p>83 downloadable resources</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <ul>
                    <li>
                      <div className="d-flex ">
                        <div className="mr-3 mt-1">
                          <BiMobileAlt />
                        </div>
                        <p>Access on mobile and TV</p>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex ">
                        <div className="mr-3 mt-1">
                          <GrCertificate />
                        </div>
                        <p>Certificate of completions</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default WhatLearn;
const Container = styled.div``;
