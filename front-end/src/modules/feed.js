import { put, takeLatest, throttle, all, fork, call, getContext } from 'redux-saga/effects';
import axios from 'axios';
import produce from 'immer';
import { GO_BACK_FEED_PAGE } from './write';

export const initialSate = {
  pageIndex: 1,
  filterIndex: 1,
  tagIndex: 1,
  sortIndex: 1,
  filterTypes: [
    { id: 1, name: '우리동네' },
    { id: 2, name: '전체' },
    { id: 3, name: '내친구' },
  ],
  sortTypes: [
    { id: 1, name: '인기글' },
    { id: 2, name: '전체글' },
  ],
  feedTags: null,
  Feeds: {},
  FeedById: {},
  commentId: null,
  getFeedTagLoading: false, // 피드 태그 불러오기
  getFeedTagDone: false,
  getFeedTagError: null,
  getFeedListLoading: false, // 필터 리스트 불러오기
  getFeedListDone: false,
  getFeedListError: null,
  getCommentLoading: false, // 댓글 페이지 불러오기
  getCommentDone: false,
  getCommentError: null,
  likeFeedLoading: false, // 좋아요
  likeFeedDone: false,
  likeFeedError: null,
  unLikeFeedLoading: false, // 좋아요 취소
  unLikeFeedDone: false,
  unLikeFeedError: null,
  likeCommentLoading: false, // 댓글 좋아요
  likeCommentDone: false,
  likeCommentError: null,
  unLikeCommentLoading: false, // 댓글 좋아요 취소
  unLikeCommentDone: false,
  unLikeCommentError: null,
  likeReplyLoading: false, // 대댓글 좋아요
  likeReplyDone: false,
  likeReplyError: null,
  unLikeReplyLoading: false, // 대댓글 좋아요 취소
  unLikeReplyDone: false,
  unLikeReplyError: null,
  addFeedLoading: false, // 피드글 작성
  addFeedDone: false,
  addFeedError: null,
  addCommentLoading: false, // 피드 댓글 작성
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false, // 댓글 삭제
  removeCommentDone: false,
  removeCommentError: null,
  removeReplyLoading: false, // 대댓글 삭제
  removeReplyDone: false,
  removeReplyError: null,
};

export const GET_FEED_TAG_REQUEST = 'feed/GET_FEED_TAG_REQUEST';
export const GET_FEED_TAG_SUCCESS = 'feed/GET_FEED_TAG_SUCCESS';
export const GET_FEED_TAG_FAILURE = 'feed/GET_FEED_TAG_FAILURE';

export const GET_FEED_LIST_1_REQUEST = 'feed/GET_FEED_LIST_1_REQUEST';
export const GET_FEED_LIST_1_SUCCESS = 'feed/GET_FEED_LIST_1_SUCCESS';
export const GET_FEED_LIST_1_FAILURE = 'feed/GET_FEED_LIST_1_FAILURE';

export const GET_FEED_LIST_2_REQUEST = 'feed/GET_FEED_LIST_2_REQUEST';
export const GET_FEED_LIST_2_SUCCESS = 'feed/GET_FEED_LIST_2_SUCCESS';
export const GET_FEED_LIST_2_FAILURE = 'feed/GET_FEED_LIST_2_FAILURE';

export const GET_FEED_LIST_3_REQUEST = 'feed/GET_FEED_LIST_3_REQUEST';
export const GET_FEED_LIST_3_SUCCESS = 'feed/GET_FEED_LIST_3_SUCCESS';
export const GET_FEED_LIST_3_FAILURE = 'feed/GET_FEED_LIST_3_FAILURE';

export const GET_COMMENT_REQUEST = 'feed/GET_COMMENT_REQUEST';
export const GET_COMMENT_SUCCESS = 'feed/GET_COMMENT_SUCCESS';
export const GET_COMMENT_FAILURE = 'feed/GET_COMMENT_FAILURE';

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

export const LIKE_REPLY_REQUEST = 'feed/LIKE_REPLY_REQUEST';
export const LIKE_REPLY_SUCCESS = 'feed/LIKE_REPLY_SUCCESS';
export const LIKE_REPLY_FAILURE = 'feed/LIKE_REPLY_FAILURE';

