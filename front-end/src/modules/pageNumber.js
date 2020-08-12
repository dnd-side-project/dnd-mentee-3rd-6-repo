import produce from 'immer';

/* 초기 상태 */

export const initialSate = {
  page: 3,
};

/* 액션 */

export const NEXT_PAGE = 'pageNumber/NEXT_PAGE';
export const PREV_PAGE = 'pageNumbe/PREV_PAGE';

/* 액션 생성함수 */

/* 리듀서 */

const pageNumber = (state = initialSate, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case NEXT_PAGE:
        draft.page += 1;
        break;
      case PREV_PAGE:
        draft.page -= 1;
        break;
      default:
        break;
    }
  });
};

export default pageNumber;
