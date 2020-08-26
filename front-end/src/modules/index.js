import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import map, { mapSaga } from './map';
import goToPage, { goToPageSaga } from './goToPage';

axios.defaults.baseURL = 'http://15.164.158.155/api';

export function* rootSaga() {
  yield all([fork(authSaga), fork(mapSaga), fork(userSaga), fork(goToPageSaga)]);
}

const rootReducer = combineReducers({
  auth,
  map,
  user,
  goToPage,
});

export default rootReducer;
