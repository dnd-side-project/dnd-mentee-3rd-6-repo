import { put, delay, takeLatest, all, fork, call, getContext } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

export const initialSate = {
  pageIndex: 1,
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
            url: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/kitty-551554_1280.jpg',
          },
          {
            id: 2,
            url: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
          },
        ],
        author: {
          id: 1,
          nickName: '연탄범벅 연탄이네',
          profileImg: 'https://i.ytimg.com/vi/IMaRld3s0CY/maxresdefault.jpg',
          addressName: '분당구 정자 2동',
        },
        comments: [
          {
            id: 2,
            content: '넘 귀여운거 아닌가요?!',
            numberOfLikes: 10,
            isLike: false,
            numberOfReplies: 1,
            createdDateTime: '2020-01-02T21:23:00',
            timeDesc: '3시간 전',
            author: {
              id: 1,
              nickName: '연탄범벅 연탄이네',
              profileImg: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
              addressName: '수지구 풍덕천동',
            },
            replies: [
              {
                id: 3,
                content: '까미랑 보리랑',
                numberOfLikes: 3,
                isLike: false,
                createdDateTime: '2020-01-02T21:23:00',
                timeDesc: '5시간 전',
                author: {
                  id: 1,
                  nickName: '연탄범벅 연탄이네',
                  profileImg: 'https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519_1280.jpg',
                  addressName: '수지구 풍덕천동',
                },
              },
            ],
          },
        ],
        isLike: true,
        numberOfLikes: 15,
        numberOfComments: 6,
        createdDateTime: '2020-01-02T21:23:00',
        timeDesc: '6시간전',
      },
    ],
  },
  feedId: null,
  hometownPageLoading: false, // 우리동네 페이지 불러오기 1
  hometownPageDone: false,
  hometownPageError: null,
  allPageLoading: false, // 전체 페이지 불러오기 2
  allPageDone: false,
  allPageError: null,
  myFriendLoading: false, // 내 친구 페이지 불러오기 3
  myFriendDone: false,
  myFriendError: null,
  likeFeedLoading: false, // 좋아요
  likeFeedDone: false,
  likeFeedError: null,
  unLikeFeedLoading: false, // 좋아요 취소
  unLikeFeedDone: false,
  unLikeFeedError: null,
};

const headers = (token) => ({ Authorization: `${token}` });

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

export const LIKE_COMMENT_REQUEST = 'feed/LIKE_COMMENT_REQUEST';
export const LIKE_COMMENT_SUCCESS = 'feed/LIKE_COMMENT_SUCCESS';
export const LIKE_COMMENT_FAILURE = 'feed/LIKE_COMMENT_FAILURE';

export const UNLIKE_COMMENT_REQUEST = 'feed/UNLIKE_COMMENT_REQUEST';
export const UNLIKE_COMMENT_SUCCESS = 'feed/UNLIKE_COMMENT_SUCCESS';
export const UNLIKE_COMMENT_FAILURE = 'feed/UNLIKE_COMMENT_FAILURE';

export const LIKE_REPLE_REQUEST = 'feed/LIKE_REPLE_REQUEST';
export const LIKE_REPLE_SUCCESS = 'feed/LIKE_REPLE_SUCCESS';
export const LIKE_REPLE_FAILURE = 'feed/LIKE_REPLE_FAILURE';

export const UNLIKE_REPLE_REQUEST = 'feed/UNLIKE_REPLE_REQUEST';
export const UNLIKE_REPLE_SUCCESS = 'feed/UNLIKE_REPLE_SUCCESS';
export const UNLIKE_REPLE_FAILURE = 'feed/UNLIKE_REPLE_FAILURE';

export const GO_BACK_LOGIN_PAGE = 'GO_BACK_LOGIN_PAGE';
export const PREV_FEED_PAGE = 'feed/PREV_FEED_PAGE';
export const COMMENT_PAGE = 'feed/COMMENT_PAGE';

function* goBackLoginPage() {
  const history = yield getContext('history');
  history.push('/');
}

const hometownPageAPI = ({ accessToken }) => {
  const params = {};
  return axios.get('', { params, headers: headers(accessToken) });
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

const likeCommentAPI = (data) => {
  // data 는 postId
  return axios.patch(`/post/${data}/like`); // 게시글에 일부분을 수정하기 떄문에 patch
};

function* likeComment(action) {
  try {
    // const result = yield call(likeCommentAPI, action.data);
    yield delay(500);
    yield put({
      type: LIKE_COMMENT_SUCCESS,
      data: action.data, // 게시글들의 배열이 들어 있음
    });
  } catch (error) {
    yield put({
      type: LIKE_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

const unlikeCommentAPI = (data) => {
  return axios.delete(`/post/${data}/like`); // 최대한 요청, 응답을 가볍게 만들기 위해 두번 쨰 파라미터(data)는 제외(넣어도 되긴 함)
};

function* unlikeComment(action) {
  try {
    // const result = yield call(unlikeCommentAPI, action.data);
    yield delay(500);
    yield put({
      type: UNLIKE_COMMENT_SUCCESS,
      data: action.data, // 게시글들의 배열이 들어 있음
    });
  } catch (error) {
    yield put({
      type: UNLIKE_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

const likeRepleAPI = (data) => {
  // data 는 postId
  return axios.patch(`/post/${data}/like`); // 게시글에 일부분을 수정하기 떄문에 patch
};

function* likeReple(action) {
  try {
    // const result = yield call(likeRepleAPI, action.data);
    yield delay(500);
    yield put({
      type: LIKE_REPLE_SUCCESS,
      data: action.data, // 게시글들의 배열이 들어 있음
    });
  } catch (error) {
    yield put({
      type: LIKE_REPLE_FAILURE,
      data: error.response.data,
    });
  }
}

const unlikeRepleAPI = (data) => {
  return axios.delete(`/post/${data}/like`); // 최대한 요청, 응답을 가볍게 만들기 위해 두번 쨰 파라미터(data)는 제외(넣어도 되긴 함)
};

function* unlikeReple(action) {
  try {
    // const result = yield call(unlikeRepleAPI, action.data);
    yield delay(500);
    yield put({
      type: UNLIKE_REPLE_SUCCESS,
      data: action.data, // 게시글들의 배열이 들어 있음
    });
  } catch (error) {
    yield put({
      type: UNLIKE_REPLE_FAILURE,
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

function* watchLikeComment() {
  yield takeLatest(LIKE_COMMENT_REQUEST, likeComment);
}

function* watchUnlikeComment() {
  yield takeLatest(UNLIKE_COMMENT_REQUEST, unlikeComment);
}

function* watchLikeReple() {
  yield takeLatest(LIKE_REPLE_REQUEST, likeReple);
}

function* watchUnlikeReple() {
  yield takeLatest(UNLIKE_REPLE_REQUEST, unlikeReple);
}

export function* feedSaga() {
  yield all([
    fork(watchHometownPage),
    fork(watchAllPage),
    fork(watchMyFriendPage),
    fork(watchGoBackLoginPage),
    fork(watchLikeFeed),
    fork(watchUnlikeFeed),
    fork(watchLikeComment),
    fork(watchUnlikeComment),
    fork(watchLikeReple),
    fork(watchUnlikeReple),
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
        draft.feedId = action.data;
        draft.pageIndex = 4;
        break;
      default:
        break;
    }
  });
};

export default feed;
