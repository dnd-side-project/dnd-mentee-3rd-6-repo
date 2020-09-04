import React, { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import FeedHead from '../../components/Feed/FeedHead';
import {
  GO_BACK_LOGIN_PAGE,
  GET_FEED_TAG_REQUEST,
  GET_FEED_LIST_1_REQUEST,
  GET_FEED_LIST_2_REQUEST,
  GET_FEED_LIST_3_REQUEST,
} from '../../modules/feed';

const FeedHeadContainer = () => {
  const [checkFilterType, setCheckFilterType] = useState(1);
  const [checkFeedTag, setCheckFeedTag] = useState(1);
  const [checkSortType, setCheckSortType] = useState(1);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { feedTags, filterTypes, sortTypes, getFeedTagDone } = useSelector((state) => state.feed);

  const filterTypeList = ['HOMETOWN', 'ALL', 'FRIEND'];
  const sortList = ['POPULAR', 'LATEST'];

  /* 유저 정보 있는지 확인 하기 */
  useEffect(() => {
    if (userInfo.accessToken) {
      dispatch({
        type: GET_FEED_TAG_REQUEST,
      });
    } else {
      dispatch({
        type: GO_BACK_LOGIN_PAGE,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* 피드 태그 가져오고 피드(우리 동네) 리스트 호출 */
  useEffect(() => {
    feedTags &&
      dispatch({
        type: GET_FEED_LIST_1_REQUEST,
        data: {
          filterId: filterTypeList[checkFilterType - 1],
          tagId: checkFeedTag,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedTags]);

  /* 필터 타입 별 피드 리스트 호출 */
  const onClickFilter = useCallback(
    (index) => () => {
      if (index !== checkFilterType) {
        index === 1 &&
          dispatch({
            type: GET_FEED_LIST_1_REQUEST,
            data: {
              filterId: filterTypeList[checkFilterType - 1],
              tagId: checkFeedTag,
            },
          });
        index === 2 &&
          dispatch({
            type: GET_FEED_LIST_2_REQUEST,
            data: {
              filterId: filterTypeList[checkFilterType - 1],
              sortId: sortList[checkSortType - 1],
            },
          });
        index === 3 &&
          dispatch({
            type: GET_FEED_LIST_3_REQUEST,
            data: {
              filterId: filterTypeList[checkFilterType - 1],
            },
          });
        setCheckFilterType(index);
      }
    },
    [checkFeedTag, checkFilterType, checkSortType, dispatch, filterTypeList, sortList],
  );

  /* 피드 태그 별 피드 리스트 호출 */
  const onClickFeedTag = useCallback(
    (index) => () => {
      if (checkFilterType === 1) {
        index !== checkFeedTag &&
          dispatch({
            type: GET_FEED_LIST_1_REQUEST,
            data: {
              filterId: filterTypeList[checkFilterType - 1],
              tagId: checkFeedTag,
            },
          });
        setCheckFeedTag(index);
      } else {
        index !== checkSortType &&
          dispatch({
            type: GET_FEED_LIST_2_REQUEST,
            data: {
              filterId: filterTypeList[checkFilterType - 1],
              sortId: sortList[checkSortType - 1],
            },
          });
        setCheckSortType(index);
      }
    },
    [checkFeedTag, checkFilterType, checkSortType, dispatch, filterTypeList, sortList],
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
