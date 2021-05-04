import React from "react";
import styled from "styled-components";
import Profile from "../components/contents/Profile";
import Projects from "../components/contents/Projects";

const StyledMain = styled.div``;

const Main = () => {
  return (
    <>
      <StyledMain>
        {/* <ClickBarContainer />
        {clicked["PROFILE"] && <Profile />}
        {clicked["PROJECTS"] && <Projects />} */}
        <Profile />
        <Projects />
      </StyledMain>
    </>
  );
};

export default Main;
