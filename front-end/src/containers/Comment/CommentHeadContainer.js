import React from 'react';
import { useSelector } from 'react-redux';

import CommentHead from '../../components/Comment/CommentHead';

const CommentHeadContainer = () => {
  const {
    FeedById: { content, author, timeDesc },
  } = useSelector((state) => state.feed);

  return <CommentHead content={content} author={author} timeDesc={timeDesc} />;
};

export default CommentHeadContainer;
