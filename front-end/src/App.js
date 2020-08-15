import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './pages';
import Pheed from './pages/PheedPage';
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
  background: #cc5de8;
`;

function App() {
  return (
    <>
      <StatusBar>상태 바</StatusBar>
      <Route path="/" component={Home} exact />
      <Route path="/pheed" component={Pheed} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </>
  );
}

export default App;
