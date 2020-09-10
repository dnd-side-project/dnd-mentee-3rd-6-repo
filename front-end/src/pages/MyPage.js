import React, { useCallback } from 'react';
import { Button } from 'antd';

import { useDispatch } from 'react-redux';
import Applayout from '../components/common/AppLayout';

import { ACCESS_TOKEN } from '../modules/user';
import { GO_BACK_LOG_IN_PAGE } from '../modules/feed';

const MyPage = () => {
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    localStorage.setItem(ACCESS_TOKEN, '');
    dispatch({
      type: GO_BACK_LOG_IN_PAGE,
    });
  }, [dispatch]);
  return (
    <Applayout page={2} topRightIcon={<span />} botttomMenu title="마이페이지">
      <div style={{ marginTop: '150px' }}>
        <Button onClick={logout}>로그아웃</Button>
      </div>
    </Applayout>
  );
};

export default MyPage;
