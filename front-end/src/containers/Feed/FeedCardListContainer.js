import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

import FeedCardList from '../../components/Feed/FeedCardList';
import {
  LIKE_FEED_REQUEST,
  UNLIKE_FEED_REQUEST,
  GET_COMMENT_REQUEST,
  getFeedListCreateAction,
} from '../../modules/feed';
import { ACCESS_TOKEN, LOAD_USER_INFO_REQUEST } from '../../modules/user';
import { LoadingFeed } from '../../components/Feed/styles';

const FeedCardListContainer = () => {
  const dispatch = useDispatch();

  const {
    Feeds: { contents, isLast },
    feedId,
    filterIndex,
    tagIndex,
    sortIndex,
    getFeedListLoading,
    getCommentLoading,
    getLoading,
    scrollLocation,
  } = useSelector((state) => state.feed);

  const [scroll, setScroll] = useState(scrollLocation || 0);
  const [page, setPage] = useState(0);
  const [scrollValid, setScrollValid] = useState(false);

  const { userInfo } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    if (accessToken && !userInfo.id) {
      dispatch({
        type: LOAD_USER_INFO_REQUEST,
        data: accessToken,
      });
    }
  }, [accessToken, dispatch, userInfo]);

  useEffect(() => {
    const section = document.querySelector('.scroll');

    if (filterIndex !== 4 && contents) {
      section.scrollTo(0, scrollLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterIndex]);

  useEffect(() => {
    if (filterIndex || tagIndex || sortIndex) {
      setPage(() => 0);

      !feedId &&
        dispatch(getFeedListCreateAction(accessToken, filterIndex, tagIndex, sortIndex, 0, scroll));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterIndex, sortIndex, tagIndex]);

  useEffect(() => {
    if (scrollValid) {
      setScrollValid((prev) => !prev);

      if (!isLast && !getFeedListLoading) {
        dispatch(
          getFeedListCreateAction(accessToken, filterIndex, tagIndex, sortIndex, page, scroll),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onScrollFeed = useCallback((e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    setScroll(() => scrollTop);

    if (scrollHeight - scrollTop < clientHeight + 200) {
      setScrollValid((prev) => !prev);
      setPage((prev) => prev + 1);
    }
  }, []);

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
          scrollLocation: scroll,
        },
      });
    },
    [accessToken, dispatch, scroll],
  );

  // const onClickShowText = useCallback(() => {}, []);

  if (getCommentLoading) {
    return (
      <LoadingFeed>
        <LoadingOutlined />
      </LoadingFeed>
    );
  }

  if (getFeedListLoading) {
    return (
      <LoadingFeed>
        <LoadingOutlined />
      </LoadingFeed>
    );
  }

  return (
    <>
      <FeedCardList
        contents={contents}
        onClickLike={onClickLike}
        onClickUnlike={onClickUnlike}
        onClickComment={onClickComment}
        getLoading={getLoading}
        isLast={isLast}
        onScrollFeed={onScrollFeed}
      />
    </>
  );
};

export default FeedCardListContainer;
