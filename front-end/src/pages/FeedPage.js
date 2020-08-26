import React from 'react';
import AppLayoutContainer from '../containers/common/AppLayoutContainer';
import FeedContainer from '../containers/Feed/FeedContainer';

const FeedPage = () => {
  return (
    <AppLayoutContainer title="피드">
      <FeedContainer />
    </AppLayoutContainer>
  );
};

export default FeedPage;
