import React from 'react';
import { useSelector } from 'react-redux';

import Applayout from '../components/common/AppLayout';
import FeedContainer from '../containers/Feed/FeedContainer';
import CommentContainer from '../containers/Feed/CommentContainer';
import MessageIcon from '../lib/style/menuIcon/MessageIcon';
import NullIcon from '../lib/style/NullIcon';

const FeedPage = () => {
  const { pageIndex } = useSelector((state) => state.feed);

  const titles = ['피드', '피드', '피드', '댓글'];
  const botttomMenu = [true, true, true, false];
  const pageCheck = [false, false, false, true];
  const topRightComponents = [MessageIcon, MessageIcon, MessageIcon, NullIcon];
  const stepContents = [FeedContainer, FeedContainer, FeedContainer, CommentContainer];

  const currentStepIcon = () => {
    const IconName = topRightComponents[pageIndex - 1];
    return <IconName />;
  };

  const currentStepContent = () => {
    const ComponentName = stepContents[pageIndex - 1];
    return <ComponentName />;
  };

  return (
    <Applayout
      pageCheck={pageCheck[pageIndex - 1]}
      page={2}
      topRightIcon={currentStepIcon()}
      botttomMenu={botttomMenu[pageIndex - 1]}
      title={titles[pageIndex - 1]}
    >
      {currentStepContent()}
    </Applayout>
  );
};

export default FeedPage;
