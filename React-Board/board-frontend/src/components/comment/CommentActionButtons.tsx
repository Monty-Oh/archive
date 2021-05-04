import React from 'react';
import { FiX } from 'react-icons/fi';
import { BsPencil } from 'react-icons/bs';
import palette from '../../lib/styles/palette';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    color: ${palette.gray[6]};
  }
`;

type CommentActionButtonsProps = {
  ownComment: boolean;
  onRemove: () => void;
  onEditing: () => void;
};

function CommentActionButtons({
  ownComment,
  onRemove,
  onEditing,
}: CommentActionButtonsProps) {
  return (
    <div>
      {ownComment && (
        <>
          <StyledButton title="수정" onClick={() => onEditing()}>
            <BsPencil />
          </StyledButton>
          <StyledButton title="삭제" onClick={() => onRemove()}>
            <FiX />
          </StyledButton>
        </>
      )}
    </div>
  );
}

export default CommentActionButtons;
