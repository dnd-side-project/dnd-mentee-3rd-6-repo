import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

/* 초기 상태 */
export const initialSate = {
  pageIndex: 1,
  authInfo: {
    // 1
    phoneNumber: '',
    name: '',
    // 2
    email: '',
    password: '',
    // 3
    isServant: false,
    // 4
    catProfileImg: null,
    // 5
    catName: '',
    catFeatures: '',
    // 6
    catKindId: null,
    catGender: '',
    catWeight: '',
    catBirthday: '',
    catNeutralized: '',
    // 7
    nickName: '',
    // 8
    addressDepth1: '',
    addressDepth2: '',
    addressDepth3: '',
    addressDepth4: '',
  },
  previewPath: null,
  EmailValidData: null,
  NickNameValidData: null,
  CatKindId: null,
  identifyLoading: false, // 본인인증(리캡챠) 시도 중
  identifyDone: false,
  identifyError: null,
  numberVerifyLoading: false, // 인증번호 확인 시도 중
  numberVerifyDone: false,
  numberVerifyError: null,
  emailValidLoading: false, // 이메일 중복 확인 시도 중
  emailValidDone: false,
  emailValidError: null,
  nickNameValidLoading: false, // 닉네임 중복 확인 시도 중
  nickNameValidDone: false,
  nickNameValidError: null,
  catKindIdLoading: false, // 고양이 품종 가져오기 시도 중
  catKindIdDone: false,
  catKindIdError: null,
};

/* 액션 */
export const IDENTIFY_REQUEST = 'user/IDENTIFY_REQUEST';
export const IDENTIFY_SUCCESS = 'user/IDENTIFY_SUCCESS';
export const IDENTIFY_FAILURE = 'user/IDENTIFY_FAILURE';

export const NUMBER_VERIFY_REQUEST = 'user/NUMBER_VERIFY_REQUEST';
export const NUMBER_VERIFY_SUCCESS = 'user/NUMBER_VERIFY_SUCCESS';
export const NUMBER_VERIFY_FAILURE = 'user/NUMBER_VERIFY_FAILURE';

export const EMAIL_VALID_REQUEST = 'user/EMAIL_VALID_REQUEST';
export const EMAIL_VALID_SUCCESS = 'user/EMAIL_VALID_SUCCESS';
export const EMAIL_VALID_FAILURE = 'user/EMAIL_VALID_FAILURE';

export const NICKNAME_VALID_REQUEST = 'user/NICKNAME_VALID_REQUEST';
export const NICKNAME_VALID_SUCCESS = 'user/NICKNAME_VALID_SUCCESS';
export const NICKNAME_VALID_FAILURE = 'user/NICKNAME_VALID_FAILURE';

export const PROFILE_IMAGE_REQUEST = 'user/PROFILE_IMAGE_REQUEST';
export const PROFILE_IMAGE_SUCCESS = 'user/PROFILE_IMAGE_SUCCESS';
export const PROFILE_IMAGE_FAILURE = 'user/PROFILE_IMAGE_FAILURE';

export const CAT_KIND_ID_REQUEST = 'user/CAT_KIND_ID_REQUEST';
export const CAT_KIND_ID_SUCCESS = 'user/CAT_KIND_ID_SUCCESS';
export const CAT_KIND_ID_FAILURE = 'user/CAT_KIND_ID_FAILURE';

export const SIGN_UP_2 = 'user/SIGN_UP_2';
export const SIGN_UP_3 = 'user/SIGN_UP_3';
export const SIGN_UP_4 = 'user/SIGN_UP_4';
export const SIGN_UP_5 = 'user/SIGN_UP_5';
export const SIGN_UP_6 = 'user/SIGN_UP_6';
export const SIGN_UP_7 = 'user/SIGN_UP_7';
export const SIGN_UP_8 = 'user/SIGN_UP_8';

export const NEXT_PAGE = 'auth/NEXT_PAGE';
export const NOT_SERVANT_NEXT_PAGE = 'auth/NOT_SERVANT_NEXT_PAGE';
export const PREV_PAGE = 'auth/PREV_PAGE';
export const NOT_SERVANT_PREV_PAGE = 'auth/NOT_SERVANT_PREV_PAGE';
export const RESET_AUTH_INFO = 'auth/RESET_AUTH_INFO';

/* 사가 */
const emailValidAPI = (data) => {
  return axios.get(`/auth/email/is-exist`, {
    params: { email: data },
  });
};

