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
  const {
    Feeds,
    isLast,
    hometownPageLoading,
    allPageLoading,
    myFriendLoading,
    pageIndex,
    titleIndex,
  } = useSelector((state) => state.feed);
  const { contents } = Feeds;

  const pageLoading = [hometownPageLoading, allPageLoading, myFriendLoading];

  useEffect(() => {
    if (userInfo.accessToken) {
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
    } else {
      dispatch({
        type: GO_BACK_LOGIN_PAGE,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onScroll = () => {
      // 많이 쓰는 스크롤 위치 파악하는 함수
      console.log(
        // eslint-disable-next-line max-len
        `얼마나 내렸는지(화면 위에 기준) :${window.scrollY} | 화면에 보이는 길이 :${document.documentElement.clientHeight} | 총 길이 :${document.documentElement.scrollHeight}`,
      );

      // 화면 끝에서 데이터 불러오기
      if (
        window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        // 피드 불러오기가 로딩하고 있을 떈 디스패치 안한다.
        if (!isLast && !pageLoading[pageIndex - 1]) {
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
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, isLast, pageIndex, pageLoading]);

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

  const onClickLike = useCallback(
    (id) => () => {
      console.log('피드 좋아요', id);
      // dispatch({
      //   type: LIKE_FEED_REQUEST,
      // });
    },
    [],
  );

  const onClickUnlike = useCallback(
    (id) => () => {
      console.log('피드 좋아요 취소', id);

      // dispatch({
      //   type: UNLIKE_FEED_REQUEST,
      // });
    },
    [],
  );

  const onClickComment = useCallback(
    (id) => () => {
      dispatch({
        type: COMMENT_PAGE,
        data: id,
      });
    },
    [dispatch],
  );

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
