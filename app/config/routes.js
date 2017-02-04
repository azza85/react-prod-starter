import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import {
  MainContainer, HomeContainer,
  AuthenticateContainer, LogoutContainer } from 'containers'

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history}>
      <Route path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth} />
        <Route path='logout' component={LogoutContainer} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth}/>
      </Route>
    </Router>
  )
}