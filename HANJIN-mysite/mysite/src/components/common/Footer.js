import React from "react";
import styled from "styled-components";
import Button from "./Button";
import address from "../../lib/github/address";

const StyledFooter = styled.div`
  text-align: center;
  vertical-align: middle;
  margin-top: 5rem;
  height: 3rem;
  width: 100%;

  color: black;
`;

const StyledText = styled.div`
  display: inline-block;
  img {
    height: 4rem;
  }
  a {
    font-size: 17px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <StyledText>
        <Button>
          <a
            href={address.footerSiteInfo}
            target="_blank"
            rel="noopener noreferrer"
          >
            site Info
          </a>
        </Button>
      </StyledText>
    </StyledFooter>
  );
};

export default Footer;
