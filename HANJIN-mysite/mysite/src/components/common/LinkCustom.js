import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const StyledLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${palette.gray[3]};
  border-radius: 2px;
  padding: 1rem;

  margin: 0 auto;
  width: 100%;
  height: 5rem;
  @media (max-width: 1024px) {
    height: auto;
  }

  cursor: pointer;
  overflow: hidden;

  &:hover {
    background: ${palette.gray[4]};
    border: 1px solid ${palette.gray[6]};
    .intext {
      p {
        color: black;
      }
    }
  }

  img {
    /* border-radius: 100rem; */
    width: 30rem;
    height: 30rem;
    @media (max-width: 1024px) {
      width: 10rem;
      height: 10rem;
    }
  }
  .intext {
    display: inline-block;
    h3 {
    }
    p {
      color: ${palette.gray[6]};
      font-size: 14px;
    }
  }
`;

// 링크 컴포넌트에 url props와 h3와 p 태그를 이용해 제목, 설명을 넣고
// img 태그로 이미지를 넣으면 됨.

const LinkCustom = ({ children, url, ...rest }) => {
  return (
    <StyledLink onClick={() => window.open(url, "_blank")} {...rest}>
      {children}
    </StyledLink>
  );
};

export default LinkCustom;
