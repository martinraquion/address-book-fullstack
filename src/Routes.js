import React from 'react';
import {Switch, Route} from 'react-router-dom';

import SignIn from './components/SignIn'
import Register from './components/Register'
import AddressBook from './components/AddressBook'
import AddressBookSub from './components/AddressBookSub'

export default function Routes(){
  return(
          <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/addressbook" component={AddressBook} />
              <Route exact path="/addressbook2" component={AddressBookSub} />
          </Switch>

  )
}