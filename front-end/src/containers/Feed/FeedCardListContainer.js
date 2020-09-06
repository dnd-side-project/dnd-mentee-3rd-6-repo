import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FeedCardList from '../../components/Feed/FeedCardList';
import { LIKE_FEED_REQUEST, UNLIKE_FEED_REQUEST, GET_COMMENT_REQUEST } from '../../modules/feed';

const FeedCardListContainer = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.user.userInfo);
  const { Feeds, filterIndex, tagIndex, sortIndex, getFeedListLoading } = useSelector(
    (state) => state.feed,
  );
  const { contents, isLast } = Feeds;

  useEffect(() => {
    const onScroll = () => {
      // 화면 끝에서 데이터 불러오기
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 100
      ) {
        !getFeedListLoading && setPageNumber((prevNumber) => prevNumber + 1);

        // 피드 불러오기가 로딩하고 있을 떈 호출 안한다.
        if (!isLast && !getFeedListLoading) {
          dispatch({
            type: `feed/GET_FEED_LIST_${filterIndex}_REQUEST`,
            data: {
              filterId: filterIndex,
              tagId: filterIndex === 1 ? tagIndex : null,
              sortId: filterIndex === 2 ? sortIndex : null,
              pageNumber,
            },
          });
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [dispatch, filterIndex, getFeedListLoading, isLast, pageNumber, sortIndex, tagIndex]);

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
