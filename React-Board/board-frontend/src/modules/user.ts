import { createAction, createReducer } from 'typesafe-actions';
import { takeLatest, call } from 'redux-saga/effects';

import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

// actions
// 새로고침 이후 임시 로그인
const TEMP_SET_USER = 'user/TEMP_SET_USER';

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);

const LOGOUT = 'user/LOGOUT';

// actionFunctions
// 로그인 유지를 위한 액션함수
export const tempSetUser = createAction(TEMP_SET_USER)<string>();

export const check = createAction(CHECK)<void>();

export const logout = createAction(LOGOUT)<void>();

const checkSaga = createRequestSaga(CHECK, authAPI.check);

// CHECK_FAILURE때 호출되는 사가, 로그인 정보가 유효하지 않을 때 실행
// 로그인 정보가 만료 되었을 때 정보를 초기화한다.
function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

// State
export type userType = {
  username: string;
  _id: string;
};
type UserState = {
  user: userType | null;
  checkError: string | null;
};
const initialState: UserState = {
  user: null,
  checkError: null,
};

// reducer
const user = createReducer<UserState>(initialState, {
  [TEMP_SET_USER]: (state, action) => ({
    ...state,
    user: action.payload,
  }),

  [CHECK_SUCCESS]: (state, action) => ({
    ...state,
    checkError: null,
    user: action.payload,
  }),

  [CHECK_FAILURE]: (state, action) => ({
    ...state,
    checkError: action.payload,
    user: null,
  }),

  [LOGOUT]: (state) => ({
    ...state,
    user: null,
  }),
});

export default user;
