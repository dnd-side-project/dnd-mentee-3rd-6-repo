import React from 'react';
import { useSelector } from 'react-redux';

import MessageIcon from '../lib/style/menuIcon/MessageIcon';
import NullIcon from '../lib/style/NullIcon';
import AppLayout from '../components/common/AppLayout';
import FeedHeadContainer from '../containers/Feed/FeedHeadContainer';
import FeedCardListContainer from '../containers/Feed/FeedCardListContainer';
import CommentHeadContainer from '../containers/Comment/CommentHeadContainer';
import CommentListContainer from '../containers/Comment/CommentListContainer';
import CommentFormContainer from '../containers/Comment/CommentFormContainer';
import { FeedWrapper, CommentWrapper } from '../components/Feed/styles';

const FeedPage = () => {
  const { pageIndex } = useSelector((state) => state.feed);

  const titles = ['피드', '피드', '피드', '댓글'];
  const botttomMenu = [true, true, true, false];
  const pageCheck = [false, false, false, true];
  const topRightComponents = [MessageIcon, MessageIcon, MessageIcon, NullIcon];

  const currentStepIcon = () => {
    const IconName = topRightComponents[pageIndex - 1];
    return <IconName />;
  };

  return (
    <AppLayout
      pageCheck={pageCheck[pageIndex - 1]}
      page={2}
      topRightIcon={currentStepIcon()}
      botttomMenu={botttomMenu[pageIndex - 1]}
      title={titles[pageIndex - 1]}
    >
      {pageIndex === 4 ? (
        <>
          <CommentWrapper>
            <CommentHeadContainer />
            <CommentListContainer />
          </CommentWrapper>
          <CommentFormContainer />
        </>
      ) : (
        <FeedWrapper page={pageIndex}>
          <FeedHeadContainer />
          <FeedCardListContainer />
        </FeedWrapper>
      )}
    </AppLayout>
  );
};

export default FeedPage;
