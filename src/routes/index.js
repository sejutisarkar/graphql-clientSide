import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import createTeam from './createTeam';
export default () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/register' exact component={Register} />
      <Route path='/login' exact component={Login} />
      <Route path='/createteam' exact component={createTeam} />
    </Switch>
  </BrowserRouter>

);
