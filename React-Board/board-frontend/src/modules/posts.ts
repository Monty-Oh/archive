import { createAction, createReducer } from 'typesafe-actions';
import { takeLatest } from 'redux-saga/effects';

import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { postType } from './post';

// actions
const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');

// actionFunctions
export type ListPostsPayload = {
  tag: any;
  username: any;
  page: any;
};
export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page }: ListPostsPayload) => ({ tag, username, page }),
)();

// Saga
const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

// State
type PostsState = {
  posts: postType[] | null;
  error: any;
  lastPage: number;
};
const initialState: PostsState = {
  posts: null,
  error: null,
  lastPage: 1,
};

// reducer
const posts = createReducer<PostsState>(initialState, {
  [LIST_POSTS_SUCCESS]: (state, action: any) => ({
    ...state,
    posts: action.payload,
    lastPage: parseInt(action.meta.headers['last-page'], 10),
  }),
  [LIST_POSTS_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
});

export default posts;
