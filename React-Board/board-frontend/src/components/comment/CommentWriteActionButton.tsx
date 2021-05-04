import React from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const CommentWriteActionButtonBlock = styled.div`
  /* border-bottom: 1px solid ${palette.gray[2]}; */
  padding-bottom: 3rem;
  margin-bottom: 3rem;
`;

type CommentWriteActionButtonProps = {
  onWriteComment: () => void;
};
function CommentWriteActionButton({
  onWriteComment,
}: CommentWriteActionButtonProps) {
  return (
    <CommentWriteActionButtonBlock>
      <Button onClick={onWriteComment}>등록</Button>
    </CommentWriteActionButtonBlock>
  );
}

export default CommentWriteActionButton;
