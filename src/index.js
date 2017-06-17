import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import Navbar from './Navbar'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
ReactDOM.render(
  <Provider store={store}>
    <Navbar />
  </Provider>,
  document.getElementById('nav')
)
registerServiceWorker();
