import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FeedCardList from '../../components/Feed/FeedCardList';
import {
  COMMENT_PAGE,
  GET_FEED_LIST_1_REQUEST,
  GET_FEED_LIST_2_REQUEST,
  GET_FEED_LIST_3_REQUEST,
} from '../../modules/feed';

const FeedCardListContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();

  const { Feeds, isLast, filterIndex, tagIndex, sortIndex, getFeedListLoading } = useSelector(
    (state) => state.feed,
  );
  const { contents } = Feeds;

  useEffect(() => {
    const onScroll = () => {
      console.log(
        `얼마나 내렸는지(화면 위에 기준) :${window.scrollY} | 화면에 보이는 길이 :${document.documentElement.clientHeight} | 총 길이 :${document.documentElement.scrollHeight}`,
      );

      // 화면 끝에서 데이터 불러오기
      if (
        window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        // 피드 불러오기가 로딩하고 있을 떈 호출 안한다.
        if (!isLast && !getFeedListLoading) {
          filterIndex === 1 &&
            dispatch({
              type: GET_FEED_LIST_1_REQUEST,
              data: {
                filterId: 'HOMETOWN',
                tagId: tagIndex,
              },
            });
          filterIndex === 2 &&
            dispatch({
              type: GET_FEED_LIST_2_REQUEST,
              data: {
                filterId: 'ALL',
                sortId: sortIndex,
              },
            });
          filterIndex === 3 &&
            dispatch({
              type: GET_FEED_LIST_3_REQUEST,
              data: {
                filterId: 'FRIEND',
              },
            });
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, filterIndex, getFeedListLoading, isLast, sortIndex, tagIndex]);

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
