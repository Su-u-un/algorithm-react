import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';


import App from './router';
import './assets/global.less'

const root = document.getElementById('root');

if(root) {
  createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <App/ >
      </BrowserRouter>
    </Provider>
  )
}
