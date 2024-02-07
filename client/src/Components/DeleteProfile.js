import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useNavigate } from "react-router-dom";

const DeleteProfile = () => {
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const [reason, setReason] = useState(false);
  const [textReason, setTextReason] = useState("");
  const navigate = useNavigate();

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `https://bigbulls.co.in/api/v1/auth/deleteUser/${user.id}`
      );
      console.log(response);
      cogoToast.success("user deleted successfully");
      localStorage.removeItem("userData");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getReasonBeforeDeleteAccount = async () => {
    try {
      const response = await axios.post(
        `https://bigbulls.co.in/api/v1/auth/getUserDeleteReason/${user.id}`,
        {
          text: textReason,
        }
      );

      console.log(response);
      setReason(true);
      setTextReason("");
      cogoToast.success(
        "Reason submitted successfully now you can delete the account"
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(textReason);

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
              value={textReason}
              onChange={(e) => setTextReason(e.target.value)}
              placeholder="write a reason......."
            ></textarea>
            <br />
            <div className="d-flex">
              <button
                className="btn btn-info"
                onClick={getReasonBeforeDeleteAccount}
              >
                Submit
              </button>
              <p className="mx-2 mt-2">OR</p>
              <button
                type="button"
                disabled={!reason}
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Delete
              </button>
              {/* <button
                className="btn btn-danger"
                disabled={!reason}
                onClick={deleteUser}
              >
                Delete
              </button> */}
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <h2 className="text-center">
                  Do you really want to delete account ?
                </h2>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                  Back
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={deleteUser}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DeleteProfile;
const Container = styled.div``;
