import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FeedCardList from '../../components/Feed/FeedCardList';
import {
  LIKE_FEED_REQUEST,
  UNLIKE_FEED_REQUEST,
  GET_COMMENT_REQUEST,
  getFeedListCreateAction,
} from '../../modules/feed';
import { ACCESS_TOKEN, LOAD_USER_INFO_REQUEST } from '../../modules/user';
import { LastFeed } from '../../components/Feed/styles';

const FeedCardListContainer = () => {
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const {
    Feeds: { contents, isLast },
    filterIndex,
    tagIndex,
    sortIndex,
    pageNumber,
    getFeedListLoading,
    scrollLocation,
  } = useSelector((state) => state.feed);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (pageNumber !== 4) {
      window.scrollTo(0, scrollLocation);
    }
  }, [getFeedListLoading, pageNumber, scrollLocation]);

  useEffect(() => {
    if (accessToken && !userInfo.id) {
      dispatch({
        type: LOAD_USER_INFO_REQUEST,
        data: accessToken,
      });
    }
  }, [accessToken, dispatch, userInfo]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        // 피드 불러오기가 로딩하고 있을 떈 호출 안한다.
        if (!isLast && !getFeedListLoading) {
          const scroll = window.scrollY;
          dispatch(
            getFeedListCreateAction(
              accessToken,
              filterIndex,
              tagIndex,
              sortIndex,
              pageNumber,
              scroll,
            ),
          );
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [
    accessToken,
    dispatch,
    filterIndex,
    getFeedListLoading,
    isLast,
    pageNumber,
    sortIndex,
    tagIndex,
  ]);

  const onClickLike = useCallback(
    (id) => () => {
      dispatch({
        type: LIKE_FEED_REQUEST,
        data: {
          feedId: id,
          accessToken,
        },
      });
    },
    [accessToken, dispatch],
  );

  const onClickUnlike = useCallback(
    (id) => () => {
      dispatch({
        type: UNLIKE_FEED_REQUEST,
        data: {
          feedId: id,
          accessToken,
        },
      });
    },
    [accessToken, dispatch],
  );

  const onClickComment = useCallback(
    (id) => () => {
      dispatch({
        type: GET_COMMENT_REQUEST,
        data: {
          feedId: id,
          accessToken,
          scrollLocation: window.scrollY,
        },
      });
    },
    [accessToken, dispatch],
  );

  // const onClickShowText = useCallback(() => {}, []);

  if (!contents) {
    return null;
  }

  if (getFeedListLoading) {
    return <LastFeed>로딩 중</LastFeed>;
  }

  return (
    <FeedCardList
      contents={contents}
      onClickLike={onClickLike}
      onClickUnlike={onClickUnlike}
      onClickComment={onClickComment}
      isLast={isLast}
    />
  );
};

export default FeedCardListContainer;
