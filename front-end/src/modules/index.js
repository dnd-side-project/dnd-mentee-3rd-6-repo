import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import user, { userSaga } from './user';
import auth, { authSaga } from './auth';
import pageNumber from './pageNumber';

// axios.defaults.headers.common.Authorization = AUTH_TOKEN;
axios.defaults.baseURL = 'http://15.164.158.155/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function* rootSaga() {
  yield all([fork(userSaga), fork(authSaga)]);
}

const rootReducer = combineReducers({
  user,
  auth,
  pageNumber,
});

export default rootReducer;
