import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import map, { mapSaga } from './map';
import feed, { feedSaga } from './feed';
import write, { writeSaga } from './write';

axios.defaults.baseURL = `${
  process.env.NODE_ENV === 'production' ? '/api' : `${process.env.REACT_APP_BASE_URL}/api`
}`;

export function* rootSaga() {
  yield all([fork(authSaga), fork(mapSaga), fork(userSaga), fork(feedSaga), fork(writeSaga)]);
}

const rootReducer = combineReducers({
  auth,
  map,
  user,
  feed,
  write,
});

export default rootReducer;
