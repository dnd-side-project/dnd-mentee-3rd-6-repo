import { delay, put, takeLatest, getContext, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

import { NEXT_PAGE, PREV_PAGE } from './pageNumber';

/* 초기 상태 */

export const initialSate = {
  userInfo: null,
  userInfoAPIPostData: {
    // numberVerify
    phoneNumber: '01095184319',
    name: '서민준',
    // 1
    email: 'aa@aa.com',
    password: 'aaaaaaaa',
    isServant: true,
    // 2
    catName: '',
    catFeatures: '',
    catProfileImg: null,
    // 3
    catKindId: null,
    catGender: '',
    catBirthday: '',
    catNeutralized: null,
    // 4
    addressDepth1: '',
    addressDepth2: '',
    addressDepth3: '',
    addressDepth4: '',
  },
  emailValidData: false,
  CatKindId: [
    { id: 1, name: '코리안 쇼트헤어' },
    { id: 2, name: '페르시안' },
    { id: 3, name: '러시안 블루' },
    { id: 4, name: '샴' },
    { id: 5, name: '터키쉬앙고라' },
    { id: 6, name: '스코티쉬 폴드' },
    { id: 7, name: '친칠라' },
    { id: 8, name: '아비시니안' },
    { id: 9, name: '길고양이' },
    { id: 10, name: '맹크스' },
    { id: 11, name: '노르웨이숲' },
    { id: 12, name: '브리티시 쇼트헤어' },
    { id: 13, name: '먼치킨' },
    { id: 14, name: '랙돌' },
    { id: 15, name: '메인쿤' },
    { id: 16, name: '시암' },
    { id: 17, name: '아메리칸 쇼트헤어' },
    { id: 18, name: '엑조틱 쇼트헤어' },
    { id: 19, name: '아비시니안' },
    { id: 20, name: '터키쉬앙고라' },
    { id: 21, name: '기타' },
  ],
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
  catKindIdLoading: false, // 고양이 품종 가져오기 시도 중
  catKindIdDone: false,
  catKindIdError: null,
  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,
  signUpError: null,
};

/* 액션 */

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

export const CAT_KIND_ID_REQUEST = 'user/CAT_KIND_ID_REQUEST';
export const CAT_KIND_ID_SUCCESS = 'user/CAT_KIND_ID_SUCCESS';
export const CAT_KIND_ID_FAILURE = 'user/CAT_KIND_ID_FAILURE';

export const SIGN_UP_1_REQUEST = 'user/SIGN_UP_1_REQUEST';
export const SIGN_UP_1_SUCCESS = 'user/SIGN_UP_1_SUCCESS';
export const SIGN_UP_1_FAILURE = 'user/SIGN_UP_1_FAILURE';

export const SIGN_UP_2_REQUEST = 'user/SIGN_UP_2_REQUEST';
export const SIGN_UP_2_SUCCESS = 'user/SIGN_UP_2_SUCCESS';
export const SIGN_UP_2_FAILURE = 'user/SIGN_UP_2_FAILURE';

export const SIGN_UP_3_REQUEST = 'user/SIGN_UP_3_REQUEST';
export const SIGN_UP_3_SUCCESS = 'user/SIGN_UP_3_SUCCESS';
export const SIGN_UP_3_FAILURE = 'user/SIGN_UP_3_FAILURE';

export const SIGN_UP_4_REQUEST = 'user/SIGN_UP_4_REQUEST';
export const SIGN_UP_4_SUCCESS = 'user/SIGN_UP_4_SUCCESS';
export const SIGN_UP_4_FAILURE = 'user/SIGN_UP_4_FAILURE';

export const SIGN_UP_REQUEST = 'user/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';

export const GO_TO = 'GO_TO';

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
      type: GO_TO,
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

const catKindIdAPI = (data) => {
  return axios.get(`/catkinds?sort=id,asc`);
};

function* catKindId(action) {
  try {
    const result = yield call(catKindIdAPI, action.data);
    yield put({
      type: CAT_KIND_ID_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: CAT_KIND_ID_FAILURE,
      error: error.response.data,
    });
  }
}

function* signUp1(action) {
  try {
    yield put({
      type: SIGN_UP_1_SUCCESS,
      data: action.data,
    });
    yield put({
      type: NEXT_PAGE,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_1_FAILURE,
      error: error.response.data,
    });
  }
}

function* signUp2(action) {
  try {
    yield put({
      type: SIGN_UP_2_SUCCESS,
      data: action.data,
    });
    yield put({
      type: NEXT_PAGE,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_2_FAILURE,
      error: error.response.data,
    });
  }
}

function* signUp3(action) {
  try {
    yield put({
      type: SIGN_UP_3_SUCCESS,
      data: action.data,
    });
    yield put({
      type: NEXT_PAGE,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_3_FAILURE,
      error: error.response.data,
    });
  }
}

function* signUp4(action) {
  try {
    yield put({
      type: SIGN_UP_4_SUCCESS,
      data: action.data,
    });
    yield put({
      type: PREV_PAGE,
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_4_FAILURE,
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
      type: GO_TO,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
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

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchEmailValid() {
  yield takeLatest(EMAIL_VALID_REQUEST, emailValid);
}

function* watchCatKindId() {
  yield takeLatest(CAT_KIND_ID_REQUEST, catKindId);
}

function* watcSignUp1() {
  yield takeLatest(SIGN_UP_1_REQUEST, signUp1);
}

function* watcSignUp2() {
  yield takeLatest(SIGN_UP_2_REQUEST, signUp2);
}

function* watcSignUp3() {
  yield takeLatest(SIGN_UP_3_REQUEST, signUp3);
}

function* watcSignUp4() {
  yield takeLatest(SIGN_UP_4_REQUEST, signUp4);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchGoTo() {
  yield takeLatest(GO_TO, goTo);
}

export function* userSaga() {
  yield all([
    fork(watchGoTo),
    fork(watcSignUp1),
    fork(watcSignUp2),
    fork(watcSignUp3),
    fork(watcSignUp4),
    fork(watchCatKindId),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchEmailValid),
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
        draft.userInfo = action.data;
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
        draft.userInfoAPIPostData.phoneNumber = action.data.phoneNumber;
        draft.userInfoAPIPostData.name = action.data.name;
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
      /* 첫번 쨰 회원가입 데이터 */
      case SIGN_UP_1_REQUEST:
        draft.submitNextPageLoading = true;
        draft.submitNextPageDone = false;
        draft.submitNextPageError = null;
        break;
      case SIGN_UP_1_SUCCESS:
        draft.userInfoAPIPostData.email = action.data.email;
        draft.userInfoAPIPostData.password = action.data.password;
        draft.userInfoAPIPostData.isServant = action.data.isServant;
        draft.submitNextPageLoading = false;
        draft.submitNextPageDone = true;
        break;
      case SIGN_UP_1_FAILURE:
        draft.logInLoading = false;
        draft.submitNextPageError = action.error;
        break;
      /* 두번 쨰 회원가입 데이터 */
      case SIGN_UP_2_REQUEST:
        draft.submitNextPageLoading = true;
        draft.submitNextPageDone = false;
        draft.submitNextPageError = null;
        break;
      case SIGN_UP_2_SUCCESS:
        draft.userInfoAPIPostData.catName = action.data.catName;
        draft.userInfoAPIPostData.catFeatures = action.data.catFeatures;
        draft.userInfoAPIPostData.catProfileImg = action.data.catProfileImg;
        draft.submitNextPageLoading = false;
        draft.submitNextPageDone = true;
        break;
      case SIGN_UP_2_FAILURE:
        draft.logInLoading = false;
        draft.submitNextPageError = action.error;
        break;
      /* 세번 쨰 회원가입 데이터 */
      case SIGN_UP_3_REQUEST:
        draft.submitNextPageLoading = true;
        draft.submitNextPageDone = false;
        draft.submitNextPageError = null;
        break;
      case SIGN_UP_3_SUCCESS:
        draft.userInfoAPIPostData.catKindId = action.data.catKindId;
        draft.userInfoAPIPostData.catGender = action.data.catGender;
        draft.userInfoAPIPostData.catBirthday = action.data.catBirthday;
        draft.userInfoAPIPostData.catNeutralized = action.data.catNeutralized;
        draft.submitNextPageLoading = false;
        draft.submitNextPageDone = true;
        break;
      case SIGN_UP_3_FAILURE:
        draft.logInLoading = false;
        draft.submitNextPageError = action.error;
        break;
      /* 네번 쨰 회원가입 데이터 */
      case SIGN_UP_4_REQUEST:
        draft.submitNextPageLoading = true;
        draft.submitNextPageDone = false;
        draft.submitNextPageError = null;
        break;
      case SIGN_UP_4_SUCCESS:
        draft.userInfoAPIPostData.addressDepth1 = action.data.addressDepth1;
        draft.userInfoAPIPostData.addressDepth2 = action.data.addressDepth2;
        draft.userInfoAPIPostData.addressDepth3 = action.data.addressDepth3;
        draft.userInfoAPIPostData.addressDepth4 = action.data.addressDepth4;
        draft.submitNextPageLoading = false;
        draft.submitNextPageDone = true;
        break;
      case SIGN_UP_4_FAILURE:
        draft.logInLoading = false;
        draft.submitNextPageError = action.error;
        break;
      /* 고양이 품종 가져오기 */
      case CAT_KIND_ID_REQUEST:
        draft.catKindIdLoading = true;
        draft.catKindIdDone = false;
        draft.catKindIdError = null;
        break;
      case CAT_KIND_ID_SUCCESS:
        draft.CatKindId = action.data;
        draft.catKindIdLoading = false;
        draft.catKindIdDone = true;
        break;
      case CAT_KIND_ID_FAILURE:
        draft.catKindIdLoading = false;
        draft.catKindIdError = action.error;
        break;
      /* 최종 회원가입 */
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.userInfo = action.data;
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.userInfoAPIPostData = null;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      default:
        break;
    }
  });
};

export default user;
