import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Styled from "styled-components";
import { Link } from "react-router-dom";

function Homeblogs() {
  return (
    <>
      <Container>
        <div className="container">
          <h2 className="text-center mb-5" id="lb">
            Latest Blog
          </h2>
        </div>
        <div className="container mb-5">
          <div className="card-group">
            <div className="card d-flex mr-3 shadow-0 h-100  ">
              <Link to="/blog-first">
                <img
                  className="card-img-top fluid rounded-5"
                  id="cbimg"
                  src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695988708/b1_pcueus.webp"
                  alt="Video Thumbnail"
                />
              </Link>
              <div className="card-body">
                <Link to="/blog-first">
                  <p>September 29, 2023 Time: 12:00 PM (noon)</p>
                  <p>my first blog </p>
                </Link>
              </div>
            </div>

            <div className="card d-flex mr-3 shadow-0 h-100  ">
              <Link to="/blog-second">
                <img
                  className=" card-img-top fluid rounded-5"
                  src="https://res.cloudinary.com/dwivqhrnx/image/upload/v1695988709/b4_meihuf.webp"
                  alt="Video Thumbnail"
                />
              </Link>
              <div className="card-body">
                <Link to="/blog-second">
                  <p>September 29, 2023 Time: 12:00 PM (noon)</p>
                  <p>my second blog</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
export default Homeblogs;
const Container = Styled.div`
#lb{
    font-size:50px;
    font-weight:700;
    color:orange;
}
a{
    text-decoration:none;
}

`;
