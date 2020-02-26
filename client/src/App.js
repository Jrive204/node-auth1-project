import React, { useState } from 'react';
import './App.scss';
import Login_Signup from './components/Login_Signup';
import { Route, Switch } from 'react-router-dom';
import Privateroute from './components/util/Privateroute';
import User from './components/User';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Login_Signup />
        </Route>
        <Privateroute path='/users' component={User} />
      </Switch>
    </div>
  );
}

export default App;
