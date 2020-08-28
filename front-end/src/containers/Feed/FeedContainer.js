import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Feed from '../../components/Feed';
import {
  HOMETOWN_PAGE_REQUEST,
  GO_BACK_LOGIN_PAGE,
  LIKE_FEED_REQUEST,
  UNLIKE_FEED_REQUEST,
  COMMENT_PAGE,
  ALL_PAGE_REQUEST,
  MY_FRIEND_PAGE_REQUEST,
} from '../../modules/feed';

const FeedContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { Feeds, pageIndex, titleIndex } = useSelector((state) => state.feed);
  const { contents } = Feeds;

  useEffect(() => {
    // if (userInfo.accessToken) {
    pageIndex === 1
      ? dispatch({
          type: HOMETOWN_PAGE_REQUEST,
        })
      : pageIndex === 2
      ? dispatch({
          type: ALL_PAGE_REQUEST,
        })
      : dispatch({
          type: MY_FRIEND_PAGE_REQUEST,
        });
    // } else {
    //   dispatch({
    //     type: GO_BACK_LOGIN_PAGE,
    //   });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 우리동네 페이지 피드 호출 */
  const onClickHometown = useCallback(
    (e) => {
      if (e.target.value !== titleIndex) {
        dispatch({
          type: HOMETOWN_PAGE_REQUEST,
        });
      }
    },
    [dispatch, titleIndex],
  );

  /* 전체 페이지 피드 호출 */
  const onClickAll = useCallback(
    (e) => {
      if (e.target.value !== titleIndex) {
        dispatch({
          type: ALL_PAGE_REQUEST,
        });
      }
    },
    [dispatch, titleIndex],
  );

  /* 내 친구 페이지 피드 호출 */
  const onClickMyFriend = useCallback(
    (e) => {
      if (e.target.value !== titleIndex) {
        dispatch({
          type: MY_FRIEND_PAGE_REQUEST,
        });
      }
    },
    [dispatch, titleIndex],
  );

  const onClickLike = useCallback(() => {
    dispatch({
      type: LIKE_FEED_REQUEST,
    });
  }, [dispatch]);

  const onClickUnlike = useCallback(() => {
    dispatch({
      type: UNLIKE_FEED_REQUEST,
    });
  }, [dispatch]);

  const onClickComment = useCallback(() => {
    dispatch({
      type: COMMENT_PAGE,
    });
  }, [dispatch]);

  // const onClickShowText = useCallback(() => {}, []);

  return (
    <Feed
      contents={contents}
      titleIndex={titleIndex}
      onClickHometown={onClickHometown}
      onClickAll={onClickAll}
      onClickMyFriend={onClickMyFriend}
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
      onClickLike={onClickLike}
      onClickUnlike={onClickUnlike}
      onClickComment={onClickComment}
    />
  );
};

export default FeedContainer;
