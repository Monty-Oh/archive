import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const StyledSubInfo = styled.div`
    ${(props) =>
        props.hasMarginTop &&
        css`
            margin-top: 1rem;
        `}
        color: ${palette.gray[6]};

        span + span:before {
            color: ${palette.gray[4]};
            padding-left: 0.25rem;
            padding-right: 0.25rem;
            content: '\\B7';
        }
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
    return (
        <StyledSubInfo hasMarginTop={hasMarginTop}>
            <span>
                <b>
                    <Link to={`/?username=${username}`}>{username}</Link>
                </b>
            </span>
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </StyledSubInfo>
    );
};

export default SubInfo;
