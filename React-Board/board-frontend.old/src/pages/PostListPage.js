import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from '../containers/post/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';

const PostListPage = () => {
    return (
        <div>
            <HeaderContainer />
            {/* <PaginationContainer /> */}
            <PostListContainer />
            <PaginationContainer />
        </div>
    )
};

export default PostListPage;