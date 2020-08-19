import { delay, put, takeLatest, getContext, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

import { NEXT_PAGE } from './pageNumber';

/* 초기 상태 */

export const initialSate = {
  userInfo: '',
  imagePath: '',
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  uploadImageLoading: false, // 프로필 사진 등록 시도 중
  uploadImageDone: false,
  uploadImageError: null,
};

/* 액션 */

export const LOG_IN_REQUEST = 'user/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'user/LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'user/LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'user/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'user/LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'user/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';

export const UPLOAD_IMAGE_REQUEST = 'user/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'user/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'user/UPLOAD_IMAGE_FAILURE';

export const GO_TO = 'GO_TO';

/* 사가 */

const logInAPI = (data) => {
  return axios.post('/auth/signin', data);
};

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

function* logOut() {
  try {
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

const signUpAPI = (data) => {
  return axios.post('/auth/signup', data);
};

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
    yield put({
      type: NEXT_PAGE,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

const uploadImageAPI = (data) => {
  return axios.post('/signup/cats/profileimg', data);
};

function* uploadImage(action) {
  console.log(action.data);
  try {
    const result = yield call(uploadImageAPI, action.data);
    console.log(result);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data,
    });
    yield put({
      type: NEXT_PAGE,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
      error: error.response.data,
    });
  }
}

function* goTo() {
  const history = yield getContext('history');
  history.push('/pheed');
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
}

function* watchGoTo() {
  yield takeLatest(GO_TO, goTo);
}

export function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchGoTo),
    fork(watchUploadImage),
    fork(watchSignUp),
  ]);
}

/* 리듀서 */

const user = (state = initialSate, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      /* 로그인 */
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.userInfo.accessToken = action.data.accessToken;
        draft.logInLoading = false;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      /* 로그아웃 */
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.userInfo = null;
        draft.logOutLoading = false;
        draft.logOutDone = true;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      /* 회원가입 */
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.userInfo = action.data;
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      /* 프로필 사진 등록 */
      case UPLOAD_IMAGE_REQUEST:
        draft.uploadImageLoading = true;
        draft.uploadImageDone = false;
        draft.signUpError = null;
        break;
      case UPLOAD_IMAGE_SUCCESS:
        draft.imagePath = action.data;
        draft.uploadImageLoading = false;
        draft.uploadImageDone = true;
        break;
      case UPLOAD_IMAGE_FAILURE:
        draft.uploadImageLoading = false;
        draft.uploadImageError = action.error;
        break;
      default:
        break;
    }
  });
};

export default user;