export const UNLIKE_REPLY_REQUEST = 'feed/UNLIKE_REPLY_REQUEST';
export const UNLIKE_REPLY_SUCCESS = 'feed/UNLIKE_REPLY_SUCCESS';
export const UNLIKE_REPLY_FAILURE = 'feed/UNLIKE_REPLY_FAILURE';

export const ADD_FEED_REQUEST = 'feed/ADD_FEED_REQUEST';
export const ADD_FEED_SUCCESS = 'feed/ADD_FEED_SUCCESS';
export const ADD_FEED_FAILURE = 'feed/ADD_FEED_FAILURE';

export const ADD_COMMENT_REQUEST = 'feed/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'feed/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'feed/ADD_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'feed/REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'feed/REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'feed/REMOVE_COMMENT_FAILURE';

export const REMOVE_REPLY_REQUEST = 'feed/REMOVE_REPLY_REQUEST';
export const REMOVE_REPLY_SUCCESS = 'feed/REMOVE_REPLY_SUCCESS';
export const REMOVE_REPLY_FAILURE = 'feed/REMOVE_REPLY_FAILURE';

export const ADD_REPLY_COMMENT_REQUEST = 'feed/ADD_REPLY_COMMENT_REQUEST';
export const ADD_REPLY_COMMENT_SUCCESS = 'feed/ADD_REPLY_COMMENT_SUCCESS';
export const ADD_REPLY_COMMENT_FAILURE = 'feed/ADD_REPLY_COMMENT_FAILURE';

export const ON_REPLY = 'feed/ON_REPLY';
export const OFF_REPLY = 'feed/OFF_REPLY';
export const GO_BACK_LOG_IN_PAGE = 'GO_BACK_LOG_IN_PAGE';
export const CURRENT_FEED_PAGE = 'feed/CURRENT_FEED_PAGE';
export const PREV_FEED_PAGE = 'feed/PREV_FEED_PAGE';

function* goBackLoginPage() {
  const history = yield getContext('history');
  history.push('/');
}

