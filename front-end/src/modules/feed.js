import { put, delay, takeLatest, all, fork, call, getContext } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

export const initialSate = {
  pageIndex: 4,
  titleIndex: 1,
  prevPageIndex: null,
  Feeds: {
    pageNumber: 0,
    pageSize: 10,
    totalPages: 50,
    isLast: false,
    isFirst: true,
    contents: [
      {
        id: 1,
        content: '연탄이는 오늘도 식빵 굽굽',
        images: [
          {
            id: 1,
            url:
              'https://www.kfm.co.kr/files/blog/2020/01/17/dbbe22e49c74a5b784d09690a0350a4b161550.jpg',
          },
          {
            id: 2,
            url:
              'https://lh3.googleusercontent.com/proxy/zsQYGaAc08eFMWF8Fe6w2hXadtPzL_T-oF-RE9dCa4KDui_CsZJxycjE1yk8DtJc-OD_RYT058ZeupTkoS3pqZpMCehGLdA2sp8uAbPER3mSqv2crHjXmRcSBDt7PXxVM7sh16I92uZwCkXWPJ-OEqWX8_4JectOzAisC21pX5mOaGJ3TyXZjGJYo6_1-l0j6l7Xom9B39-83_nUzY4_1kczUo5GzdJpZnHGNYtShxCRVjoRUINSgLX0FDldLxHHp7FTnGRQVYVi8MyVMawxzbAKWrBhAQ',
          },
        ],
        author: {
          id: 1,
          nickName: '연탄범벅 연탄이네',
          profileImg:
            'https://lh3.googleusercontent.com/proxy/hlCmM4voanQJbrBLr0xBWEOJRNHljQGPkzyCiEdQ1EXYadUvQJw2F2El7KukFLyQ5tG0sU0Gm6-9T4Dopns_FlHuEdaHZ6mLKLrbgzljU5sqvlvf-A',
          addressName: '분당구 정자 2동',
        },
        comments: [
          {
            id: 1,
            content: '넘 귀여운거 아닌가요?!',
            numberOfLikes: 10,
            numberOfReplies: 1,
            createdDateTime: '2020-01-02T21:23:00',
            timeDesc: '3시간 전',
            author: {
              id: 1,
              nickName: '연탄범벅 연탄이네',
              profileImg:
                'https://image.dongascience.com/Photo/2020/01/910608e7413ea2ce900a0d570ab9e391.jpg',
              addressName: '수지구 풍덕천동',
            },
            replies: {
              id: 1,
              content: '까미랑 보리랑',
              numberOfLikes: 3,
              createdDateTime: '2020-01-02T21:23:00',
              timeDesc: '5시간 전',
              author: {
                id: 1,
                nickName: '연탄범벅 연탄이네',
                profileImg:
                  'https://lh3.googleusercontent.com/proxy/IEKBE5r3EL4oye1b_kksAlhf3btAv1syUwJmz12suBVoW8vJBJ38b3ngV8g1BNcGcPvY6BMRdDJPw_hpeLAGjQpbSdNTV1EpUTJAZG76HQ8Jcajpwb1RfPDKUtxYbgHfKcQqo-uGlcsI4yEBAc8xQm8KweCxE6B9vSeMvL5s6yld3-AFKQs-sswQzuLBpylzP5r2QTH9h0LsiZelg7GvXkaY_RRL4MDtctzVW7gbKRMydpiT7fAjhtQIOeTGfxf6tcAYEynQ2Z16UuRxBDYEclPWd_kujwjo9-ZJp-E0135_SqHhYj9mH0Fv71Nljmhm4nnlpllc9V-g5q_YSii-xUrdGZe55nk19tha',
                addressName: '수지구 풍덕천동',
              },
            },
          },
        ],
        isLike: false,
        numberOfLikes: 15,
        numberOfComments: 6,
        createdDateTime: '2020-01-02T21:23:00',
        timeDesc: '6시간전',
      },
    ],
  },
  hometownPageLoading: false, // 우리동네 페이지 불러오기
  hometownPageDone: false,
  hometownPageError: null,
  allPageLoading: false, // 전체 페이지 불러오기
  allPageDone: false,
  allPageError: null,
  myFriendLoading: false, // 내 친구 페이지 불러오기
  myFriendDone: false,
  myFriendError: null,
  likeFeedLoading: false, // 좋아요
  likeFeedDone: false,
  likeFeedError: null,
  unLikeFeedLoading: false, // 좋아요 취소
  unLikeFeedDone: false,
  unLikeFeedError: null,
};

