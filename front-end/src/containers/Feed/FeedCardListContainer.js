import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FeedCardList from '../../components/Feed/FeedCardList';
import {
  COMMENT_PAGE,
  FILTER_TYPE_1_REQUEST,
  FILTER_TYPE_2_REQUEST,
  FILTER_TYPE_3_REQUEST,
} from '../../modules/feed';

const FeedCardListContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();

  const { Feeds, isLast, titleIndex, tagIndex, hotIndex, filterTypeLoading } = useSelector(
    (state) => state.feed,
  );
  const { contents } = Feeds;

  useEffect(() => {
    const onScroll = () => {
      // 많이 쓰는 스크롤 위치 파악하는 함수
      // console.log(
      //   // eslint-disable-next-line max-len
      //   `얼마나 내렸는지(화면 위에 기준) :${window.scrollY} | 화면에 보이는 길이 :${document.documentElement.clientHeight} | 총 길이 :${document.documentElement.scrollHeight}`,
      // );

      // 화면 끝에서 데이터 불러오기
      if (
        window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        // 피드 불러오기가 로딩하고 있을 떈 디스패치 안한다.
        if (!isLast && !filterTypeLoading) {
          // titleIndex === 1 &&
          //   dispatch({
          //     type: FILTER_TYPE_1_REQUEST,
          //     data: {
          //       filterTypeId: titleIndex,
          //       feedTagId: tagIndex,
          //     },
          //   });
          // titleIndex === 2 &&
          //   dispatch({
          //     type: FILTER_TYPE_2_REQUEST,
          //     data: {
          //       filterTypeId: titleIndex,
          //       sortTypes: hotIndex,
          //     },
          //   });
          // titleIndex === 3 &&
          //   dispatch({
          //     type: FILTER_TYPE_3_REQUEST,
          //     data: {
          //       filterTypeId: titleIndex,
          //     },
          //   });
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, filterTypeLoading, hotIndex, isLast, tagIndex, titleIndex]);

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
    <FeedCardList
      contents={contents}
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
      onClickLike={onClickLike}
      onClickUnlike={onClickUnlike}
      onClickComment={onClickComment}
    />
  );
};

export default FeedCardListContainer;
