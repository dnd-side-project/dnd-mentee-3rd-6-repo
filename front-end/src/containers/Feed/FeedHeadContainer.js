import React, { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import FeedHead from '../../components/Feed/FeedHead';
import {
  GO_BACK_LOG_IN_PAGE,
  GET_FEED_TAG_REQUEST,
  GET_FEED_LIST_1_REQUEST,
  GET_FEED_LIST_2_REQUEST,
  GET_FEED_LIST_3_REQUEST,
} from '../../modules/feed';

const FeedHeadContainer = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user.userInfo);
  const {
    Feeds,
    feedTags,
    filterTypes,
    sortTypes,
    filterIndex,
    tagIndex,
    sortIndex,
    getFeedTagDone,
  } = useSelector((state) => state.feed);

  const [checkFilterType, setCheckFilterType] = useState(filterIndex || 1);
  const [checkFeedTag, setCheckFeedTag] = useState(tagIndex || 1);
  const [checkSortType, setCheckSortType] = useState(sortIndex || 1);

  /* 유저 정보 있는지 확인 하기 */
  useEffect(() => {
    if (accessToken) {
      !feedTags &&
        dispatch({
          type: GET_FEED_TAG_REQUEST,
        });
    } else {
      dispatch({
        type: GO_BACK_LOG_IN_PAGE,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 피드 태그 가져오고 피드(우리 동네) 리스트 호출 */
  useEffect(() => {
    feedTags &&
      !Feeds.contents &&
      dispatch({
        type: GET_FEED_LIST_1_REQUEST,
        data: {
          filterId: checkFilterType,
          tagId: checkFeedTag,
          accessToken,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedTags]);

  /* 필터 타입 별 피드 리스트 호출 */
  const onClickFilter = useCallback(
    (index) => () => {
      if (index !== checkFilterType) {
        setCheckFilterType(index);
        index === 1 &&
          dispatch({
            type: GET_FEED_LIST_1_REQUEST,
            data: {
              filterId: index,
              tagId: checkFeedTag,
              accessToken,
            },
          });
        index === 2 &&
          dispatch({
            type: GET_FEED_LIST_2_REQUEST,
            data: {
              filterId: index,
              sortId: checkSortType,
              accessToken,
            },
          });
        index === 3 &&
          dispatch({
            type: GET_FEED_LIST_3_REQUEST,
            data: {
              filterId: index,
              accessToken,
            },
          });
      }
    },
    [accessToken, checkFeedTag, checkFilterType, checkSortType, dispatch],
  );

  /* 피드 태그 별 피드 리스트 호출 */
  const onClickFeedTag = useCallback(
    (index) => () => {
      if (checkFilterType === 1) {
        setCheckFeedTag(index);
        index !== checkFeedTag &&
          dispatch({
            type: GET_FEED_LIST_1_REQUEST,
            data: {
              filterId: checkFilterType,
              tagId: index,
              accessToken,
            },
          });
      } else {
        setCheckSortType(index);
        index !== checkSortType &&
          dispatch({
            type: GET_FEED_LIST_2_REQUEST,
            data: {
              filterId: checkFilterType,
              sortId: index,
              accessToken,
            },
          });
      }
    },
    [accessToken, checkFeedTag, checkFilterType, checkSortType, dispatch],
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
