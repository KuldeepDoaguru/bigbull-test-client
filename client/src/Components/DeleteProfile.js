import React from "react";
import styled from "styled-components";

const DeleteProfile = () => {
  return (
    <>
      <Container>
        <div className="container">
          <h2 className="fw-bold fs-2 text-center mb-3">
            Please share a reason to delete account
          </h2>
          <div className="container d-flex flex-column">
            <label className="fw-bold">* Write a Reason *</label>
            <br />
            <textarea
              name="text"
              id="text"
              cols="60"
              rows="10"
              className="border rounded p-3"
              placeholder="write a reason......."
            ></textarea>
            <br />
            <div className="d-flex">
              <button className="btn btn-info">Submit</button>
              <p className="mx-2 mt-2">OR</p>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DeleteProfile;
const Container = styled.div``;
