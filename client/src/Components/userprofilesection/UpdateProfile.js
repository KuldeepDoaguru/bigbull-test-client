import React from "react";
import styled from "styled-components";

const UpdateProfile = () => {
  return (
    <>
      <Container>
        <div className="d">
          <h2 className="text-center">Update Profile</h2>
          <hr />
        </div>
        <div className="container w8">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Fullname"
              aria-label="Fullname"
              aria-describedby="basic-addon1"
            />
          </div>
          <h4 className="fw-bold">Connection Links :</h4>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="website"
              aria-label="website"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon3">
              Twitter
            </span>
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon3">
              Facebook
            </span>
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon3">
              Instagram
            </span>
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default UpdateProfile;
const Container = styled.div`
  .w8 {
    width: 80%;
  }
`;
