import React from 'react';
import { useSelector } from 'react-redux';

import CommentHead from '../../components/Comment/CommentHead';

const CommentHeadContainer = () => {
  const {
    FeedById: { content, author, timeDesc },
    getCommentLoading,
  } = useSelector((state) => state.feed);

  if (getCommentLoading) {
    return <h1>로딩 중</h1>;
  }

  return <CommentHead content={content} author={author} timeDesc={timeDesc} />;
};

export default CommentHeadContainer;
