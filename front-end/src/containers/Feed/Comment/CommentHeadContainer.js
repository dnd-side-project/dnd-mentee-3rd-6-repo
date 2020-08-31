import React from 'react';
import { useSelector } from 'react-redux';

import CommentHead from '../../../components/Feed/Comment/CommentHead';

const CommentHeadContainer = () => {
  const {
    Feeds: { contents },
    feedId,
  } = useSelector((state) => state.feed);

  const { content, author, timeDesc } = contents.find((v) => v.id === feedId);

  return <CommentHead content={content} author={author} timeDesc={timeDesc} />;
};

export default CommentHeadContainer;
