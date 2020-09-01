import { put, delay, takeLatest, all, fork, call, getContext } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';

export const initialSate = {
  pageIndex: 1,
  titleIndex: 1,
  tagIndex: 1,
  hotIndex: 1,
  feedAllTags: {
    filterTypes: [
      {
        id: 1,
        name: '우리동네',
      },
      {
        id: 2,
        name: '전체',
      },
      {
        id: 3,
        name: '내친구',
      },
    ],
    feedTags: [
      {
        id: 1,
        name: '일상',
      },
      {
        id: 2,
        name: '나눔',
      },
      {
        id: 3,
        name: '탁묘',
      },
    ],
    sortTypes: [
      {
        id: 1,
        name: '인기글',
      },
      {
        id: 2,
        name: '전체글',
      },
    ],
  },
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
      {
        id: 2,
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
            id: 1,
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
          {
            id: 3,
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
  getFeedTagLoading: false, // 피드 태그 불러오기
  getFeedTagDone: false,
  getFeedTagError: null,
  filterTypeLoading: false, // 필터 타입 불러오기
  filterTypeDone: false,
  filterTypeError: null,
  likeFeedLoading: false, // 좋아요
  likeFeedDone: false,
  likeFeedError: null,
  unLikeFeedLoading: false, // 좋아요 취소
  unLikeFeedDone: false,
  unLikeFeedError: null,
};

export const GET_FEED_TAG_REQUEST = 'feed/GET_FEED_TAG_REQUEST';
export const GET_FEED_TAG_SUCCESS = 'feed/GET_FEED_TAG_SUCCESS';
export const GET_FEED_TAG_FAILURE = 'feed/GET_FEED_TAG_FAILURE';

export const FILTER_TYPE_1_REQUEST = 'feed/FILTER_TYPE_1_REQUEST';
export const FILTER_TYPE_1_SUCCESS = 'feed/FILTER_TYPE_1_SUCCESS';
export const FILTER_TYPE_1_FAILURE = 'feed/FILTER_TYPE_1_FAILURE';

export const FILTER_TYPE_2_REQUEST = 'feed/FILTER_TYPE_2_REQUEST';
export const FILTER_TYPE_2_SUCCESS = 'feed/FILTER_TYPE_2_SUCCESS';
export const FILTER_TYPE_2_FAILURE = 'feed/FILTER_TYPE_2_FAILURE';

export const FILTER_TYPE_3_REQUEST = 'feed/FILTER_TYPE_3_REQUEST';
export const FILTER_TYPE_3_SUCCESS = 'feed/FILTER_TYPE_3_SUCCESS';
export const FILTER_TYPE_3_FAILURE = 'feed/FILTER_TYPE_3_FAILURE';

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

const getFeedTagAPI = () => {
  return axios.get('/feed-all-tags');
};

function* getFeedTag(action) {
  try {
    const result = yield call(getFeedTagAPI, action);
    yield put({
      type: GET_FEED_TAG_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_FEED_TAG_FAILURE,
      error: error.response.data,
    });
  }
}

const filterType1API = ({ filterTypeId, feedTagId }) => {
  const params = {
    filterTypeId,
    feedTagId,
  };
  return axios.get('', { params });
};

function* filterType1(action) {
  try {
    // const result = yield call(filterTypeAPI, action);
    yield put({
      type: FILTER_TYPE_1_SUCCESS,
      data: {
        pageIndex: action.data.filterTypeId,
        titleIndex: action.data.filterTypeId,
        tagIndex: action.data.feedTagId,
        // Feeds: result.data,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FILTER_TYPE_1_FAILURE,
      error: error.response.data,
    });
  }
}

const filterType2API = ({ filterTypeId, sortTypes }) => {
  const params = {
    filterTypeId,
    sortTypes,
  };
  return axios.get('', { params });
};

function* filterType2(action) {
  try {
    // const result = yield call(filterTypeAPI, action);
    yield put({
      type: FILTER_TYPE_2_SUCCESS,
      data: {
        pageIndex: action.data.filterTypeId,
        titleIndex: action.data.filterTypeId,
        hotIndex: action.data.sortTypes,
        // Feeds: result.data,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FILTER_TYPE_2_FAILURE,
      error: error.response.data,
    });
  }
}

const filterType3API = ({ filterTypeId }) => {
  const params = {
    filterTypeId,
  };
  return axios.get('', { params });
};

function* filterType3(action) {
  try {
    // const result = yield call(filterTypeAPI, action);
    yield put({
      type: FILTER_TYPE_3_SUCCESS,
      data: {
        pageIndex: action.data.filterTypeId,
        titleIndex: action.data.filterTypeId,
        // Feeds: result.data,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FILTER_TYPE_3_FAILURE,
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

function* watchGetFeedTag() {
  yield takeLatest(GET_FEED_TAG_REQUEST, getFeedTag);
}

function* watchFilterType1() {
  yield takeLatest(FILTER_TYPE_1_REQUEST, filterType1);
}

function* watchFilterType2() {
  yield takeLatest(FILTER_TYPE_2_REQUEST, filterType2);
}

function* watchFilterType3() {
  yield takeLatest(FILTER_TYPE_3_REQUEST, filterType3);
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
    fork(watchGetFeedTag),
    fork(watchFilterType1),
    fork(watchFilterType2),
    fork(watchFilterType3),
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
      /*  피드 태그 가져오기 */
      case GET_FEED_TAG_REQUEST:
        draft.getFeedTagLoading = true;
        draft.getFeedTagDone = false;
        draft.getFeedTagError = null;
        break;
      case GET_FEED_TAG_SUCCESS:
        draft.feedAllTags = action.data;
        draft.getFeedTagLoading = false;
        draft.getFeedTagDone = true;
        break;
      case GET_FEED_TAG_FAILURE:
        draft.getFeedTagLoading = false;
        draft.getFeedTagError = action.error;
        break;
      /* 필터 타입1 화면 이동 */
      case FILTER_TYPE_1_REQUEST:
        draft.filterTypeLoading = true;
        draft.filterTypeDone = false;
        draft.filterTypeError = null;
        break;
      case FILTER_TYPE_1_SUCCESS:
        draft.pageIndex = action.data.pageIndex;
        draft.titleIndex = action.data.pageIndex;
        draft.tagIndex = action.data.tagIndex;
        // draft.Feeds = action.data.Feeds;
        draft.filterTypeLoading = false;
        draft.filterTypeDone = true;
        break;
      case FILTER_TYPE_1_FAILURE:
        draft.filterTypeLoading = false;
        draft.filterTypeError = action.error;
        break;
      /* 필터 타입2 화면 이동 */
      case FILTER_TYPE_2_REQUEST:
        draft.filterTypeLoading = true;
        draft.filterTypeDone = false;
        draft.filterTypeError = null;
        break;
      case FILTER_TYPE_2_SUCCESS:
        draft.pageIndex = action.data.pageIndex;
        draft.titleIndex = action.data.pageIndex;
        draft.hotIndex = action.data.hotIndex;
        // draft.Feeds = action.data.Feeds;
        draft.filterTypeLoading = false;
        draft.filterTypeDone = true;
        break;
      case FILTER_TYPE_2_FAILURE:
        draft.filterTypeLoading = false;
        draft.filterTypeError = action.error;
        break;
      /* 필터 타입3 화면 이동 */
      case FILTER_TYPE_3_REQUEST:
        draft.filterTypeLoading = true;
        draft.filterTypeDone = false;
        draft.filterTypeError = null;
        break;
      case FILTER_TYPE_3_SUCCESS:
        draft.pageIndex = action.data.pageIndex;
        draft.titleIndex = action.data.pageIndex;
        // draft.Feeds = action.data.Feeds;
        draft.filterTypeLoading = false;
        draft.filterTypeDone = true;
        break;
      case FILTER_TYPE_3_FAILURE:
        draft.filterTypeLoading = false;
        draft.filterTypeError = action.error;
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
