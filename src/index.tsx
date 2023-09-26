import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {legacy_createStore as createStore ,combineReducers} from 'redux'
import * as reducers from './reducers'

import routes from './router';
import './index.module.less'

// const store = configureStore(combineReducers({...reducers}))
const store = createStore(combineReducers({ ...reducers}));

 
function App() {
  return useRoutes(routes) 
}

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
