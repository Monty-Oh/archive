import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import WriteActionButtons from "../../components/write/WriteActionButtons";
import { writePost, updatePost } from "../../modules/write";
import { RootState } from "../../modules";

function WriteActionButtonsContainer({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ write }: RootState) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    })
  );

  // 포스트 등록
  const onPublish = (): void => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, tags, id: originalPostId }));
      return;
    }
    dispatch(
      writePost({
        title,
        body,
        tags,
      })
    );
  };

  // 글쓰기 취소
  const onCancel = (): void => {
    history.goBack();
  };

  // 성공 혹은 실패
  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.username}/${_id}`);
    }
    if (postError) {
      console.error(postError);
    }
  }, [history, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
}

export default withRouter(WriteActionButtonsContainer);
