import React from "react";
import styled from "styled-components";
import Responsive from "./Responsive";
import Button from "./Button";
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

// 속성 추가해서 새로운 컴포넌트 생성
const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
  .boardLogo {
    width: 1.2rem;
    margin-right: 0.5rem;
  }
`;

// 헤더가 fixed로 되어있기 때문에 헤더라 컨텐츠 안가리게끔...
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <div>
      <StyledHeader>
        <Wrapper>
          <Link to="/" className="logo">
            <img className="boardLogo" src="/logo192.png" alt="" />
            리액트 게시판
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}님 어서오세요!</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </StyledHeader>
      <Spacer />
    </div>
  );
};

export default Header;
