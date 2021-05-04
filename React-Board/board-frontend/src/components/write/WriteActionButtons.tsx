import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const WriteActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

// 태그박스 버튼과 같은 높이
const StyledButton = styled(Button)`
  height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

type WriteActionButtonsProps = {
  onPublish: () => void;
  onCancel: () => void;
  isEdit: boolean;
};

function WriteActionButtons({
  onPublish,
  onCancel,
  isEdit,
}: WriteActionButtonsProps) {
  return (
    <WriteActionButtonBlock>
      <StyledButton cyan onClick={onPublish}>
        포스트 {isEdit ? "수정" : "등록"}
      </StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonBlock>
  );
}

export default WriteActionButtons;
