import React from 'react';
import './App.css';

import {HashRouter} from 'react-router-dom';
import Routes from './Routes';
// import SignIn from './components/SignIn'
function App() {
  return (
    <React.Fragment>
      <HashRouter>
      <Routes />
      </HashRouter>
    </React.Fragment>    
  );
}

export default App;
