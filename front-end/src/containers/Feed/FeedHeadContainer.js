import React, { useEffect, useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import FeedHead from '../../components/Feed/FeedHead';
import {
  FILTER_TYPE_1_REQUEST,
  FILTER_TYPE_2_REQUEST,
  FILTER_TYPE_3_REQUEST,
  GO_BACK_LOGIN_PAGE,
  GET_FEED_TAG_REQUEST,
} from '../../modules/feed';

const FeedHeadContainer = () => {
  const [checkFilterTypes, setCheckFilterTypes] = useState(1);
  const [checkFeedTags, setCheckFeedTags] = useState(1);
  const [checkSortTypes, setCheckSortTypes] = useState(1);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { feedAllTags, getFeedTagDone } = useSelector((state) => state.feed);

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
        type: FILTER_TYPE_1_REQUEST,
        data: {
          filterTypeId: checkFilterTypes,
          feedTagId: checkFeedTags,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedAllTags]);

  /* 필터 타입 별 페이지 피드 호출 */
  const onClickFilter = useCallback(
    (index) => () => {
      if (index !== checkFilterTypes) {
        index === 1 &&
          dispatch({
            type: FILTER_TYPE_1_REQUEST,
            data: {
              filterTypeId: checkFilterTypes,
              feedTagId: checkFeedTags,
            },
          });
        index === 2 &&
          dispatch({
            type: FILTER_TYPE_2_REQUEST,
            data: {
              filterTypeId: checkFilterTypes,
              sortTypes: checkSortTypes,
            },
          });
        index === 3 &&
          dispatch({
            type: FILTER_TYPE_3_REQUEST,
            data: {
              filterTypeId: checkFilterTypes,
            },
          });
        setCheckFilterTypes(() => index);
      }
    },
    [checkFeedTags, checkFilterTypes, checkSortTypes, dispatch],
  );

  /* 피드 태그 호출 */
  const onClickFeedTag = useCallback(
    (index) => () => {
      if (checkFilterTypes === 1) {
        setCheckFeedTags(index);
        index !== checkFeedTags &&
          dispatch({
            type: FILTER_TYPE_1_REQUEST,
            data: {
              filterTypeId: checkFilterTypes,
              feedTagId: checkFeedTags,
            },
          });
      } else {
        setCheckSortTypes(index);
        index !== checkSortTypes &&
          dispatch({
            type: FILTER_TYPE_2_REQUEST,
            data: {
              filterTypeId: checkFilterTypes,
              sortTypes: checkSortTypes,
            },
          });
      }
    },
    [checkFeedTags, checkFilterTypes, checkSortTypes, dispatch],
  );

  // if (!getFeedTagDone) {
  //   return null;
  // }

  return (
    <FeedHead
      filterTypes={filterTypes}
      feedTags={feedTags}
      sortTypes={sortTypes}
      checkFilterTypes={checkFilterTypes}
      onClickFilter={onClickFilter}
      onClickFeedTag={onClickFeedTag}
      checkFeedTags={checkFeedTags}
      checkSortTypes={checkSortTypes}
    />
  );
};

export default FeedHeadContainer;
