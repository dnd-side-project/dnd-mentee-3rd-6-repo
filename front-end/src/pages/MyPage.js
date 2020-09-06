import React from 'react';

import Applayout from '../components/common/AppLayout';

const MyPage = () => {
  return (
    <Applayout page={2} topRightIcon={<span />} botttomMenu title="마이페이지">
      <h1>여기는 마이페이지 입니다.</h1>
    </Applayout>
  );
};

export default MyPage;
