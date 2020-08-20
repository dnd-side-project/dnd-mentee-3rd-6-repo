import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

/* 0.초기 상태 */

export const initialSate = {
  emailValidData: false,
  identifyLoading: false, // 본인인증(리캡챠) 시도 중
  identifyDone: false,
  identifyError: null,
  numberVerifyLoading: false, // 인증번호 시도 중
  numberVerifyDone: false,
  numberVerifyError: null,
  emailValidLoading: false, // 이메일 중복확인 시도 중
  emailValidDone: false,
  emailValidError: null,
};

/* 1.액션 */

export const IDENTIFY_REQUEST = 'auth/IDENTIFY_REQUEST';
export const IDENTIFY_SUCCESS = 'auth/IDENTIFY_SUCCESS';
export const IDENTIFY_FAILURE = 'auth/IDENTIFY_FAILURE';

export const NUMBER_VERIFY_REQUEST = 'auth/NUMBER_VERIFY_REQUEST';
export const NUMBER_VERIFY_SUCCESS = 'auth/NUMBER_VERIFY_SUCCESS';
export const NUMBER_VERIFY_FAILURE = 'auth/NUMBER_VERIFY_FAILURE';

export const EMAIL_VALID_REQUEST = 'auth/EMAIL_VALID_REQUEST';
export const EMAIL_VALID_SUCCESS = 'auth/EMAIL_VALID_SUCCESS';
export const EMAIL_VALID_FAILURE = 'auth/EMAIL_VALID_FAILURE';

export const PROFILE_IMAGE_REQUEST = 'auth/PROFILE_IMAGE_REQUEST';
export const PROFILE_IMAGE_SUCCESS = 'auth/PROFILE_IMAGE_SUCCESS';
export const PROFILE_IMAGE_FAILURE = 'auth/PROFILE_IMAGE_FAILURE';

/* 2.액션 생성함수 */

/* 3.사가 */

const emailValidAPI = (data) => {
  return axios.get(`/servants/isExist`, {
    params: { email: data },
  });
};

function* emailValid(action) {
  try {
    const result = yield call(emailValidAPI, action.data);
    console.log(result);
    yield put({
      type: EMAIL_VALID_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: EMAIL_VALID_FAILURE,
      error: error.response.data,
    });
  }
}

// const profileImage = (data) => {
//   return axios({
//     method: 'post',
//     headers: { 'Content-Type': 'multipart/form-data' },
//     url: '/api/signup/cats/profileimg',
//     data: JSON.stringify(data),
//   });
// };

function* watchEmailValid() {
  yield takeLatest(EMAIL_VALID_REQUEST, emailValid);
}

export function* authSaga() {
  yield all([fork(watchEmailValid)]);
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
        draft.numberVerifyLoading = false;
        draft.numberVerifyDone = true;
        break;
      case NUMBER_VERIFY_FAILURE:
        draft.numberVerifyLoading = false;
        draft.numberVerifyError = action.error;
        break;
      /* 이메일 중복확인 */
      case EMAIL_VALID_REQUEST:
        draft.emailValidLoading = true;
        draft.emailValidDone = false;
        draft.emailValidError = null;
        break;
      case EMAIL_VALID_SUCCESS:
        draft.emailValidData = action.data;
        draft.emailValidLoading = false;
        draft.emailValidDone = true;
        break;
      case EMAIL_VALID_FAILURE:
        draft.emailValidLoading = false;
        draft.emailValidError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
