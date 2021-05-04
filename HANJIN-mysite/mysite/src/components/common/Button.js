import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  /* font-weight: bold; */
  padding: 0.25rem 1rem;
  color: black;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  &:hover {
    background: ${palette.gray[4]};
  }
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
