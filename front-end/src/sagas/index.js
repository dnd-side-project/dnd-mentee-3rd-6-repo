import { all, fork } from 'redux-saga/effects';
import userSaga from './user';

function* rootSaga() {
  yield all([fork(userSaga)]);
}

export default rootSaga;
