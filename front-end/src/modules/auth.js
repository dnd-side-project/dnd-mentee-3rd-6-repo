import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

/* 초기 상태 */
export const initialSate = {
  pageIndex: 6,
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
  identifyLoading: false, // 본인인증(리캡챠) 시도 중
  identifyDone: false,
  identifyError: null,
  numberVerifyLoading: false, // 인증번호 확인 시도 중
  numberVerifyDone: false,
  numberVerifyError: null,
  emailValidLoading: false, // 이메일 중복 확인 시도 중
  emailValidDone: false,
  emailValidError: null,
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

const catKindIdAPI = () => {
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

function* watchEmailValid() {
  yield takeLatest(EMAIL_VALID_REQUEST, emailValid);
}

function* watchCatKindId() {
  yield takeLatest(CAT_KIND_ID_REQUEST, catKindId);
}

export function* authSaga() {
  yield all([fork(watchEmailValid), fork(watchCatKindId)]);
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
