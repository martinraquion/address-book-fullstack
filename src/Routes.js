import React from 'react';
import {Switch, Route} from 'react-router-dom';

import SignIn from './components/SignIn'
import Register from './components/Register'

export default function Routes(){
  return(
          <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/register" component={Register} />
          </Switch>

  )
}