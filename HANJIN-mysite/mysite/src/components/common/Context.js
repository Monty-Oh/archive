import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const StyledContext = styled.div`
  text-align: left;
  height: 100%;
  .text {
    line-height: 1rem;
    font-size: 1rem;
    font-weight: bold;
    padding-bottom: 1rem;
  }
  .icon {
    padding-right: 0.5rem;
    font-size: 1.3rem;
  }
  padding-bottom: 1rem;
  border-bottom: 1px solid ${palette.gray[3]};
`;

const Context = ({ children }) => {
  return <StyledContext>{children}</StyledContext>;
};

export default Context;
