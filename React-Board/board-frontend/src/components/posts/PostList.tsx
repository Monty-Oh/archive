import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { postType } from '../../modules/post';

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const WritePostButtonWrraper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const TitleSubInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostItemBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;

  &:first-child {
    padding-top: 0;
  }

  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }

  p {
    margin-top: 2rem;
  }
`;

type PostItemProps = {
  post: postType;
};

function PostItem({ post }: PostItemProps) {
  const { publishedDate, user, tags, title, body, _id } = post;
  return (
    <PostItemBlock>
      <TitleSubInfoWrapper>
        <h2>
          <Link to={`/@${user.username}/${_id}`}>{title}</Link>
        </h2>
        <SubInfo
          username={user.username}
          publishedDate={new Date(publishedDate)}
        />
      </TitleSubInfoWrapper>
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
}

type PostListProps = {
  posts: postType[] | null;
  loading: boolean;
  error: any;
  showWriteButton: boolean;
};

function PostList({ posts, loading, error, showWriteButton }: PostListProps) {
  if (error) return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  return (
    <PostListBlock>
      <WritePostButtonWrraper>
        {/* 사용자 정보가 유효할 때 글 작성 가능 */}
        {showWriteButton && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrraper>
      {/* 로딩 중이 아닐 때 */}
      {!loading && posts && (
        <div>
          {posts.map((post: postType) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
}

export default PostList;
