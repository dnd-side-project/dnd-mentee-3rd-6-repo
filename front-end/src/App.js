import React from 'react';
import { Route } from 'react-router-dom';
import Pheed from './pages/Pheed';

function App() {
  return (
    <>
      <Route path="/" component={Pheed} exact />
    </>
  );
}

export default App;
