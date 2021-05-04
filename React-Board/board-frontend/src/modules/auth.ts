import { createAction, createReducer } from 'typesafe-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';

import { userType } from './user';
import * as authAPI from '../lib/api/auth';

// actions
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
);

// action Functions
type ChangeFieldPayload = {
  form: string;
  name: string;
  value: string;
};
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, name, value }: ChangeFieldPayload) => ({ form, name, value }),
)();

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (form: string) => form,
)();

export type UserForm = {
  username: string;
  password: string;
};
export const register = createAction(
  REGISTER,
  ({ username, password }: UserForm) => ({ username, password }),
)();
export const login = createAction(
  LOGIN,
  ({ username, password }: UserForm) => ({ username, password }),
)();

// Saga
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

// State
type AuthState = {
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
  };
  login: {
    username: string;
    password: string;
  };
  auth: userType | null;
  authError: any;
  [index: string]: any;
};
const initialState: AuthState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = createReducer<AuthState>(initialState, {
  [CHANGE_FIELD]: (state, action) => ({
    ...state,
    [action.payload.form]: {
      ...state[action.payload.form],
      [action.payload.name]: action.payload.value,
    },
  }),
  [INITIALIZE_FORM]: (state, action) => ({
    ...state,
    [action.payload]: initialState[action.payload],
  }),
  [REGISTER_SUCCESS]: (state, action) => ({
    ...state,
    authError: null,
    auth: action.payload,
  }),
  [REGISTER_FAILURE]: (state, action) => ({
    ...state,
    authError: action.payload,
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    authError: null,
    auth: action.payload,
  }),
  [LOGIN_FAILURE]: (state, action) => ({
    ...state,
    authError: action.payload,
  }),
});

export default auth;
