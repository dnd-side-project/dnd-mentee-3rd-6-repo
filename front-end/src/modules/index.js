import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import map, { mapSaga } from './map';

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

export function* rootSaga() {
  yield all([fork(authSaga), fork(mapSaga), fork(userSaga)]);
}

const rootReducer = combineReducers({
  auth,
  map,
  user,
});

export default rootReducer;
