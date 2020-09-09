import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FeedCardList from '../../components/Feed/FeedCardList';
import {
  LIKE_FEED_REQUEST,
  UNLIKE_FEED_REQUEST,
  GET_COMMENT_REQUEST,
  getFeedListCreateAction,
} from '../../modules/feed';
import { ACCESS_TOKEN, LOAD_USER_INFO_REQUEST } from '../../modules/user';

const FeedCardListContainer = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const {
    Feeds: { contents, isLast },
    filterIndex,
    tagIndex,
    sortIndex,
    getFeedListLoading,
  } = useSelector((state) => state.feed);

  const { userInfo } = useSelector((state) => state.user);

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
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        // 피드 불러오기가 로딩하고 있을 떈 호출 안한다.
        if (!isLast && !getFeedListLoading) {
          dispatch(
            getFeedListCreateAction(accessToken, filterIndex, tagIndex, sortIndex, pageNumber),
          );

          setPageNumber((prevNumber) => prevNumber + 1);
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
    return <h1>로딩 중</h1>;
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
