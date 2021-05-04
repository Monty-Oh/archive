import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

// 액션 타입 한번에 선언
export function createRequestActionTypes(type: string): string[] {
  const SUCCESS: string = `${type}_SUCCESS`;
  const FAILURE: string = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
}

// api 요청 유틸 함수
export default function createRequestSaga(type: string, request: any) {
  const SUCCESS: string = `${type}_SUCCESS`;
  const FAILURE: string = `${type}_FAILURE`;

  return function* (action: any) {
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
        // HTTP 조회
        meta: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
