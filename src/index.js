import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import reducer from './redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getCurrentUser } from './redux/auth/actions'

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));

// TODO: needs refactor
if(localStorage.getItem('access-token')) {
  store.dispatch(getCurrentUser());
}

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
