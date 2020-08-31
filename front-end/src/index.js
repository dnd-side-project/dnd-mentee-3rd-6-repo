import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import dotenv from 'dotenv';

import './index.css';
import App from './App';
import rootReducer, { rootSaga } from './modules/index';

dotenv.config();

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

const middlewares = [sagaMiddleware];

const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares)) // 배포용
    : composeWithDevTools(applyMiddleware(...middlewares)); // 개발용

const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
