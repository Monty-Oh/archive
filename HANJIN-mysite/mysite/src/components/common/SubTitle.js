import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const StyledSubTitle = styled.div`
    display: flex;
    font-size: 25px;
    font-weight: bold;
    border-bottom: 2px solid ${palette.coloredfont};
    /* &:after {
        content: "";
     flex: 1 1;
     border-bottom: 2px solid ${palette.coloredfont};
     margin: auto;
     margin-left: 30px;
     margin-right: 50px;
    } */
`;

const SubTitle = (props) => <StyledSubTitle {...props} />;

export default SubTitle;
