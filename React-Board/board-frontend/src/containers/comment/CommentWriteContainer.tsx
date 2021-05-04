import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../modules/comment';
import { listComments } from '../../modules/comments';
import CommentWrite from '../../components/comment/CommentWrite';
import { RootState } from '../../modules';

function CommentWriteContainer() {
  const dispatch = useDispatch();
  const { user, commentError, commentSuccess, post } = useSelector(
    ({ user, comment, post }: RootState) => ({
      user: user.user,
      commentError: comment.commentError,
      commentSuccess: comment.commentSuccess,
      post: post.post,
    }),
  );

  const callListComments = useCallback(() => {
    if (post !== null) return dispatch(listComments(post._id));
  }, [dispatch, post]);

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  const onCleanComment = useCallback(() => dispatch(initialize()), [dispatch]);

  // error
  useEffect(() => {
    if (commentError) {
      console.error(commentError);
    }
  }, [commentError]);

  return (
    <CommentWrite
      commentSuccess={commentSuccess}
      user={user}
      onChangeField={onChangeField}
      onCleanComment={onCleanComment}
      callListComments={callListComments}
    />
  );
}

export default CommentWriteContainer;