function* emailValid(action) {
  try {
    const result = yield call(emailValidAPI, action.data);
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

const nickNameValidAPI = (data) => {
  return axios.get(`/auth/nickname/is-exist`, {
    params: { nickname: data },
  });
};

function* nickNameValid(action) {
  try {
    const result = yield call(nickNameValidAPI, action.data);
    yield put({
      type: NICKNAME_VALID_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: NICKNAME_VALID_FAILURE,
      error: error.response.data,
    });
  }
}

const catKindIdAPI = () => {
  return axios.get(`/cat-kinds`);
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

function* watchEmailValid() {
  yield takeLatest(EMAIL_VALID_REQUEST, emailValid);
}

function* watchNickNameValid() {
  yield takeLatest(NICKNAME_VALID_REQUEST, nickNameValid);
}

function* watchCatKindId() {
  yield takeLatest(CAT_KIND_ID_REQUEST, catKindId);
}

export function* authSaga() {
  yield all([fork(watchEmailValid), fork(watchCatKindId), fork(watchNickNameValid)]);
}

/* 리듀서 */
const auth = (state = initialSate, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      /* 본인인증 (리캡챠) */
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
      /* 인증번호 확인 */
      case NUMBER_VERIFY_REQUEST:
        draft.numberVerifyLoading = true;
        draft.numberVerifyDone = false;
        draft.numberVerifyError = null;
        break;
      case NUMBER_VERIFY_SUCCESS:
        draft.authInfo.phoneNumber = action.data.phoneNumber;
        draft.authInfo.name = action.data.name;
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
        draft.EmailValidData = action.data;
        draft.emailValidLoading = false;
        draft.emailValidDone = true;
        break;
      case EMAIL_VALID_FAILURE:
        draft.emailValidLoading = false;
        draft.emailValidError = action.error;
        break;
      /* 닉네임 중복확인 */
      case NICKNAME_VALID_REQUEST:
        draft.nickNameValidLoading = true;
        draft.nickNameValidDone = false;
        draft.nickNameValidError = null;
        break;
      case NICKNAME_VALID_SUCCESS:
        draft.NickNameValidData = action.data;
        draft.nickNameValidLoading = false;
        draft.nickNameValidDone = true;
        break;
      case NICKNAME_VALID_FAILURE:
        draft.nickNameValidLoading = false;
        draft.nickNameValidError = action.error;
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
      /* 각 페이지 데이터 */
      case SIGN_UP_2:
        draft.authInfo.email = action.data.email;
        draft.authInfo.password = action.data.password;
        break;
      case SIGN_UP_3:
        draft.authInfo.isServant = action.data;
        break;
      case SIGN_UP_4:
        draft.authInfo.catProfileImg = action.data.catProfileImg;
        draft.previewPath = action.data.previewPath;
        break;
      case SIGN_UP_5:
        draft.authInfo.catName = action.data.catName;
        draft.authInfo.catFeatures = action.data.catFeatures;
        break;
      case SIGN_UP_6:
        draft.authInfo.catKindId = action.data.catKindId;
        draft.authInfo.catGender = action.data.catGender;
        draft.authInfo.catWeight = action.data.catWeight;
        draft.authInfo.catBirthday = action.data.catBirthday;
        draft.authInfo.catNeutralized = action.data.catNeutralized;
        break;
      case SIGN_UP_7:
        draft.authInfo.nickName = action.data;
        break;
      case SIGN_UP_8:
        draft.authInfo.addressDepth1 = action.data.addressDepth1;
        draft.authInfo.addressDepth2 = action.data.addressDepth2;
        draft.authInfo.addressDepth3 = action.data.addressDepth3;
        draft.authInfo.addressDepth4 = action.data.addressDepth4;
        break;
      /* 회원가입 페이지의 화면 이동 */
      case NEXT_PAGE:
        draft.pageIndex += 1;
        break;
      case NOT_SERVANT_NEXT_PAGE:
        draft.pageIndex = 7;
        break;
      case PREV_PAGE:
        draft.pageIndex -= 1;
        break;
      case NOT_SERVANT_PREV_PAGE:
        draft.pageIndex = 3;
        break;
      /* autInfo 초기화 */
      case RESET_AUTH_INFO:
        draft.authInfo = null;
        draft.authInfo = null;
        draft.previewPath = null;
        draft.EmailValidData = null;
        draft.pageIndex = 1;
        break;
      default:
        break;
    }
  });
};

export default auth;
