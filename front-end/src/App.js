import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages';
import FeedPage from './pages/FeedPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import NotificationPage from './pages/NotificationPage';
import QnAPage from './pages/QnAPage';
import ChatPage from './pages/ChatPage';
import WritePage from './pages/WritePage';

function App() {
  return (
    <>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/feed" exact component={FeedPage} />
      <Route path="/feed/write" component={WritePage} />
      <Route path="/qna" component={QnAPage} />
      <Route path="/notification" component={NotificationPage} />
      <Route path="/mypage" component={MyPage} />
      <Route path="/chat" component={ChatPage} />
    </>
  );
}

export default App;
