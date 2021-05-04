import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import palette from '../../lib/styles/palette';
import { commentType } from '../../modules/comments';
import { userType } from '../../modules/user';

import CommentActionButtonsContainer from '../../containers/comment/CommentActionButtonsContainer';

const StyledCommentsListItem = styled.div`
  padding: 1rem;
  margin: 5px;
  border-bottom: 1.5px solid ${palette.gray[3]};
  &:nth-last-child(1) {
    border: none;
  }
`;

const UpperWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentInfo = styled.div`
  display: block;
`;

const Username = styled.div`
  color: ${palette.gray[6]};
  display: inline-block;
`;

const PublishedDateBlock = styled.div`
  padding-left: 0.5rem;
  font-size: 0.8rem;
  color: ${palette.gray[6]};
  display: inline-block;
`;

const CommentBodyBlock = styled.div`
  font-size: 1.05rem;
`;

const Styledtextarea = styled.textarea`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  outline: none;
  width: 100%;
  height: 4rem;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
`;

const StyledButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.gray[1]};
    color: ${palette.gray[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
`;

type CommentsListItemProps = {
  comment: commentType;
  user: userType | null;
  index: number;
  onUpdate: (commentId: string) => void;
  onChangeEditField: (edit: string) => void;
  onInitializeEditField: () => void;
};

function CommentsListItem({
  comment,
  user,
  index,
  onUpdate,
  onChangeEditField,
  onInitializeEditField,
}: CommentsListItemProps) {
  const ownComment = (user && user._id) === (comment && comment.user._id);

  // use editing flag. if true, change to textarea
  const [editing, setEditing] = useState<boolean>(false);
  const onEditing = useCallback(() => {
    onInitializeEditField();
    setEditing(!editing);
  }, [editing, setEditing, onInitializeEditField]);

  const onChangeEditComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeEditField(e.target.value);
  };

  return (
    <StyledCommentsListItem>
      <UpperWrapper>
        <CommentInfo>
          <Username>
            {index}. {comment.user.username}
          </Username>
          <PublishedDateBlock>
            ( {new Date(comment.publishedDate).toLocaleString()} )
          </PublishedDateBlock>
        </CommentInfo>

        {/* ActionButtons */}
        {!editing && (
          <CommentActionButtonsContainer
            comment={comment}
            ownComment={ownComment}
            onEditing={onEditing}
          />
        )}
      </UpperWrapper>
      <br />
      {!editing ? (
        <CommentBodyBlock>{comment.body}</CommentBodyBlock>
      ) : (
        <>
          <Styledtextarea
            placeholder={comment.body}
            onChange={onChangeEditComment}
          />
          <StyledButton
            onClick={() => {
              onEditing();
              onUpdate(comment._id);
            }}
          >
            수정
          </StyledButton>
          <StyledButton onClick={onEditing}>취소</StyledButton>
        </>
      )}
    </StyledCommentsListItem>
  );
}

export default CommentsListItem;
