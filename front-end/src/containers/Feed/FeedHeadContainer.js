import React, { useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import FeedHead from '../../components/Feed/FeedHead';
import { FILTER_TYPE_REQUEST, GO_BACK_LOGIN_PAGE, GET_FEED_TAG_REQUEST } from '../../modules/feed';

const FeedHeadContainer = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { feedAllTags, titleIndex, getFeedTagDone } = useSelector((state) => state.feed);

  const { filterTypes, feedTags, sortTypes } = feedAllTags;

  // useEffect(() => {
  //   if (userInfo.accessToken) {
  //   dispatch({
  //     type: GET_FEED_TAG_REQUEST,
  //   });
  //   } else {
  //     dispatch({
  //       type: GO_BACK_LOGIN_PAGE,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (feedAllTags) {
      dispatch({
        type: FILTER_TYPE_REQUEST,
        data: titleIndex,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedAllTags]);

  /* 필터 타입 별 페이지 피드 호출 */
  const onClickFilter = useCallback(
    (index) => () => {
      if (index !== titleIndex) {
        dispatch({
          type: FILTER_TYPE_REQUEST,
          data: index,
        });
      }
    },
    [dispatch, titleIndex],
  );

  // if (!getFeedTagDone) {
  //   return null;
  // }

  return (
    <FeedHead
      filterTypes={filterTypes}
      feedTags={feedTags}
      sortTypes={sortTypes}
      titleIndex={titleIndex}
      onClickFilter={onClickFilter}
    />
  );
};

export default FeedHeadContainer;
