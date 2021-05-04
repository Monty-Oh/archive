import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { readPost, unloadPost } from '../../modules/post';
import { setOriginalPost } from '../../modules/write';
import PostViewer from '../../components/post/PostViewer';
import { RootState } from '../../modules';
import PostActionButtons from '../../components/post/PostActionButtons';
import { removePost } from '../../lib/api/posts';

type MatchParams = {
  postId: string;
};
function PostViewerContainer({
  match,
  history,
}: RouteComponentProps<MatchParams>) {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }: RootState) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));

    // 언마운트 시 리덕스에서 포스트데이터 삭제
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    if (post !== null) dispatch(setOriginalPost(post));
    history.push('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
}

export default withRouter(PostViewerContainer);
