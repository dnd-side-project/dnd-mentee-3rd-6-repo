import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';
import './index.css';
import App from './App';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

const middlewares = [sagaMiddleware];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

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
