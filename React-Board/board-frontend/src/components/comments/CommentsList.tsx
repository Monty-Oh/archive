import React from 'react';
import styled from 'styled-components';

import Responsive from '../common/Responsive';
import CommentsListItem from './CommentsListItem';
import { commentType } from '../../modules/comments';
import { userType } from '../../modules/user';
import palette from '../../lib/styles/palette';

const StyledCommentsList = styled(Responsive)`
  /* border: 1.5px solid ${palette.gray[3]}; */
  border-top: none;
`;

const CommentHeaderBlock = styled.div`
  border-bottom: 2px solid ${palette.gray[4]};
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;

type CommentsListProps = {
  comments: commentType[];
  user: userType | null;
  onUpdate: (commentId: string) => void;
  onChangeEditField: (edit: string) => void;
  onInitializeEditField: () => void;
};

function CommentsList({
  comments,
  user,
  onUpdate,
  onChangeEditField,
  onInitializeEditField,
}: CommentsListProps) {
  return (
    <StyledCommentsList>
      <CommentHeaderBlock>comment</CommentHeaderBlock>
      {comments.map((comment, index) => (
        <CommentsListItem
          key={comment._id}
          comment={comment}
          user={user}
          index={index + 1}
          onUpdate={onUpdate}
          onChangeEditField={onChangeEditField}
          onInitializeEditField={onInitializeEditField}
        />
      ))}
    </StyledCommentsList>
  );
}

export default CommentsList;
