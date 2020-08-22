import { delay, put, takeLatest, getContext, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

import { NEXT_PAGE } from './pageNumber';

/* 초기 상태 */

export const initialSate = {
  userInfo: {
    accessToken: '',
    phoneNumber: '',
    name: '',
    email: '',
    password: '',
    nickName: '',
    address: '',
    isServant: true,
    CatInfo: [
      {
        catKindId: 1,
        catName: '',
        catFeatures: '',
        catGender: '',
        catBirthday: '',
        catNeutralized: null,
        catProfileImgUrl: '',
      },
    ],
  },
  catProfilePath: '',
  emailValidData: false,
  submitNextPageLoading: false, // 완료 후 다음 페이지 이동 시도 중
  submitNextPageDone: false,
  submitNextPageError: null,
  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,
  identifyLoading: false, // 본인인증(리캡챠) 시도 중
  identifyDone: false,
  identifyError: null,
  numberVerifyLoading: false, // 인증번호 시도 중
  numberVerifyDone: false,
  numberVerifyError: null,
  emailValidLoading: false, // 이메일 중복확인 시도 중
  emailValidDone: false,
  emailValidError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
  catProfileImageLoading: false, // 프로필 사진 등록 시도 중
  catProfileImageDone: false,
  catProfileImageError: null,
};

/* 액션 */

export const SUBMIT_NEXT_PAGE_REQUEST = 'user/SUBMIT_NEXT_PAGE_REQUEST';
export const SUBMIT_NEXT_PAGE_SUCCESS = 'user/SUBMIT_NEXT_PAGE_SUCCESS';
export const SUBMIT_NEXT_PAGE_FAILURE = 'user/SUBMIT_NEXT_PAGE_FAILURE';

export const LOG_IN_REQUEST = 'user/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'user/LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'user/LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'user/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'user/LOG_OUT_FAILURE';

export const IDENTIFY_REQUEST = 'user/IDENTIFY_REQUEST';
export const IDENTIFY_SUCCESS = 'user/IDENTIFY_SUCCESS';
export const IDENTIFY_FAILURE = 'user/IDENTIFY_FAILURE';

export const NUMBER_VERIFY_REQUEST = 'user/NUMBER_VERIFY_REQUEST';
export const NUMBER_VERIFY_SUCCESS = 'user/NUMBER_VERIFY_SUCCESS';
export const NUMBER_VERIFY_FAILURE = 'user/NUMBER_VERIFY_FAILURE';

export const EMAIL_VALID_REQUEST = 'user/EMAIL_VALID_REQUEST';
export const EMAIL_VALID_SUCCESS = 'user/EMAIL_VALID_SUCCESS';
export const EMAIL_VALID_FAILURE = 'user/EMAIL_VALID_FAILURE';

export const PROFILE_IMAGE_REQUEST = 'user/PROFILE_IMAGE_REQUEST';
export const PROFILE_IMAGE_SUCCESS = 'user/PROFILE_IMAGE_SUCCESS';
export const PROFILE_IMAGE_FAILURE = 'user/PROFILE_IMAGE_FAILURE';

export const SIGN_UP_REQUEST = 'user/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';

export const CAT_PROFILE_IMAGE_REQUEST = 'user/CAT_PROFILE_IMAGE_REQUEST';
export const CAT_PROFILE_IMAGE_SUCCESS = 'user/CAT_PROFILE_IMAGE_SUCCESS';
export const CAT_PROFILE_IMAGE_FAILURE = 'user/CAT_PROFILE_IMAGE_FAILURE';

export const GO_TO = 'GO_TO';

/* 사가 */

function* submitNextPage(action) {
  try {
    yield put({
      type: SUBMIT_NEXT_PAGE_SUCCESS,
      data: action.data,
    });
    yield put({
      type: NEXT_PAGE,
    });
  } catch (error) {
    yield put({
      type: SUBMIT_NEXT_PAGE_FAILURE,
      error: error.response.data,
    });
  }
}

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
  } catch (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
    });
  }
}

const logOutAPI = (data) => {
  return axios.post('/auth/sign-out', data);
};

function* logOut(action) {
  try {
    // const result = yield call(logOutAPI, action.data);
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

const emailValidAPI = (data) => {
  return axios.get(`/auth/email/is-exist`, {
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
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    });
  }
}

const catProfileImageAPI = (data) => {
  return axios.post('/auth/sign-up/cat-profile-img', data);
};

function* catProfileImage(action) {
  try {
    const result = yield call(catProfileImageAPI, action.data);
    console.log(result);
    yield delay(1000);
    yield put({
      type: CAT_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    });
    yield put({
      type: NEXT_PAGE,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: CAT_PROFILE_IMAGE_FAILURE,
      error: error.response.data,
    });
  }
}

function* goTo() {
  const history = yield getContext('history');
  history.push('/pheed');
}

function* watcSubmitNextPage() {
  yield takeLatest(SUBMIT_NEXT_PAGE_REQUEST, submitNextPage);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchEmailValid() {
  yield takeLatest(EMAIL_VALID_REQUEST, emailValid);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchCatProfileImage() {
  yield takeLatest(CAT_PROFILE_IMAGE_REQUEST, catProfileImage);
}

function* watchGoTo() {
  yield takeLatest(GO_TO, goTo);
}

export function* userSaga() {
  yield all([
    fork(watchGoTo),
    fork(watcSubmitNextPage),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchEmailValid),
    fork(watchSignUp),
    fork(watchCatProfileImage),
  ]);
}

/* 리듀서 */

const user = (state = initialSate, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      /* 완료 후 다음 페이지 이동 */
      case SUBMIT_NEXT_PAGE_REQUEST:
        draft.submitNextPageLoading = true;
        draft.submitNextPageDone = false;
        draft.submitNextPageError = null;
        break;
      case SUBMIT_NEXT_PAGE_SUCCESS:
        draft.submitNextPageLoading = false;
        draft.submitNextPageDone = true;
        break;
      case SUBMIT_NEXT_PAGE_FAILURE:
        draft.logInLoading = false;
        draft.submitNextPageError = action.error;
        break;
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
        draft.userInfo.phoneNumber = action.data;
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
      /* 회원가입 */
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.userInfo.accessToken = action.data.accessToken;
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      /* 고양이 프로필 사진 업로드 */
      case CAT_PROFILE_IMAGE_REQUEST:
        draft.catProfileImageLoading = true;
        draft.catProfileImageDone = false;
        draft.catProfileImageError = null;
        break;
      case CAT_PROFILE_IMAGE_SUCCESS:
        draft.userInfo.ProfileImage.push(action.data);
        draft.catProfileImageLoading = false;
        draft.catProfileImageDone = true;
        break;
      case CAT_PROFILE_IMAGE_FAILURE:
        draft.catProfileImageLoading = false;
        draft.catProfileImageError = action.error;
        break;
      default:
        break;
    }
  });
};

export default user;
