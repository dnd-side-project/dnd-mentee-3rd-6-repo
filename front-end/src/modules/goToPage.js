import { takeLatest, getContext, all, fork } from 'redux-saga/effects';

export const initialState = {
  pageURL: 'feed',
};

export const GO_TO_PAGE = 'goToPage/GO_TO';

function* goToPageHistory(action) {
  const history = yield getContext('history');
  history.push(`/${action.data}`);
}

function* watchGoToPage() {
  yield takeLatest(GO_TO_PAGE, goToPageHistory);
}

export function* goToPageSaga() {
  yield all([fork(watchGoToPage)]);
}

const goToPage = (state = initialState, action) => {
  switch (action.type) {
    case GO_TO_PAGE:
      return {
        ...state,
        pageURL: action.data,
      };

    default:
      return state;
  }
};

export default goToPage;
