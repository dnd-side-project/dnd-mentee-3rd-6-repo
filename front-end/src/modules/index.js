import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import user, { userSaga, initialSate } from './user';
import pageNumber from './pageNumber';

axios.defaults.baseURL = 'http://15.164.158.155/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function* rootSaga() {
  yield all([fork(userSaga)]);
}

const rootReducer = combineReducers({
  user,
  pageNumber,
});

export default rootReducer;
