import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentWriteContainer from '../containers/comment/CommentWriteContainer';
import CommentsListContainer from '../containers/comments/CommentsListContainer';

function PostPage() {
  return (
    <>
      <HeaderContainer />
      <PostViewerContainer />
      <CommentsListContainer />
      <CommentWriteContainer />
    </>
  );
}

export default PostPage;
