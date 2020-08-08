import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages';
import Pheed from './pages/PheedPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <Route path="/" component={Home} exact />
      <Route path="/pheed" component={Pheed} exact />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </>
  );
}

export default App;
