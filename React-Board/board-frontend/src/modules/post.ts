import { createAction, createReducer } from 'typesafe-actions';
import { takeLatest } from 'redux-saga/effects';

import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { userType } from './user';

// actions
const UNLOAD_POST = 'post/UNLOAD_POST';
const [
  READ_POST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
] = createRequestActionTypes('post/READ_POST');

// actionFunctions
export const readPost = createAction(READ_POST, (postId: string) => postId)();
export const unloadPost = createAction(UNLOAD_POST)<void>();

// Saga
const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

// State
export type postType = {
  _id: string;
  body: string;
  publishedDate: Date;
  tags: string[];
  title: string;
  user: userType;
};
type PostState = {
  post: postType | null;
  error: any;
  [index: string]: any;
};

const initialState: PostState = {
  post: null,
  error: null,
};

// Reducer
const post = createReducer<PostState>(initialState, {
  [READ_POST_SUCCESS]: (state, action) => ({
    ...state,
    post: action.payload,
  }),
  [READ_POST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [UNLOAD_POST]: () => initialState,
});

export default post;
