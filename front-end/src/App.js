import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './pages';
import FeedPage from './pages/FeedPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import NotificationPage from './pages/NotificationPage';
import QnAPage from './pages/QnAPage';
import ChatPage from './pages/ChatPage';
// import WritePage from './pages/WritePage';

const StatusBar = styled.div`
  width: 100vw;
  height: 44px;
  background: #f1f3f5;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateX(-16px);
`;

function App() {
  return (
    <>
      {process.env.NODE_ENV === 'development' && <StatusBar>상태 바(아아폰x 기준)</StatusBar>}
      <Route path="/" component={Home} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/feed" exact component={FeedPage} />
      {/* <Route path="/feed/write" component={WritePage} /> */}
      <Route path="/qna" component={QnAPage} />
      <Route path="/notification" component={NotificationPage} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/chat" component={ChatPage} />
    </>
  );
}

export default App;
