import { delay, put, takeLatest, all, fork, call } from 'redux-saga/effects';
import produce from 'immer';
import axios from 'axios';

import { NEXT_PAGE } from './pageNumber';

/* 0.초기 상태 */

export const initialSate = {
  userSignUp: {
    username: '',
    phoneNumber: null,
    email: '',
    password: '',
    isServant: 0,
  },
  // accessToken= '',
  identifyLoading: false, // 본인인증(리캡챠) 시도 중
  identifyDone: false,
  identifyError: null,
  numberVerifyLoading: false, // 인증번호 시도 중
  numberVerifyDone: false,
  numberVerifyError: null,
  nextRegisterPageLoading: false, // 회원가입 3페이지
  nextRegisterPageDone: false,
  nextRegisterPageError: null,
};

/* 1.액션 */

export const IDENTIFY_REQUEST = 'auth/IDENTIFY_REQUEST';
export const IDENTIFY_SUCCESS = 'auth/IDENTIFY_SUCCESS';
export const IDENTIFY_FAILURE = 'auth/IDENTIFY_FAILURE';

export const NUMBER_VERIFY_REQUEST = 'auth/NUMBER_VERIFY_REQUEST';
export const NUMBER_VERIFY_SUCCESS = 'auth/NUMBER_VERIFY_SUCCESS';
export const NUMBER_VERIFY_FAILURE = 'auth/NUMBER_VERIFY_FAILURE';

export const NEXT_REGISTER_PAGE_REQUEST = 'auth/NEXT_REGISTER_PAGE_REQUEST';
export const NEXT_REGISTER_PAGE_SUCCESS = 'auth/NEXT_REGISTER_PAGE_SUCCESS';
export const NEXT_REGISTER_PAGE_FAILURE = 'auth/NEXT_REGISTER_PAGE_FAILURE';

export const PROFILE_IMAGE_REQUEST = 'auth/PROFILE_IMAGE_REQUEST';
export const PROFILE_IMAGE_SUCCESS = 'auth/PROFILE_IMAGE_SUCCESS';
export const PROFILE_IMAGE_FAILURE = 'auth/PROFILE_IMAGE_FAILURE';

/* 2.액션 생성함수 */

/* 3.사가 */

const postSignUp = (data) => {
  return axios({
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    url: '/api/auth/signup',
    data: JSON.stringify(data),
  });
};

function* nextRegisterPage(action) {
  try {
    const result = call(postSignUp, action.data);
    yield delay(1000);
    yield put({
      type: NEXT_REGISTER_PAGE_SUCCESS,
      data: action.data,
    });
    yield put({
      type: NEXT_PAGE,
    });
  } catch (error) {
    yield put({
      type: NEXT_REGISTER_PAGE_FAILURE,
      error: error.response.data,
    });
  }
}

const profileImage = (data) => {
  return axios({
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/api/signup/cats/profileimg',
    data: JSON.stringify(data),
  });
};

function* watchNextRegisterPage() {
  yield takeLatest(NEXT_REGISTER_PAGE_REQUEST, nextRegisterPage);
}

export function* authSaga() {
  yield all([fork(watchNextRegisterPage)]);
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
      /* 회원가입 3페이지 */
      case NEXT_REGISTER_PAGE_REQUEST:
        draft.nextRegisterPageLoading = true;
        draft.nextRegisterPageDone = false;
        draft.nextRegisterPageError = null;
        break;
      case NEXT_REGISTER_PAGE_SUCCESS:
        draft.userSignUp = action.data;
        // draft.accessToken = action.data;
        draft.nextRegisterPageLoading = false;
        draft.nextRegisterPageDone = true;
        break;
      case NEXT_REGISTER_PAGE_FAILURE:
        draft.nextRegisterPageLoading = false;
        draft.nextRegisterPageError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