const getFeedTagAPI = () => {
  return axios.get('/tags');
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

const getFeedList1API = ({ filterId, tagId, pageNumber, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const filterTypeList = ['HOMETOWN', 'ALL', 'FRIEND'];

  const params = {
    filterType: filterTypeList[filterId - 1],
    tagId,
    pageNumber: pageNumber || 0,
    pageSize: 10,
  };

  return axios.get('/feeds', { params, headers });
};

function* getFeedList1(action) {
  try {
    const result = yield call(getFeedList1API, action.data);
    yield put({
      type: GET_FEED_LIST_1_SUCCESS,
      data: result.data,
    });
    yield put({
      type: CURRENT_FEED_PAGE,
      data: {
        pageIndex: action.data.filterId,
        filterIndex: action.data.filterId,
        tagIndex: action.data.tagId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_FEED_LIST_1_FAILURE,
      error: error.response.data,
    });
  }
}

const getFeedList2API = ({ filterId, sortId, pageNumber, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const filterTypeList = ['HOMETOWN', 'ALL', 'FRIEND'];
  const sortList = ['POPULAR', 'LATEST'];

  const params = {
    filterType: filterTypeList[filterId - 1],
    sortType: sortList[sortId - 1],
    pageNumber: pageNumber || 0,
    pageSize: 10,
  };
  return axios.get('/feeds', { params, headers });
};

function* getFeedList2(action) {
  try {
    const result = yield call(getFeedList2API, action.data);
    yield put({
      type: GET_FEED_LIST_2_SUCCESS,
      data: result.data,
    });
    yield put({
      type: CURRENT_FEED_PAGE,
      data: {
        pageIndex: action.data.filterId,
        filterIndex: action.data.filterId,
        sortIndex: action.data.sortId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_FEED_LIST_2_FAILURE,
      error: error.response.data,
    });
  }
}

const getFeedList3API = ({ filterId, pageNumber, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const filterTypeList = ['HOMETOWN', 'ALL', 'FRIEND'];

  const params = {
    filterType: filterTypeList[filterId - 1],
    pageNumber: pageNumber || 0,
    pageSize: 10,
  };
  return axios.get('/feeds', { params, headers });
};

function* getFeedList3(action) {
  try {
    const result = yield call(getFeedList3API, action.data);
    yield put({
      type: GET_FEED_LIST_3_SUCCESS,
      data: result.data,
    });
    yield put({
      type: CURRENT_FEED_PAGE,
      data: {
        pageIndex: action.data.filterId,
        filterIndex: action.data.filterId,
      },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_FEED_LIST_3_FAILURE,
      error: error.response.data,
    });
  }
}

const getCommentAPI = ({ feedId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };

  return axios.get(`/feeds/${feedId}`, { headers });
};

function* getComment(action) {
  try {
    const result = yield call(getCommentAPI, action.data);
    yield put({
      type: GET_COMMENT_SUCCESS,
      data: {
        FeedById: result.data,
        feedId: action.data.feedId,
      },
    });
  } catch (error) {
    yield put({
      type: GET_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

const likeFeedAPI = ({ feedId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const data = {
    feedId,
  };

  return axios.post('/feed-likes', data, { headers });
};

function* likeFeed(action) {
  try {
    yield call(likeFeedAPI, action.data);
    yield put({
      type: LIKE_FEED_SUCCESS,
      data: action.data.feedId,
    });
  } catch (error) {
    yield put({
      type: LIKE_FEED_FAILURE,
      data: error.response.data,
    });
  }
}

const unlikeFeedAPI = ({ accessToken, feedId }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const params = { feedId };

  return axios.delete('/feed-likes', { params, headers });
};

function* unlikeFeed(action) {
  try {
    yield call(unlikeFeedAPI, action.data);
    yield put({
      type: UNLIKE_FEED_SUCCESS,
      data: action.data.feedId,
    });
  } catch (error) {
    yield put({
      type: UNLIKE_FEED_FAILURE,
      data: error.response.data,
    });
  }
}

const likeCommentAPI = ({ commentId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const data = {
    commentId,
  };

  return axios.post('/comment-likes', data, { headers });
};

function* likeComment(action) {
  try {
    yield call(likeCommentAPI, action.data);
    yield put({
      type: LIKE_COMMENT_SUCCESS,
      data: action.data.commentId,
    });
  } catch (error) {
    yield put({
      type: LIKE_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

const unlikeCommentAPI = ({ commentId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const params = { commentId };

  return axios.delete('/comment-likes', { params, headers });
};

function* unlikeComment(action) {
  try {
    yield call(unlikeCommentAPI, action.data);
    yield put({
      type: UNLIKE_COMMENT_SUCCESS,
      data: action.data.commentId,
    });
  } catch (error) {
    yield put({
      type: UNLIKE_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

const likeReplyAPI = ({ replyId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const data = {
    replyId,
  };

  return axios.post('/reply-likes', data, { headers });
};

function* likeReply(action) {
  console.log(action.data);
  try {
    yield call(likeReplyAPI, action.data);
    yield put({
      type: LIKE_REPLY_SUCCESS,
      data: {
        commentId: action.data.commentId,
        replyId: action.data.replyId,
      },
    });
  } catch (error) {
    yield put({
      type: LIKE_REPLY_FAILURE,
      data: error.response.data,
    });
  }
}

const unlikeReplyAPI = ({ replyId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const params = { replyId };

  return axios.delete('/reply-likes', { params, headers });
};

function* unlikeReply(action) {
  try {
    yield call(unlikeReplyAPI, action.data);
    yield put({
      type: UNLIKE_REPLY_SUCCESS,
      data: {
        commentId: action.data.commentId,
        replyId: action.data.replyId,
      },
    });
  } catch (error) {
    yield put({
      type: UNLIKE_REPLY_FAILURE,
      data: error.response.data,
    });
  }
}

const addFeedAPI = (data) => {
  const headers = { Authorization: `Bearer ${data.accessToken}` };

  return axios.post('/feeds', data.formData, { headers });
};

function* addFeed(action) {
  try {
    const result = yield call(addFeedAPI, action.data);
    yield put({
      type: ADD_FEED_SUCCESS,
      data: {
        contents: result.data,
        tagIndex: action.data.tagId,
      },
    });
    yield put({
      type: GO_BACK_FEED_PAGE,
    });
  } catch (error) {
    yield put({
      type: ADD_FEED_FAILURE,
      data: error.response.data,
    });
  }
}

const addCommentAPI = ({ content, feedId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const data = { feedId, content };

  return axios.post('/feed-comments', data, { headers });
};

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        comments: result.data,
        feedId: action.data.feedId,
      },
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

const addReplyCommentAPI = ({ content, commentId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const data = { commentId, content };

  return axios.post('/replies', data, { headers });
};

function* addReplyComment(action) {
  try {
    const result = yield call(addReplyCommentAPI, action.data);
    yield put({
      type: ADD_REPLY_COMMENT_SUCCESS,
      data: {
        replies: result.data,
        commentId: action.data.commentId,
      },
    });
    yield put({
      type: OFF_REPLY,
    });
  } catch (error) {
    yield put({
      type: ADD_REPLY_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

const removeCommentAPI = ({ commentId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };

  return axios.delete(`/feed-comments/${commentId}`, { headers });
};

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: {
        feedId: action.data.feedId,
        id: result.data.id,
      },
    });
  } catch (error) {
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

const removeReplyAPI = ({ replyId, accessToken }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };

  return axios.delete(`/replies/${replyId}`, { headers });
};

function* removeReply(action) {
  try {
    const result = yield call(removeReplyAPI, action.data);
    yield put({
      type: REMOVE_REPLY_SUCCESS,
      data: {
        commentId: action.data.commentId,
        id: result.data.id,
      },
    });
  } catch (error) {
    yield put({
      type: REMOVE_REPLY_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchGoBackLoginPage() {
  yield takeLatest(GO_BACK_LOG_IN_PAGE, goBackLoginPage);
}

function* watchGetFeedTag() {
  yield takeLatest(GET_FEED_TAG_REQUEST, getFeedTag);
}

function* watchGetFeedList1() {
  yield throttle(5000, GET_FEED_LIST_1_REQUEST, getFeedList1);
}

function* watchGetFeedList2() {
  yield throttle(5000, GET_FEED_LIST_2_REQUEST, getFeedList2);
}

function* watchGetFeedList3() {
  yield throttle(5000, GET_FEED_LIST_3_REQUEST, getFeedList3);
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

function* watchLikeReply() {
  yield takeLatest(LIKE_REPLY_REQUEST, likeReply);
}

function* watchUnlikeReply() {
  yield takeLatest(UNLIKE_REPLY_REQUEST, unlikeReply);
}

function* watchAddFeed() {
  yield takeLatest(ADD_FEED_REQUEST, addFeed);
}

function* watchGetComment() {
  yield takeLatest(GET_COMMENT_REQUEST, getComment);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchAddReplyComment() {
  yield takeLatest(ADD_REPLY_COMMENT_REQUEST, addReplyComment);
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

function* watchRemoveReply() {
  yield takeLatest(REMOVE_REPLY_REQUEST, removeReply);
}

export function* feedSaga() {
  yield all([
    fork(watchGetFeedTag),
    fork(watchGetFeedList1),
    fork(watchGetFeedList2),
    fork(watchGetFeedList3),
    fork(watchGetComment),
    fork(watchGoBackLoginPage),
    fork(watchLikeFeed),
    fork(watchUnlikeFeed),
    fork(watchLikeComment),
    fork(watchUnlikeComment),
    fork(watchLikeReply),
    fork(watchUnlikeReply),
    fork(watchAddFeed),
    fork(watchAddComment),
    fork(watchAddReplyComment),
    fork(watchRemoveComment),
    fork(watchRemoveReply),
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
        draft.feedTags = action.data;
        draft.getFeedTagLoading = false;
        draft.getFeedTagDone = true;
        break;
      case GET_FEED_TAG_FAILURE:
        draft.getFeedTagLoading = false;
        draft.getFeedTagError = action.error;
        break;
      /* 피드 리스트(우리 동네) 가져오기 */
      case GET_FEED_LIST_1_REQUEST:
        draft.getFeedListLoading = true;
        draft.getFeedListDone = false;
        draft.getFeedListError = null;
        break;
      case GET_FEED_LIST_1_SUCCESS:
        draft.Feeds = action.data;
        draft.getFeedListLoading = false;
        draft.getFeedListDone = true;
        break;
      case GET_FEED_LIST_1_FAILURE:
        draft.getFeedListLoading = false;
        draft.getFeedListError = action.error;
        break;
      /* 피드 리스트(전체) 가져오기 */
      case GET_FEED_LIST_2_REQUEST:
        draft.getFeedListLoading = true;
        draft.getFeedListDone = false;
        draft.getFeedListError = null;
        break;
      case GET_FEED_LIST_2_SUCCESS:
        draft.Feeds = action.data;
        draft.getFeedListLoading = false;
        draft.getFeedListDone = true;
        break;
      case GET_FEED_LIST_2_FAILURE:
        draft.getFeedListLoading = false;
        draft.getFeedListError = action.error;
        break;
      /* 피드 리스트(내 친구) 가져오기 */
      case GET_FEED_LIST_3_REQUEST:
        draft.getFeedListLoading = true;
        draft.getFeedListDone = false;
        draft.getFeedListError = null;
        break;
      case GET_FEED_LIST_3_SUCCESS:
        draft.Feeds = action.data;
        draft.getFeedListLoading = false;
        draft.getFeedListDone = true;
        break;
      case GET_FEED_LIST_3_FAILURE:
        draft.getFeedListLoading = false;
        draft.getFeedListError = action.error;
        break;
      /* 댓글 화면 불러오기 */
      case GET_COMMENT_REQUEST:
        draft.getCommentLoading = true;
        draft.getCommentDone = false;
        draft.getCommentError = null;
        break;
      case GET_COMMENT_SUCCESS:
        draft.FeedById = action.data.FeedById;
        draft.pageIndex = 4;
        draft.getCommentLoading = false;
        draft.getCommentDone = true;
        break;
      case GET_COMMENT_FAILURE:
        draft.getCommentLoading = false;
        draft.getCommentError = action.error;
        break;
      /* 좋아요 */
      case LIKE_FEED_REQUEST:
        draft.likeFeedLoading = true;
        draft.likeFeedDone = false;
        draft.likeFeedError = null;
        break;
      case LIKE_FEED_SUCCESS: {
        const getFeedById = draft.Feeds.contents.find((v) => v.id === action.data);
        getFeedById.isLike = true;
        getFeedById.numberOfLikes += 1;

        draft.likeFeedLoading = false;
        draft.likeFeedDone = true;
        break;
      }
      case LIKE_FEED_FAILURE:
        draft.likeFeedLoading = false;
        draft.likeFeedError = action.error;
        break;
      /* 좋아요 취소 */
      case UNLIKE_FEED_REQUEST:
        draft.unLikeFeedLoading = true;
        draft.unLikeFeedDone = false;
        draft.unLikeFeedError = null;
        break;
      case UNLIKE_FEED_SUCCESS: {
        const getFeedById = draft.Feeds.contents.find((v) => v.id === action.data);
        getFeedById.isLike = false;
        getFeedById.numberOfLikes -= 1;

        draft.unLikeFeedLoading = false;
        draft.unLikeFeedDone = true;
        break;
      }
      case UNLIKE_FEED_FAILURE:
        draft.unLikeFeedLoading = false;
        draft.unLikeFeedError = action.error;
        break;
      /* 댓글 좋아요 */
      case LIKE_COMMENT_REQUEST:
        draft.likeCommentLoading = true;
        draft.likeCommentDone = false;
        draft.likeCommentError = null;
        break;
      case LIKE_COMMENT_SUCCESS: {
        const getCommentById = draft.FeedById.comments.find((v) => v.id === action.data);
        getCommentById.isLike = true;
        getCommentById.numberOfLikes += 1;

        draft.likeCommentLoading = false;
        draft.likeCommentDone = true;
        break;
      }
      case LIKE_COMMENT_FAILURE:
        draft.likeFeedLoading = false;
        draft.likeCommentError = action.error;
        break;
      /* 댓글 좋아요 취소 */
      case UNLIKE_COMMENT_REQUEST:
        draft.unLikeCommentLoading = true;
        draft.unLikeCommentDone = false;
        draft.unLikeCommentError = null;
        break;
      case UNLIKE_COMMENT_SUCCESS: {
        const getCommentById = draft.FeedById.comments.find((v) => v.id === action.data);
        getCommentById.isLike = false;
        getCommentById.numberOfLikes -= 1;

        draft.unLikeCommentLoading = false;
        draft.unLikeCommentDone = true;
        break;
      }
      case UNLIKE_COMMENT_FAILURE:
        draft.unLikeCommentLoading = false;
        draft.unLikeCommentError = action.error;
        break;
      /* 대댓글 좋아요 */
      case LIKE_REPLY_REQUEST:
        draft.likeReplyLoading = true;
        draft.likeReplyDone = false;
        draft.likeReplyError = null;
        break;
      case LIKE_REPLY_SUCCESS: {
        const getCommentById = draft.FeedById.comments.find((v) => v.id === action.data.commentId);
        const getReplyById = getCommentById.replies.find((v) => v.id === action.data.replyId);
        getReplyById.isLike = true;
        getReplyById.numberOfLikes += 1;

        draft.likeReplyLoading = false;
        draft.likeReplyDone = true;
        break;
      }
      case LIKE_REPLY_FAILURE:
        draft.likeReplyLoading = false;
        draft.likeReplyError = action.error;
        break;
      /* 대댓글 좋아요 취소 */
      case UNLIKE_REPLY_REQUEST:
        draft.unLikeReplyLoading = true;
        draft.unLikeReplyDone = false;
        draft.unLikeReplyError = null;
        break;
      case UNLIKE_REPLY_SUCCESS: {
        const getCommentById = draft.FeedById.comments.find((v) => v.id === action.data.commentId);
        const getReplyById = getCommentById.replies.find((v) => v.id === action.data.replyId);
        getReplyById.isLike = false;
        getReplyById.numberOfLikes -= 1;

        draft.unLikeReplyLoading = false;
        draft.unLikeReplyDone = true;
        break;
      }
      case UNLIKE_REPLY_FAILURE:
        draft.unLikeReplyLoading = false;
        draft.unLikeReplyError = action.error;
        break;
      /* 피드 글 등록 */
      case ADD_FEED_REQUEST:
        draft.addFeedLoading = true;
        draft.addFeedDone = false;
        draft.addFeedError = null;
        break;
      case ADD_FEED_SUCCESS:
        draft.Feeds.contents.unshift(action.data.contents);
        draft.tagIndex = action.data.tagIndex;
        draft.addFeedLoading = false;
        draft.addFeedDone = true;
        break;
      case ADD_FEED_FAILURE:
        draft.addFeedLoading = false;
        draft.addFeedError = action.error;
        break;
      /* 피드 댓글 등록 */
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const getFeedById = draft.Feeds.contents.find((v) => v.id === action.data.feedId);
        draft.FeedById.comments.push(action.data.comments);
        getFeedById.numberOfComments += 1;

        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      /* 피드 댓글 등록 */
      case ADD_REPLY_COMMENT_REQUEST:
        draft.addReplyCommentLoading = true;
        draft.addReplyCommentDone = false;
        draft.addReplyCommentError = null;
        break;
      case ADD_REPLY_COMMENT_SUCCESS: {
        const getCommentById = draft.FeedById.comments.find((v) => v.id === action.data.commentId);
        getCommentById.replies.push(action.data.replies);

        draft.addReplyCommentLoading = false;
        draft.addReplyCommentDone = true;
        break;
      }
      case ADD_REPLY_COMMENT_FAILURE:
        draft.addReplyCommentLoading = false;
        draft.addReplyCommentError = action.error;
        break;
      /* 댓글 삭제 */
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS: {
        draft.FeedById.comments = draft.FeedById.comments.filter((v) => v.id !== action.data.id);

        const getFeedById = draft.Feeds.contents.find((v) => v.id === action.data.feedId);
        getFeedById.numberOfComments -= 1;

        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        break;
      }
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;
      /* 대댓글 삭제 */
      case REMOVE_REPLY_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_REPLY_SUCCESS: {
        const getCommentById = draft.FeedById.comments.find((v) => v.id === action.data.commentId);
        getCommentById.replies = getCommentById.replies.filter((v) => v.id !== action.data.id);

        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;
        break;
      }
      case REMOVE_REPLY_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;
      /* 대댓글 켜기 */
      case ON_REPLY:
        draft.commentId = action.data;
        break;
      /* 대댓글 끄기 */
      case OFF_REPLY:
        draft.commentId = null;
        break;
      /* 현재 페이지 등록 */
      case CURRENT_FEED_PAGE:
        draft.pageIndex = action.data.pageIndex;
        draft.filterIndex = action.data.filterIndex;
        draft.tagIndex = action.data?.tagIndex ? action.data.tagIndex : 1;
        draft.sortIndex = action.data?.sortIndex ? action.data.sortIndex : 1;
        break;
      /* 이전 페이지 이동 */
      case PREV_FEED_PAGE:
        draft.pageIndex = action.data;
        break;
      default:
        break;
    }
  });
};

export default feed;
