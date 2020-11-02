import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

import TabPage from './TabPage';
import UserInfo from './UserInfo';
import UserContext from './UserContext';
import NoMatch from './NoMatch';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const localStorageUsers = localStorage.getItem('users');
  const tabUsers = localStorageUsers ? JSON.parse(localStorageUsers) : [];

  const [users, setUsers] = useState(tabUsers);
  return (
    <UserContext.Provider value={[users, setUsers]}>
      <Switch>
        <Route path="/user/:id" component={UserInfo} />
        <Route path="/tab" component={TabPage} />
        <Route exact path="/" component={TabPage} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
