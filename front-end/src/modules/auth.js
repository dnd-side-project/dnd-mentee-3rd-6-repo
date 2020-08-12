import { delay, put, takeLatest, all, fork } from 'redux-saga/effects';
import produce from 'immer';

/* 0.초기 상태 */

export const initialSate = {
  userSignUp: {
    username: '',
    phoneNumber: null,
    email: '',
    password: '',
    isButler: false,
  },
  numberVerify: null,
  identifyLoading: false, // 본인인증 시도 중
  identifyDone: false,
  identifyError: null,
  numberVerifyLoading: false, // 인증번호 시도 중
  numberVerifyDone: false,
  numberVerifyError: null,
};

/* 1.액션 */

export const IDENTIFY_REQUEST = 'auth/IDENTIFY_REQUEST';
export const IDENTIFY_SUCCESS = 'auth/IDENTIFY_SUCCESS';
export const IDENTIFY_FAILURE = 'auth/IDENTIFY_FAILURE';

export const NUMBER_VERIFY_REQUEST = 'auth/NUMBER_VERIFY_REQUEST';
export const NUMBER_VERIFY_SUCCESS = 'auth/NUMBER_VERIFY_SUCCESS';
export const NUMBER_VERIFY_FAILURE = 'auth/NUMBER_VERIFY_FAILURE';

/* 2.액션 생성함수 */

// 생략 가능

/* 3.사가 */

// const identifyAPI = (data) => {
//   return axios.post('api/signup/sms', data);
// };

function* identify(action) {
  try {
    // const result = yield call(identifyAPI, action.data);
    const result = 101010;
    yield delay(1000);
    yield put({
      type: IDENTIFY_SUCCESS,
      data: result, // 인증번호
    });
  } catch (error) {
    yield put({
      type: IDENTIFY_FAILURE,
      error: error.response.data,
    });
  }
}

function* numberVerify(action) {
  try {
    yield delay(1000);
    yield put({
      type: NUMBER_VERIFY_SUCCESS,
      data: action.data, // 회원가입 객체
    });
  } catch (error) {
    yield put({
      type: NUMBER_VERIFY_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchIdentify() {
  yield takeLatest(IDENTIFY_REQUEST, identify);
}

function* watchNumberVerify() {
  yield takeLatest(NUMBER_VERIFY_REQUEST, numberVerify);
}
export function* authSaga() {
  yield all([fork(watchIdentify), fork(watchNumberVerify)]);
}

/* 4.리듀서 */

const reducer = (state = initialSate, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      /* 본인인증 */
      case IDENTIFY_REQUEST:
        draft.identifyLoading = true;
        draft.identifyDone = false;
        draft.identifyError = null;
        break;
      case IDENTIFY_SUCCESS:
        draft.numberVerify = action.data; // 인증번호가 들어감
        draft.identifyLoading = false;
        draft.identifyDone = true;
        break;
      case IDENTIFY_FAILURE:
        draft.identifyLoading = false;
        draft.identifyError = action.error;
        break;
      /* 인증번호 */
      case NUMBER_VERIFY_REQUEST:
        draft.numberVerifyLoading = true;
        draft.numberVerifyDone = false;
        draft.numberVerifyError = null;
        break;
      case NUMBER_VERIFY_SUCCESS:
        draft.userSignUp.phoneNumber = action.data.phoneNumber; // 회원가입에 필요한 form
        draft.userSignUp.username = action.data.username; // 회원가입에 필요한 form
        draft.numberVerifyLoading = false;
        draft.numberVerifyDone = true;
        break;
      case NUMBER_VERIFY_FAILURE:
        draft.numberVerifyLoading = false;
        draft.numberVerifyError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
