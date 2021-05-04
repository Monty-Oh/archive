import { createAction, createReducer } from 'typesafe-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as commentsAPI from '../lib/api/comments';

// actions
const INITIALIZE = 'comment/INITIALIZE';
const CHANGE_FIELD = 'comment/CHANGE_FIELD';
const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('comment/WRITE_COMMENT');

// action Functions
export const initialize = createAction(INITIALIZE)<void>();

export type ChangeFieldPayload = {
  key: string;
  value: string;
};
export const changeField = createAction(
  CHANGE_FIELD,
  ({ key, value }: ChangeFieldPayload) => ({ key, value }),
)();

export type WriteCommentPayload = {
  body: string;
  postId: string;
};
export const writeComment = createAction(
  WRITE_COMMENT,
  ({ body, postId }: WriteCommentPayload) => ({ body, postId }),
)();

// Saga
const writeCommentSaga = createRequestSaga(
  WRITE_COMMENT,
  commentsAPI.writeComment,
);

export function* commentSaga() {
  yield takeLatest(WRITE_COMMENT, writeCommentSaga);
}

// State
type CommentState = {
  comment: string;
  commentError: any;
  commentSuccess: boolean;
  [index: string]: any;
};
const initialState: CommentState = {
  comment: '',
  commentSuccess: false,
  commentError: null,
};

// Reducer
const comment = createReducer<CommentState>(initialState, {
  [INITIALIZE]: () => initialState,
  [CHANGE_FIELD]: (state, action) => ({
    ...state,
    [action.payload.key]: action.payload.value,
  }),
  [WRITE_COMMENT_SUCCESS]: (state) => ({
    ...state,
    comment: '',
    commentSuccess: true,
    commentError: null,
  }),
  [WRITE_COMMENT_FAILURE]: (state, action) => ({
    ...state,
    commentError: action.payload,
  }),
});

export default comment;
