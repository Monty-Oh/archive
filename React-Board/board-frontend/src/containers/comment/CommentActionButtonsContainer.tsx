import React from 'react';
import CommentActionButtons from '../../components/comment/CommentActionButtons';

import { commentType } from '../../modules/comments';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../modules/comments';

// comment id 삭제 요청, comment id 수정 요청,

type CommentActionButtonsContainerProps = {
  comment: commentType;
  ownComment: boolean;
  onEditing: () => void;
};

function CommentActionButtonsContainer({
  comment,
  ownComment,
  onEditing,
}: CommentActionButtonsContainerProps) {
  const dispatch = useDispatch();

  const onRemove = async () => {
    try {
      dispatch(deleteComment(comment._id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CommentActionButtons
      ownComment={ownComment}
      onRemove={onRemove}
      onEditing={onEditing}
    />
  );
}

export default CommentActionButtonsContainer;
