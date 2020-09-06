import React from 'react';
import { useSelector } from 'react-redux';

import Applayout from '../components/common/AppLayout';
import WriteContainer from '../containers/Write/WriteContainer';
import WriteCatTagContainer from '../containers/Write/WriteCatTagContainer';

const WritePage = () => {
  const { pageIndex } = useSelector((state) => state.write);

  const titles = ['새 게시물 작성', '새 게시물 작성'];

  const stepContents = [WriteContainer, WriteCatTagContainer];

  const currentStepContent = () => {
    const ComponentName = stepContents[pageIndex - 1];
    return <ComponentName />;
  };

  return (
    <Applayout pageCheck page={3} topRightIcon={<span />} title={titles[pageIndex - 1]}>
      {currentStepContent()}
    </Applayout>
  );
};

export default WritePage;
