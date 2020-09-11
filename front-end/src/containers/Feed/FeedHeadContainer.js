import React, { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import FeedHead from '../../components/Feed/FeedHead';
import { GO_BACK_LOG_IN_PAGE, GET_FEED_TAG_REQUEST, CURRENT_FEED_PAGE } from '../../modules/feed';
import { ACCESS_TOKEN } from '../../modules/user';

const FeedHeadContainer = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const {
    feedTags,
    filterTypes,
    sortTypes,
    filterIndex,
    tagIndex,
    sortIndex,
    getFeedTagDone,
  } = useSelector((state) => state.feed);
  const { loadUserInfoError } = useSelector((state) => state.user);

  const [checkFilterType, setCheckFilterType] = useState(filterIndex || 1);
  const [checkFeedTag, setCheckFeedTag] = useState(tagIndex || 1);
  const [checkSortType, setCheckSortType] = useState(sortIndex || 1);

  /* 유저 정보 있는지 확인 하기 */
  useEffect(() => {
    if (accessToken && !loadUserInfoError) {
      !feedTags &&
        dispatch({
          type: GET_FEED_TAG_REQUEST,
        });
    } else {
      localStorage.setItem(ACCESS_TOKEN, '');
      dispatch({
        type: GO_BACK_LOG_IN_PAGE,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 필터 타입 별 피드 리스트 호출 */
  const onClickFilter = useCallback(
    (index) => () => {
      if (index !== checkFilterType) {
        dispatch({
          type: CURRENT_FEED_PAGE,
          data: {
            pageIndex: index,
            filterIndex: index,
            tagIndex,
            sortIndex,
          },
        });
        setCheckFilterType(index);
      }
    },
    [checkFilterType, dispatch, sortIndex, tagIndex],
  );

  /* 피드 태그 별 피드 리스트 호출 */
  const onClickFeedTag = useCallback(
    (index) => () => {
      if (checkFilterType === 1) {
        index !== checkFeedTag &&
          dispatch({
            type: CURRENT_FEED_PAGE,
            data: {
              pageIndex: checkFilterType,
              filterIndex: checkFilterType,
              tagIndex: index,
              sortIndex,
            },
          });
        setCheckFeedTag(index);
      } else {
        index !== checkSortType &&
          dispatch({
            type: CURRENT_FEED_PAGE,
            data: {
              pageIndex: checkFilterType,
              filterIndex: checkFilterType,
              tagIndex,
              sortIndex: index,
            },
          });
        setCheckSortType(index);
      }
    },
    [checkFeedTag, checkFilterType, checkSortType, dispatch, sortIndex, tagIndex],
  );

  if (!getFeedTagDone) {
    return null;
  }

  return (
    <FeedHead
      filterTypes={filterTypes}
      feedTags={feedTags}
      sortTypes={sortTypes}
      checkFilterType={checkFilterType}
      checkFeedTag={checkFeedTag}
      checkSortType={checkSortType}
      onClickFilter={onClickFilter}
      onClickFeedTag={onClickFeedTag}
    />
  );
};

export default FeedHeadContainer;
