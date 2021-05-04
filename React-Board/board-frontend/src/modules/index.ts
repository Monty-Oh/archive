import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import comment, { commentSaga } from './comment';
import comments, { commentsSaga } from './comments';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  auth,
  user,
  loading,
  write,
  post,
  posts,
  comment,
  comments,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    writeSaga(),
    postSaga(),
    postsSaga(),
    commentSaga(),
    commentsSaga(),
  ]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
