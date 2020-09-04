import React from 'react';

import Applayout from '../components/common/AppLayout';

const NotificationPage = () => {
  return (
    <Applayout page={2} topRightIcon={<span />} botttomMenu title="알림">
      <h1>여기는 알림 입니다.</h1>
    </Applayout>
  );
};

export default NotificationPage;
