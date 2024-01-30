import React from "react";
import styled from "styled-components";
import ManageNav from "./ManageNav";
import Navbar from "../../Navbar";
import { useNavigate, useParams } from "react-router-dom";

const AddChapter = () => {
  const { cid } = useParams();
  let navigate = useNavigate();
  console.log(cid);
  return (
    <>
      <Container>
        <div className="editcourse-outer">
          <Navbar />
          <ManageNav
            editcourse={false}
            addvideo={false}
            showvideos={false}
            courseid={cid}
            addChapter={true}
          />
        </div>
      </Container>
    </>
  );
};

export default AddChapter;
const Container = styled.div``;
