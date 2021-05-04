import React from 'react';

import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
// import RootTest from './TreeGraph';

function PostListPage() {
  return (
    <>
      <HeaderContainer />
      {/* <RootTest /> */}
      <PostListContainer />
      <PaginationContainer />
    </>
  );
}

export default PostListPage;
