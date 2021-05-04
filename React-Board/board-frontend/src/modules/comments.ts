import { createAction, createReducer } from 'typesafe-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as commentsAPI from '../lib/api/comments';

// actions
const UNLOAD_COMMENTS = 'comments/INITIALIZE';

const [
  LIST_COMMENTS,
  LIST_COMMENTS_SUCCESS,
  LIST_COMMENTS_FAILURE,
] = createRequestActionTypes('comments/LIST_COMMENTS');

// 삭제의 결과로 새로운 comments를 받아오기 때문에 comments 모듈에 위치
const [
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
] = createRequestActionTypes('comments/DELETE_COMMENT');

// 업데이트, 삭제와 동일
const [
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
] = createRequestActionTypes('comments/UPDATE_COMMENT');

// 업데이트 용도로 사용함. Field
const CHANGE_EDIT_FIELD = 'comments/CHANGE_FIELD';
// 업데이트 필드 초기화
const INITIALIZE_EDIT_FIELD = 'comments/INITIALIZE_EDIT_FIELD';

// action Functions
export const unloadComments = createAction(UNLOAD_COMMENTS)<void>();

export const listComments = createAction(LIST_COMMENTS)<string>();

export const deleteComment = createAction(DELETE_COMMENT)<string>();

export type UpdateCommentPayload = {
  body: string;
  commentId: string;
};
export const updateComment = createAction(
  UPDATE_COMMENT,
  ({ body, commentId }: UpdateCommentPayload) => ({ body, commentId }),
)();

export const changeEditField = createAction(CHANGE_EDIT_FIELD)<string>();

export const initializeEditField = createAction(INITIALIZE_EDIT_FIELD)<void>();
// Saga
const listCommentsSaga = createRequestSaga(
  LIST_COMMENTS,
  commentsAPI.getComments,
);

const deleteCommentSaga = createRequestSaga(
  DELETE_COMMENT,
  commentsAPI.deleteComment,
);

const updateCommentSaga = createRequestSaga(
  UPDATE_COMMENT,
  commentsAPI.updateComment,
);

export function* commentsSaga() {
  yield takeLatest(LIST_COMMENTS, listCommentsSaga);
  yield takeLatest(DELETE_COMMENT, deleteCommentSaga);
  yield takeLatest(UPDATE_COMMENT, updateCommentSaga);
}

// State
export type commentType = {
  body: string;
  postId: string;
  user: {
    username: string;
    _id: string;
  };
  _id: string;
  publishedDate: string;
  editing: boolean;
};

type CommentsState = {
  edit: string;
  comments: commentType[];
  commentsError: any;
};
const initialState: CommentsState = {
  edit: '',
  comments: [],
  commentsError: null,
};

// Reducer
const comments = createReducer<CommentsState>(initialState, {
  [LIST_COMMENTS_SUCCESS]: (state, action) => ({
    ...state,
    comments: action.payload,
    commentsError: null,
  }),
  [LIST_COMMENTS_FAILURE]: (state, action) => ({
    ...state,
    commentsError: action.payload,
  }),
  [DELETE_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    comments: action.payload,
    commentsError: null,
  }),
  [DELETE_COMMENT_FAILURE]: (state, action) => ({
    ...state,
    commentsError: action.payload,
  }),
  [UPDATE_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    comments: action.payload,
    commentsError: null,
  }),
  [UPDATE_COMMENT_FAILURE]: (state, action) => ({
    ...state,
    commentsError: action.payload,
  }),
  [CHANGE_EDIT_FIELD]: (state, action) => ({
    ...state,
    edit: action.payload,
  }),
  [INITIALIZE_EDIT_FIELD]: (state) => ({
    ...state,
    edit: '',
  }),
  [UNLOAD_COMMENTS]: () => initialState,
});

export default comments;
