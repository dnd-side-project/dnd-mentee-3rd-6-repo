import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './pages';
import FeedPage from './pages/FeedPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const StatusBar = styled.div`
  position: fixed;
  width: 100vw;
  height: 44px;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: #f1f3f5;

  text-align: center;
`;

function App() {
  return (
    <>
      <StatusBar>상태 바</StatusBar>
      <Route path="/" component={Home} exact />
      <Route path="/feed" component={FeedPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </>
  );
}

export default App;
