import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import user, { userSaga } from './user';
import map, { mapSaga } from './map';
import pageNumber from './pageNumber';

axios.defaults.baseURL = 'http://15.164.158.155/api';

export function* rootSaga() {
  yield all([fork(userSaga), fork(mapSaga)]);
}

const rootReducer = combineReducers({
  user,
  map,
  pageNumber,
});

export default rootReducer;
