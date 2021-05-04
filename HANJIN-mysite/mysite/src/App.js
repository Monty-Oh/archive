import React from "react";
import Main from "./pages/Main";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import palette from "./lib/styles/palette";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const StyledApp = styled.div`
  /* background: ${palette.gray[0]}; */
  background: white;
`;

function App() {
  return (
    <StyledApp>
      <Helmet>
        <title>오 한진 Han Jin Oh</title>
      </Helmet>
      <Header />
      <Main />
      <Footer />
    </StyledApp>
  );
}

export default App;
