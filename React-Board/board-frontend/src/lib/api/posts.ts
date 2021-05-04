import client from './client';
import { WritePostPayload, UpdatePostPayload } from '../../modules/write';
import { ListPostsPayload } from '../../modules/posts';
import qs from 'qs';

export const writePost = async ({ title, body, tags }: WritePostPayload) => {
  // console.log(title, body, tags);
  return await client.post('/api/posts', { title, body, tags });
};

export const readPost = async (id: string) => {
  return await client.get(`/api/posts/${id}`);
};

export const listPosts = async ({ page, username, tag }: ListPostsPayload) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return await client.get(`/api/posts?${queryString}`);
};

export const updatepost = async ({
  id,
  title,
  body,
  tags,
}: UpdatePostPayload) =>
  await client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
  });

export const removePost = async (id: string) =>
  client.delete(`/api/posts/${id}`);

export const uploadImage = async (image: FormData) => {
  return await client.post('/api/posts/file/image', image);
};
