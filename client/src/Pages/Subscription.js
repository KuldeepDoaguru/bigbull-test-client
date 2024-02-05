import React from "react";
import styled from "styled-components";

const Subscription = () => {
  return (
    <>
      <Container>
        <div className="mainbucks">
          <h1 className="text-center mt-3">No Subscription yet</h1>
        </div>
      </Container>
    </>
  );
};

export default Subscription;
const Container = styled.div`
  .mainbucks {
    height: 100vh;
  }
`;
