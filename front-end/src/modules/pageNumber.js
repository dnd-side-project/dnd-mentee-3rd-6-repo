/* 초기 상태 */

export const initialSate = {
  page: 1,
};

/* 액션 */

export const NEXT_PAGE = 'pageNumber/NEXT_PAGE';
export const PREV_PAGE = 'pageNumbe/PREV_PAGE';

/* 액션 생성함수 */

/* 리듀서 */

const pageNumber = (state = initialSate, action) => {
  // seoha 6페이지 제작중 
  return { page: 6 }
  // switch (action.type) {
  //   case NEXT_PAGE:
  //     return { page: state.page + 1 };
  //   case PREV_PAGE:
  //     return { page: state.page - 1 };
  //   default:
  //     return state;
  // }
};

export default pageNumber;
