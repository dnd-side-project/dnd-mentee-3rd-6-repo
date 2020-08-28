import React from 'react';
import { useSelector } from 'react-redux';

import Applayout from '../components/common/AppLayout';
import FeedContainer from '../containers/Feed/FeedContainer';
import CommentContainer from '../containers/Feed/CommentContainer';

const FeedPage = () => {
  const { pageIndex } = useSelector((state) => state.feed);

  const titles = ['피드', '피드', '피드', '댓글', '새 게시물 작성'];

  const stepContents = [FeedContainer, FeedContainer, FeedContainer, CommentContainer];

  const currentStepContent = () => {
    const ComponentName = stepContents[pageIndex - 1];
    return <ComponentName />;
  };

  return <Applayout title={titles[pageIndex - 1]}>{currentStepContent()}</Applayout>;
};

export default FeedPage;
