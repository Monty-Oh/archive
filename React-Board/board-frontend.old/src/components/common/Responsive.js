import React from 'react';
import styled from 'styled-components';

// 반응형 디자인을 할 때 편리하게 하기 위한 컴포넌트
const StyledResponsive = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    width: 1024px;
    margin: 0 auto;

    /* 브라우저 크기에 따른 크기 변화. */
    @media (max-width: 1024px) {
        width: 768px;
    }
    @media (max-width: 768px) {
        width: 100%;
    }
`;

// 나머지 props를 사용할 수 있게 ...rest를 사용하여 StyledResponsive 전달
const Responsive = ({ children, ...rest }) => {
    return <StyledResponsive {...rest}>{children}</StyledResponsive>
}

export default Responsive