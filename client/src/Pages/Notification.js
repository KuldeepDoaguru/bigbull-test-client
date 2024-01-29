import React from "react";
import styled from "styled-components";

const Notification = () => {
  return (
    <>
      <Container>
        <div className="container not-box">
          <h1 className="text-center">No notification yet</h1>
        </div>
      </Container>
    </>
  );
};

export default Notification;
const Container = styled.div`
  .not-box {
    height: 100vh;
  }
`;
