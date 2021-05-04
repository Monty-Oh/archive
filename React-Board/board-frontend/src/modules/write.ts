import { createAction, createReducer } from 'typesafe-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { postType } from './post';

// actions
const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST');
const [
  UPLOAD_IMAGES,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
] = createRequestActionTypes('post/UPLOAD_IMAGES');

// action Functions
export const initialize = createAction(INITIALIZE)<void>();

export type ChangeFieldPayload = {
  key: string;
  value: string | string[];
};
export const changeField = createAction(
  CHANGE_FIELD,
  ({ key, value }: ChangeFieldPayload) => ({ key, value }),
)();

export type WritePostPayload = {
  title: string;
  body: string;
  tags: string[];
};
export const writePost = createAction(
  WRITE_POST,
  ({ title, body, tags }: WritePostPayload) => ({ title, body, tags }),
)();

export const setOriginalPost = createAction(
  SET_ORIGINAL_POST,
  (post: postType) => post,
)();

export type UpdatePostPayload = {
  id: string;
  title: string;
  body: string;
  tags: string[];
};
export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body, tags }: UpdatePostPayload) => ({ id, title, body, tags }),
)();

export const uploadImages = createAction(UPLOAD_IMAGES)<FormData>();

// Saga
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatepost);
const uploadImageSaga = createRequestSaga(UPLOAD_IMAGES, postsAPI.uploadImage);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
  yield takeLatest(UPLOAD_IMAGES, uploadImageSaga);
}

// State
type WriteState = {
  title: string;
  body: string;
  tags: string[];
  post: postType | null;
  postError: any;
  originalPostId: string | null;
  imageSrc: string;
  uploadError: any;
  [index: string]: any;
};
const initialState: WriteState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
  imageSrc: '',
  uploadError: null,
};

// reducer
const write = createReducer<WriteState>(initialState, {
  [INITIALIZE]: () => initialState,
  [CHANGE_FIELD]: (state, action) => ({
    ...state,
    [action.payload.key]: action.payload.value,
  }),
  [WRITE_POST]: (state) => ({
    ...state,
    post: null,
    postError: null,
  }),
  [WRITE_POST_SUCCESS]: (state, action) => ({
    ...state,
    post: action.payload,
  }),
  [WRITE_POST_FAILURE]: (state, action) => ({
    ...state,
    postError: action.payload,
  }),
  [SET_ORIGINAL_POST]: (state, action) => ({
    ...state,
    title: action.payload.title,
    body: action.payload.body,
    tags: action.payload.tags,
    originalPostId: action.payload._id,
  }),
  [UPDATE_POST_SUCCESS]: (state, action) => ({
    ...state,
    post: action.payload,
  }),
  [UPDATE_POST_FAILURE]: (state, action) => ({
    ...state,
    postError: action.payload,
  }),
  [UPLOAD_IMAGES_SUCCESS]: (state, action) => ({
    ...state,
    imageSrc: action.payload,
  }),
  [UPLOAD_IMAGES_FAILURE]: (state, action) => ({
    ...state,
    uploadError: action.payload,
  }),
});

export default write;
