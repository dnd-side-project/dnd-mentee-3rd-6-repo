import { put, takeLatest, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

export const initialSate = {
  regionCodeData: {
    addressDepth1: '',
    addressDepth2: '',
    addressDepth3: '',
    addressDepth4: '',
  },
  currentLocation: {
    geoLat: null,
    geoLon: null,
  },
  regionCodeLoading: false, // 행정동 불러오기
  regionCodeDone: false,
  regionCodeError: null,
  currentGPSLoading: false, // 현재위치 가져오기
  currentGPSDone: false,
  currentGPSError: null,
};

const KAKAO_MAP_URL = '//dapi.kakao.com/v2/local/geo/coord2regioncode.json';

export const CURRENT_GPS_REQUEST = 'map/CURRENT_GPS_REQUEST';
export const CURRENT_GPS_SUCCESS = 'map/CURRENT_GPS_SUCCESS';
export const CURRENT_GPS_FAILURE = 'map/CURRENT_GPS_FAILURE';

export const REGION_CODE_REQUEST = 'map/REGION_CODE_REQUEST';
export const REGION_CODE_SUCCESS = 'map/REGION_CODE_SUCCESS';
export const REGION_CODE_FAILURE = 'map/REGION_CODE_FAILURE';

const regionCodeAPI = ({ x, y }) => {
  const params = { x, y };
  const headers = { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_TOKEN}` };
  return axios.get(KAKAO_MAP_URL, { params, headers });
};

function* regionCode(action) {
  try {
    const result = yield call(regionCodeAPI, action.data);
    yield put({
      type: REGION_CODE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REGION_CODE_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchRegionCode() {
  yield takeLatest(REGION_CODE_REQUEST, regionCode);
}

export function* mapSaga() {
  yield all([fork(watchRegionCode)]);
}

const map = (state = initialSate, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case REGION_CODE_REQUEST:
        draft.regionCodeLoading = true;
        draft.regionCodeDone = false;
        draft.regionCodeError = null;
        break;
      case REGION_CODE_SUCCESS:
        draft.regionCodeData.addressDepth1 = action.data.documents[1].region_1depth_name;
        draft.regionCodeData.addressDepth2 = action.data.documents[1].region_2depth_name;
        draft.regionCodeData.addressDepth3 = action.data.documents[1].region_3depth_name;
        draft.regionCodeData.addressDepth4 = action.data.documents[1].region_4depth_name;
        draft.regionCodeLoading = false;
        draft.regionCodeDone = true;
        break;
      case REGION_CODE_FAILURE:
        draft.regionCodeLoading = true;
        draft.regionCodeDone = false;
        draft.regionCodeError = null;
        break;
      case CURRENT_GPS_REQUEST:
        draft.currentGPSLoading = true;
        draft.currentGPSDone = false;
        draft.currentGPSError = null;
        break;
      case CURRENT_GPS_SUCCESS:
        draft.currentLocation = action.data;
        draft.currentGPSLoading = false;
        draft.currentGPSDone = true;
        break;
      case CURRENT_GPS_FAILURE:
        draft.regionCodeLoading = true;
        draft.regionCodeDone = false;
        draft.currentGPSError = null;
        break;
      default:
        break;
    }
  });
};

export default map;
