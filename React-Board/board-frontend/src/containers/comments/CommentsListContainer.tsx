import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommentsList from '../../components/comments/CommentsList';
import {
  listComments,
  unloadComments,
  updateComment,
  changeEditField,
  initializeEditField,
} from '../../modules/comments';
import { RootState } from '../../modules';

function CommentsListContainer() {
  const dispatch = useDispatch();
  const { post, comments, commentsError, user, edit } = useSelector(
    ({ post, comments, user }: RootState) => ({
      post: post.post,
      comments: comments.comments,
      commentsError: comments.commentsError,
      user: user.user,
      edit: comments.edit,
    }),
  );

  // commentError
  useEffect(() => {
    if (commentsError) console.error(commentsError);
  }, [commentsError]);

  // get Comments
  useEffect(() => {
    if (post !== null) {
      dispatch(listComments(post._id));
    }
    return () => {
      dispatch(unloadComments());
    };
  }, [dispatch, post]);

  const onUpdate = (commentId: string) => {
    dispatch(updateComment({ commentId, body: edit }));
  };

  const onChangeEditField = useCallback(
    (edit) => {
      dispatch(changeEditField(edit));
    },
    [dispatch],
  );

  const onInitializeEditField = useCallback(() => {
    dispatch(initializeEditField());
  }, [dispatch]);

  return (
    <CommentsList
      comments={comments}
      user={user}
      onUpdate={onUpdate}
      onChangeEditField={onChangeEditField}
      onInitializeEditField={onInitializeEditField}
    />
  );
}

export default CommentsListContainer;
