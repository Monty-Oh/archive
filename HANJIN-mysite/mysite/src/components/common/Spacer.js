import React from "react";
import styled from "styled-components";

const StyledSpacer = styled.div`
  height: 4rem;
`;

const StyledHalfSpacer = styled.div`
  height: 2rem;
`;

export const HalfSpacer = () => {
  return <StyledHalfSpacer />;
};

const Spacer = () => {
  return <StyledSpacer />;
};

export default Spacer;
