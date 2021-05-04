import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Helmet } from 'react-helmet-async';
import Button from '../common/Button';
import { withRouter } from 'react-router-dom';

const StyledButtonToList = styled(Button)`
    font-size: 0.875rem;
    margin-bottom: 4rem;
`;

const StyledPostViewer = styled(Responsive)`
    margin-top: 4rem;
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

const PostViewer = ({ post, error, loading, actionButtons, history }) => {
    if (error) {
        if (error.response && error.response.status === 404)
            return <StyledPostViewer>존재하지 않는 포스트 입니다...</StyledPostViewer>;
        return <StyledPostViewer>오류 발생!!</StyledPostViewer>;
    }

    if (loading || !post) return null;

    const { title, body, user, publishedDate, tags } = post;

    const onClick = () => {
        history.push('/');
    }

    return (
        <StyledPostViewer>
            <Helmet>
                <title>{title}-REACTERS</title>
            </Helmet>
            <PostHead>
                <StyledButtonToList onClick={onClick}>목록으로</StyledButtonToList>
                <h1>{title}</h1>
                <SubInfo 
                    username={user.username}
                    publishedDate={publishedDate}
                    hasMarginTop
                />
                <Tags tags={tags} />
            </PostHead>
            {actionButtons}
            {/* HTML을 적용하고 싶다면  dangerouslySetInnerHTML 라는 props를 설정해 주어야 한다.*/}
            <PostContent 
                dangerouslySetInnerHTML={{ __html: body }}
            />
        </StyledPostViewer>
    )
}

export default withRouter(PostViewer);