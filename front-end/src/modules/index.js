import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import auth, { authSaga } from './auth';
import user, { userSaga, initialSate } from './user';
import map, { mapSaga } from './map';
import feed, { feedSaga } from './feed';

axios.defaults.baseURL = `${
  process.env.NODE_ENV === 'production' ? '/api' : 'http://15.164.158.155/api'
}`;

axios.defaults.headers.common.Authorization = `Bearer ${initialSate.userInfo?.accessToken}`;

export function* rootSaga() {
  yield all([fork(authSaga), fork(mapSaga), fork(userSaga), fork(feedSaga)]);
}

const rootReducer = combineReducers({
  auth,
  map,
  user,
  feed,
});

export default rootReducer;
