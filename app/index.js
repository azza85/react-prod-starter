import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { checkIfAuthed } from 'helpers/auth'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import * as reducers from 'redux/modules'
import { hashHistory } from 'react-router'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const client = axios.create({
  baseURL: '', //apirul
  responseType: 'json'
});

const store = createStore(combineReducers({
    ...reducers,
    form: reduxFormReducer,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(
      thunk,
      axiosMiddleware(client)
    ),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

const history = syncHistoryWithStore(hashHistory, store)

function checkAuth (nextState, replace) {
  if (store.getState().users.isFetching === true) {
    return
  }

  const isAuthed = checkIfAuthed(store)
  const nextPathName = nextState.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed')
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth')
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth, history)}
  </Provider>,
document.getElementById('app'))