import React from 'react';
import FeedContainer from '../containers/Feed/FeedContainer';
import Applayout from '../components/common/AppLayout';

const FeedPage = () => {
  return (
    <Applayout title="피드">
      <FeedContainer />
    </Applayout>
  );
};

export default FeedPage;
