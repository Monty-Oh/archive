import React from "react";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import LinkCustom from "../common/LinkCustom";
import Context from "../common/Context";
import { FcBusinessman, FcCommandLine } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import address from "../../lib/github/address";

const StyledProfile = styled(Responsive)`
    background: none;
    height: 100%;
`;

const ProfileWrapper = styled.div`
    padding: 1rem;
`;

const ProfileImg = styled.img`
    background: white;
    width: 8rem;
    overflow: hidden;
    margin-top: -8rem;
    @media (max-width: 1024px) {
        display: flex;
        margin: 0 auto;
        margin-top: -14rem;
    }
`;

const Profile = () => {
    return (
        <StyledProfile>
            <ProfileImg src={`${address.imgSrc}ohhanjin.jpg`} alt="" />
            <ProfileWrapper>
                <Context>
                    <h1>오 한진 Han Jin Oh</h1>
                    <h3>
                        안녕하세요! 프론트엔드 백엔드 둘 다 관심이 많은
                        신입개발자 입니다.
                    </h3>
                    <h3>
                        <FcBusinessman className="icon" />
                        Profile
                    </h3>
                    <div className="text">
                        <p>&middot; 수원 효원고등학교 졸업 2013.02</p>
                        <p>&middot; 경기대학교 컴퓨터과학과 입학 2013.03</p>
                        <p>&middot; 경기대학교 컴퓨터과학과 졸업 2019.08</p>
                        <p>
                            <AiOutlineMail className="icon" />
                            ohhanjin0330@gmail.com
                        </p>
                    </div>
                    <h3>
                        <FiGithub className="icon" />
                        GitHub
                    </h3>

                    <LinkCustom url={address.HeaderButton}>
                        <div className="intext">
                            <h3>korHANJINOH</h3>
                            <p>github repositories for korHANJINOH</p>
                        </div>
                        <img
                            src={`${address.imgSrc}githubprofile.png`}
                            alt=""
                        />
                    </LinkCustom>
                    <div className="text">
                        <p>
                            과거의 팀 프로젝트나 개인 사이드 프로젝트를 진행중인
                            GitHub 계정입니다.
                        </p>
                    </div>
                </Context>
                <Context>
                    <h3>
                        <FcCommandLine className="icon" />
                        Skills & Stack
                    </h3>
                    <div className="text">
                        <p>저는 이러한 기술을 배웠고 다룰 줄 압니다.</p>
                        <p>&middot; html, CSS</p>
                        <p>&middot; C, Java, JavaScript</p>
                        <p>&middot; Node.js (Express, Koa 웹 프레임워크)</p>
                        <p>&middot; React.js</p>
                        <p>&middot; MySQL, MongoDB</p>
                        <p>&middot; Linux</p>
                        <p>&middot; AWS</p>
                        <p>&middot; Typescript</p>
                    </div>
                </Context>
            </ProfileWrapper>
        </StyledProfile>
    );
};

export default Profile;
