import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import palette from "../../lib/styles/palette";
import { AiFillGithub } from "react-icons/ai";
import Button from "./Button";
import { HalfSpacer } from "./Spacer";
import address from "../../lib/github/address";

const StyledHeader = styled.div`
  color: black;
  position: fixed;
  width: 100%;
  background: ${palette.gray[0]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: black;
    }
  }
`;

const Img = styled.div`
  width: ${window.innerWidth};
  height: 18rem;
  img {
    overflow: hidden;
    width: 100%;
    height: 100%;
    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Wrapper>
          <div className="left">OH HAN JIN</div>
          <div className="right">
            {/* <Button>
              <AiOutlineMail />
            </Button> */}
            <Button>
              <a
                href={address.HeaderButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </Button>
          </div>
        </Wrapper>
      </StyledHeader>
      <Img>
        <img src={`${address.imgSrc}background.png`} alt="" />
        {/* <img src="/assets/background2.png" alt="" /> */}
      </Img>
      <HalfSpacer />
    </>
  );
};

export default Header;
