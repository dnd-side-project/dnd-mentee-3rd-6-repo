import { takeLatest, all, fork, getContext } from 'redux-saga/effects';
import produce from 'immer';

export const initialSate = {
  pageIndex: 1,
  imgFiles: null,
  path: null,
  tagId: null,
  catIds: null,
  content: '',
  prevClick: null,
  prevId: null,
  addFeedLoading: false,
  addFeedDone: false,
  addFeedError: null,
};

export const NEXT_WRITE_PAGE = 'write/NEXT_WRITE_PAGE';
export const PREV_WRITE_PAGE = 'write/PREV_WRITE_PAGE';
export const GO_BACK_FEED_PAGE = 'write/GO_BACK_FEED_PAGE';
export const RESET_WRITE_PAGE = 'write/RESET_WRITE_PAGE';

function* goBackFeedPage() {
  const history = yield getContext('history');
  history.push('/feed');
}

function* watchGoBackFeedPage() {
  yield takeLatest(GO_BACK_FEED_PAGE, goBackFeedPage);
}

export function* writeSaga() {
  yield all([fork(watchGoBackFeedPage)]);
}

const write = (state = initialSate, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case NEXT_WRITE_PAGE:
        draft.pageIndex += 1;
        draft.imgFiles = action.data.imgFiles;
        draft.path = action.data.path;
        draft.tagId = action.data.tagId;
        draft.content = action.data.content;
        draft.prevClick = action.data.prevClick;
        draft.prevId = action.data.prevId;
        break;
      case PREV_WRITE_PAGE:
        draft.pageIndex -= 1;
        break;
      case RESET_WRITE_PAGE:
        draft.pageIndex = 1;
        draft.imgFiles = null;
        draft.path = null;
        draft.tagId = null;
        draft.catIds = null;
        draft.content = '';
        draft.prevClick = null;
        break;
      default:
        break;
    }
  });
};

export default write;
