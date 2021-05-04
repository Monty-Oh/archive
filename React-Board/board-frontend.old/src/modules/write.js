import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as postAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'wirte/CHANGE_FIELD';
const [ WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE ] = createRequestActionTypes('wirte/WRITE_POST');
const [ UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE ] = createRequestActionTypes('write/UPDATE_POST');

export const setOriginalPost = createAction(SET_ORIGINAL_POST, post => post);
export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD,  ({ key, value }) => ({ key, value }));
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({ title, body, tags }));
export const updatePost = createAction(UPDATE_POST, ({ id, title, body, tags}) => ({ id, title, body, tags}));

const updatePostSaga = createRequestSaga(UPDATE_POST, postAPI.updatePost);
const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);

export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
    yield takeLatest(UPDATE_POST, updatePostSaga);
};

const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
    originalPostId: null,
};

const write = handleActions({
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
        ...state,
        title: post.title,
        body: post.body,
        tags: post.tags,
        originalPostId: post._id,
    }),
    [INITIALIZE]: (state) => (initialState),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
        ...state,
        [key]: value
    }),
    [WRITE_POST]: (state) => ({
        ...state,
        post: null,
        postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
        ...state,
        post
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
        ...state,
        postError,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
        ...state,
        post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
        ...state,
        postError,
    }),
}, initialState);

export default write;