export const HOMETOWN_PAGE_REQUEST = 'feed/HOMETOWN_PAGE_REQUEST';
export const HOMETOWN_PAGE_SUCCESS = 'feed/HOMETOWN_PAGE_SUCCESS';
export const HOMETOWN_PAGE_FAILURE = 'feed/HOMETOWN_PAGE_FAILURE';

export const ALL_PAGE_REQUEST = 'feed/ALL_PAGE_REQUEST';
export const ALL_PAGE_SUCCESS = 'feed/ALL_PAGE_SUCCESS';
export const ALL_PAGE_FAILURE = 'feed/ALL_PAGE_FAILURE';

export const MY_FRIEND_PAGE_REQUEST = 'feed/MY_FRIEND_PAGE_REQUEST';
export const MY_FRIEND_PAGE_SUCCESS = 'feed/MY_FRIEND_PAGE_SUCCESS';
export const MY_FRIEND_PAGE_FAILURE = 'feed/MY_FRIEND_PAGE_FAILURE';

export const LIKE_FEED_REQUEST = 'feed/LIKE_FEED_REQUEST';
export const LIKE_FEED_SUCCESS = 'feed/LIKE_FEED_SUCCESS';
export const LIKE_FEED_FAILURE = 'feed/LIKE_FEED_FAILURE';

export const UNLIKE_FEED_REQUEST = 'feed/UNLIKE_FEED_REQUEST';
export const UNLIKE_FEED_SUCCESS = 'feed/UNLIKE_FEED_SUCCESS';
export const UNLIKE_FEED_FAILURE = 'feed/UNLIKE_FEED_FAILURE';

export const GO_BACK_LOGIN_PAGE = 'GO_BACK_LOGIN_PAGE';
export const PREV_FEED_PAGE = 'feed/PREV_FEED_PAGE';
export const COMMENT_PAGE = 'feed/COMMENT_PAGE';

function* goBackLoginPage() {
  const history = yield getContext('history');
  history.push('/');
}

const hometownPageAPI = (data) => {
  return axios.get();
};

function* hometownPage(action) {
  try {
    // const result = yield call(hometownPageAPI, action);
    yield delay(1000);
    yield put({
      type: HOMETOWN_PAGE_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: HOMETOWN_PAGE_FAILURE,
      error: error.response.data,
    });
  }
}

const allPageAPI = (data) => {
  return axios.get();
};

function* allPage(action) {
  try {
    // const result = yield call(allPageAPI, action);
    yield delay(1000);
    yield put({
      type: ALL_PAGE_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ALL_PAGE_FAILURE,
      error: error.response.data,
    });
  }
}

const myFriendPageAPI = (data) => {
  return axios.get();
};

function* myFriendPage(action) {
  try {
    // const result = yield call(myFriendPageAPI, action);
    yield delay(1000);
    yield put({
      type: MY_FRIEND_PAGE_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: MY_FRIEND_PAGE_FAILURE,
      error: error.response.data,
    });
  }
}

// const commentPageAPI = (data) => {
//   return axios.get();
// };

// function* commentPage(action) {
//   try {
//     // const result = yield call(commentPageAPI, action);
//     yield delay(1000);
//     yield put({
//       type: HOMETOWN_PAGE_SUCCESS,
//     });
//   } catch (error) {
//     console.error(error);
//     yield put({
//       type: HOMETOWN_PAGE_FAILURE,
//       error: error.response.data,
//     });
//   }
// }

const likeFeedAPI = (data) => {
  // data 는 postId
  return axios.patch(`/post/${data}/like`); // 게시글에 일부분을 수정하기 떄문에 patch
};

function* likeFeed(action) {
  try {
    // const result = yield call(likeFeedAPI, action.data);
    yield delay(500);
    yield put({
      type: LIKE_FEED_SUCCESS,
      data: action.data, // 게시글들의 배열이 들어 있음
    });
  } catch (error) {
    yield put({
      type: LIKE_FEED_FAILURE,
      data: error.response.data,
    });
  }
}

const unlikeFeedAPI = (data) => {
  return axios.delete(`/post/${data}/like`); // 최대한 요청, 응답을 가볍게 만들기 위해 두번 쨰 파라미터(data)는 제외(넣어도 되긴 함)
};

