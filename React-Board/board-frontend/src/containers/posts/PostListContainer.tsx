import React, { useEffect } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { RootState } from '../../modules';

function PostListContainer({ location }: RouteComponentProps) {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }: RootState) => ({
      posts: posts.posts,
      loading: loading['posts/LIST_POSTS'],
      error: posts.error,
      user: user.user,
    }),
  );

  useEffect(() => {
    const { tag, username, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user ? true : false}
    />
  );
}

export default withRouter(PostListContainer);
