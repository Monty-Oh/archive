import client from './client';
import { WriteCommentPayload } from '../../modules/comment';
import { UpdateCommentPayload } from '../../modules/comments';

import qs from 'qs';

// post comments?post=${postId} & body
export const writeComment = async ({ body, postId }: WriteCommentPayload) => {
  const queryString = qs.stringify({
    postId,
  });
  return await client.post(`/api/comments?${queryString}`, { body });
};

// get comments?post=${postId}
export const getComments = async (postId: string) => {
  const queryString = qs.stringify({
    postId,
  });
  const result = await client.get(`/api/comments?${queryString}`);
  return result;
};

// delete comment?id=${_id}
export const deleteComment = async (commentId: string) => {
  const result = await client.delete(`/api/comments/${commentId}`);
  return result;
};

export const updateComment = async ({
  commentId,
  body,
}: UpdateCommentPayload) => {
  const result = await client.put(`/api/comments/${commentId}`, { body });
  return result;
};
