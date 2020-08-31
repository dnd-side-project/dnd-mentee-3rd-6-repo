import React from 'react';

import Applayout from '../components/common/AppLayout';
import WriteContainer from '../containers/Write/WriteContainer';

const WritePage = () => {
  return (
    <Applayout pageCheck page={3} topRightIcon={<span />} title="새 게시물 작성">
      <WriteContainer />
    </Applayout>
  );
};

export default WritePage;