function* unlikeFeed(action) {
  try {
    // const result = yield call(unlikeFeedAPI, action.data);
    yield delay(500);
    yield put({
      type: UNLIKE_FEED_SUCCESS,
      data: action.data, // 게시글들의 배열이 들어 있음
    });
  } catch (error) {
    yield put({
      type: UNLIKE_FEED_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchGoBackLoginPage() {
  yield takeLatest(GO_BACK_LOGIN_PAGE, goBackLoginPage);
}

function* watchHometownPage() {
  yield takeLatest(HOMETOWN_PAGE_REQUEST, hometownPage);
}

function* watchAllPage() {
  yield takeLatest(ALL_PAGE_REQUEST, allPage);
}

function* watchMyFriendPage() {
  yield takeLatest(MY_FRIEND_PAGE_REQUEST, myFriendPage);
}

function* watchLikeFeed() {
  yield takeLatest(LIKE_FEED_REQUEST, likeFeed);
}

function* watchUnlikeFeed() {
  yield takeLatest(UNLIKE_FEED_REQUEST, unlikeFeed);
}

export function* feedSaga() {
  yield all([
    fork(watchHometownPage),
    fork(watchAllPage),
    fork(watchMyFriendPage),
    fork(watchGoBackLoginPage),
    fork(watchLikeFeed),
    fork(watchUnlikeFeed),
  ]);
}

/* 리듀서 */
const feed = (state = initialSate, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      /* 우리동네 페이지 화면 이동 */
      case HOMETOWN_PAGE_REQUEST:
        draft.hometownPageLoading = true;
        draft.hometownPageDone = false;
        draft.hometownPageError = null;
        break;
      case HOMETOWN_PAGE_SUCCESS:
        draft.pageIndex = 1;
        draft.titleIndex = 1;
        draft.prevPageIndex = 1;
        draft.hometownPageLoading = false;
        draft.hometownPageDone = true;
        break;
      case HOMETOWN_PAGE_FAILURE:
        draft.hometownPageLoading = false;
        draft.hometownPageError = action.error;
        break;
      /* 전체 페이지 화면 이동 */
      case ALL_PAGE_REQUEST:
        draft.allPageLoading = true;
        draft.allPageDone = false;
        draft.allPageError = null;
        break;
      case ALL_PAGE_SUCCESS:
        draft.pageIndex = 2;
        draft.titleIndex = 2;
        draft.prevPageIndex = 2;
        draft.allPageLoading = false;
        draft.allPageDone = true;
        break;
      case ALL_PAGE_FAILURE:
        draft.allPageLoading = false;
        draft.allPageError = action.error;
        break;
      /* 내 친구 페이지 화면 이동 */
      case MY_FRIEND_PAGE_REQUEST:
        draft.myFriendPageLoading = true;
        draft.myFriendPageDone = false;
        draft.myFriendPageError = null;
        break;
      case MY_FRIEND_PAGE_SUCCESS:
        draft.pageIndex = 3;
        draft.titleIndex = 3;
        draft.prevPageIndex = 3;
        draft.myFriendPageLoading = false;
        draft.myFriendPageDone = true;
        break;
      case MY_FRIEND_PAGE_FAILURE:
        draft.myFriendPageLoading = false;
        draft.myFriendPageError = action.error;
        break;
      /* 좋아요 */
      case LIKE_FEED_REQUEST:
        draft.likeFeedLoading = true;
        draft.likeFeedDone = false;
        draft.likeFeedError = null;
        break;
      case LIKE_FEED_SUCCESS: {
        const getFeed = draft.Feeds.find((value) => value.id === action.data.feedId); // 피드글 가져옴
        getFeed.Likers.push({ id: action.data.userId });
        draft.likeFeedLoading = false;
        draft.likeFeedDone = true;
        break;
      }
      case LIKE_FEED_FAILURE:
        draft.likeFeedLoading = false;
        draft.likeFeedDone = action.error;
        break;
      /* 좋아요 취소 */
      case UNLIKE_FEED_REQUEST:
        draft.unLikeFeedLoading = true;
        draft.unLikeFeedDone = false;
        draft.unLikeFeedError = null;
        break;
      case UNLIKE_FEED_SUCCESS: {
        const getFeed = draft.Feeds.find((value) => value.id === action.data.feedId);
        getFeed.Likers = getFeed.Likers.filter((value) => value.id !== action.data.userId);
        draft.unLikeFeedLoading = false;
        draft.unLikeFeedDone = true;
        break;
      }
      case UNLIKE_FEED_FAILURE:
        draft.unLikeFeedLoading = false;
        draft.unLikeFeedError = action.error;
        break;
      /* 이전 페이지 이동 */
      case PREV_FEED_PAGE:
        draft.pageIndex = action.data;
        break;
      /* 댓글 화면 이동 */
      case COMMENT_PAGE:
        draft.pageIndex = 4;
        break;
      default:
        break;
    }
  });
};

export default feed;
