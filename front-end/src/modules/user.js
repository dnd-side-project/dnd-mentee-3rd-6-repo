import { put, takeLatest, getContext, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';
import { RESET_AUTH_INFO } from './auth';

/* 초기 상태 */

export const initialSate = {
  userInfo: {},
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  loadUserInfoLoading: false, // 유저 정보 가져오기
  loadUserInfoDone: false,
  loadUserInfoError: null,
};

/* 액션 */

export const LOG_IN_REQUEST = 'user/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'user/LOG_IN_FAILURE';

export const LOG_OUT = 'user/LOG_OUT';

export const SIGN_UP_REQUEST = 'user/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';

export const LOAD_USER_INFO_REQUEST = 'user/LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'user/LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'user/LOAD_USER_INFO_FAILURE';

export const GO_TO_FEED = 'user/GO_TO_FEED';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';

/* 사가 */

const logInAPI = (data) => {
  return axios.post('/auth/sign-in', data);
};

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    yield put({
      type: GO_TO_FEED,
    });
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

const signUpAPI = (data) => {
  return axios.post('/auth/sign-up', data);
};

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
    yield put({
      type: GO_TO_FEED,
    });
    yield put({
      type: RESET_AUTH_INFO,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

const loadUserInfoAPI = (data) => {
  const headers = { Authorization: `Bearer ${data}` };

  return axios.get('/auth/me', { headers });
};

function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.data);
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: error.response.data,
    });
  }
}

function* goTo() {
  const history = yield getContext('history');
  history.push('/feed');
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchGoTo() {
  yield takeLatest(GO_TO_FEED, goTo);
}

export function* userSaga() {
  yield all([fork(watchGoTo), fork(watchLogIn), fork(watchSignUp), fork(watchUserInfo)]);
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
        localStorage.setItem(ACCESS_TOKEN, action.data.accessToken);
        draft.logInLoading = false;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      /* 로그아웃 */
      case LOG_OUT:
        localStorage.setItem(ACCESS_TOKEN, null);
        draft.userInfo = null;
        draft.logOutLoading = false;
        draft.logOutDone = true;
        break;
      /* 최종 회원가입 */
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        localStorage.setItem(ACCESS_TOKEN, action.data.accessToken);
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      /* 유저 정보 가져오기 */
      case LOAD_USER_INFO_REQUEST:
        draft.loadUserInfoLoading = true;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = null;
        break;
      case LOAD_USER_INFO_SUCCESS:
        draft.userInfo = action.data;
        draft.loadUserInfoLoading = false;
        draft.loadUserInfoDone = true;
        break;
      case LOAD_USER_INFO_FAILURE:
        draft.loadUserInfoLoading = false;
        draft.loadUserInfoError = action.error;
        break;
      default:
        break;
    }
  });
};

export default user;
