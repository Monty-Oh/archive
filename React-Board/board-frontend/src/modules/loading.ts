import { createAction, createReducer } from 'typesafe-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(
  START_LOADING,
  (start: string) => start,
)();
export const finishLoading = createAction(
  FINISH_LOADING,
  (finish: string) => finish,
)();

type LoadingState = {
  [index: string]: boolean;
};

const initialState: LoadingState = {};

const loading = createReducer<LoadingState>(initialState, {
  [START_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: true,
  }),
  [FINISH_LOADING]: (state, action) => ({
    ...state,
    [action.payload]: false,
  }),
});

export default loading;
