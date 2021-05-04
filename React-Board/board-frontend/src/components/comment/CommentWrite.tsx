import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import CommentWriteActionButtonContainer from '../../containers/comment/CommentWriteActionButtonContainer';
import { ChangeFieldPayload } from '../../modules/comment';

const StyledCommentWrite = styled(Responsive)`
  margin-top: 3rem;
`;

const Styledtextarea = styled.textarea`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  outline: none;
  width: 100%;
  height: 5rem;

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

type CommentWriteProps = {
  user: {
    username: string;
  } | null;
  commentSuccess: boolean;
  onChangeField: (payload: ChangeFieldPayload) => void;
  onCleanComment: () => void;
  callListComments: () => void;
};

// useEffect 추가
function CommentWrite({
  user,
  commentSuccess,
  onCleanComment,
  onChangeField,
  callListComments,
}: CommentWriteProps) {
  const textAreaEl = useRef<HTMLTextAreaElement>(null);

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeField({
      key: 'comment',
      value: e.target.value,
    });
  };

  useEffect(() => {
    if (!commentSuccess) return;
    if (!textAreaEl.current) return;
    textAreaEl.current.value = '';
    onCleanComment();
    callListComments();
  }, [commentSuccess, onCleanComment, callListComments]);

  return (
    <StyledCommentWrite>
      {user && (
        <>
          <h3>{user.username}님 댓글을 입력하세요</h3>
          <Styledtextarea
            placeholder="input comment"
            onChange={onChangeComment}
            ref={textAreaEl}
          />
          <CommentWriteActionButtonContainer />
        </>
      )}
    </StyledCommentWrite>
  );
}

export default CommentWrite;
