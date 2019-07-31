import React from 'react';
import {Switch, Route} from 'react-router-dom';

import SignIn from './components/SignIn'
// import Register from './components/Register'
// import AddressBook from './components/AddressBook'
import AddressBookSub from './components/AddressBookSub'
import SignUp from './components/SignUp';

export default function Routes(){
  return(
          <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/register" component={SignUp} />
              <Route exact path="/addressbook" component={AddressBookSub} />
              {/* <Route exact path="/addressbook2" component={AddressBookSub} /> */}
          </Switch>

  )
}