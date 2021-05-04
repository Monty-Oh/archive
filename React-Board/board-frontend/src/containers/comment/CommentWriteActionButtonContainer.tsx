import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentWriteActionButton from '../../components/comment/CommentWriteActionButton';

import { writeComment } from '../../modules/comment';
import { RootState } from '../../modules';

function CommentWriteActionButtonContainer() {
  const dispatch = useDispatch();
  const { post, comment } = useSelector(({ post, comment }: RootState) => ({
    post: post.post,
    comment: comment.comment,
  }));

  // 댓글 등록
  const onWriteComment = (): void => {
    if (post !== null && comment !== '') {
      dispatch(
        writeComment({
          body: comment,
          postId: post._id,
        }),
      );
    }
  };

  return <CommentWriteActionButton onWriteComment={onWriteComment} />;
}

export default CommentWriteActionButtonContainer;
