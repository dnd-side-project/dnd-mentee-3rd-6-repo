import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WriteCatTag from '../../components/Write/WriteCatTag';
import { ADD_FEED_REQUEST } from '../../modules/feed';

const WriteCatTagContainer = () => {
  const [check, setCheck] = useState([]);

  const dispatch = useDispatch();
  const { cats, accessToken } = useSelector((state) => state.user.userInfo);
  const { content, imgFiles, tagId } = useSelector((state) => state.write);
  const { addFeedLoading } = useSelector((state) => state.feed);

  const onClickCheck = useCallback(
    (index) => () => {
      setCheck(check.concat(index));

      if (check.find((v) => v === index)) {
        setCheck(check.filter((v) => v !== index));
      }
    },
    [check],
  );

  const onFinishAddFeed = useCallback(async () => {
    const formData = new FormData();

    await formData.append('content', content);
    await formData.append('tagId', tagId);

    await imgFiles.forEach((imgFile) => {
      formData.append('imgFiles', imgFile.f);
    });

    await check.forEach((catId) => {
      formData.append('catIds', catId);
    });

    return dispatch({
      type: ADD_FEED_REQUEST,
      data: {
        formData,
        accessToken,
        tagId,
      },
    });
  }, [accessToken, check, content, dispatch, imgFiles, tagId]);

  return (
    <WriteCatTag
      cats={cats}
      check={check}
      onClickCheck={onClickCheck}
      onFinishAddFeed={onFinishAddFeed}
      addFeedLoading={addFeedLoading}
    />
  );
};

export default WriteCatTagContainer;
