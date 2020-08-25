import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './pages';
import FeedPage from './pages/FeedPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import NotificationPage from './pages/NotificationPage';
import PostsPage from './pages/PostsPage';
import ChatPage from './pages/ChatPage';

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
      <StatusBar>상태 바(아아폰x 기준)</StatusBar>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/feed" component={FeedPage} />
      <Route path="/qna" component={PostsPage} />
      <Route path="/notification" component={NotificationPage} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/chat" component={ChatPage} />
    </>
  );
}

export default App;
