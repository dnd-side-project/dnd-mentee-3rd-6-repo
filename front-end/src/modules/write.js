import { put, delay, takeLatest, all, fork, call, getContext } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

export const initialSate = {
  pageIndex: 1,
};

export const NEXT_WRITE_PAGE = 'write/NEXT_WRITE_PAGE';
export const PREV_WRITE_PAGE = 'write/PREV_WRITE_PAGE';

const write = (state = initialSate, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case NEXT_WRITE_PAGE:
        draft.pageIndex += 1;
        break;
      case PREV_WRITE_PAGE:
        draft.pageIndex -= 1;
        break;
      default:
        break;
    }
  });
};

export default write;
