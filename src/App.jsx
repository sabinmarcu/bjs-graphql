import React from 'react';
import { Route } from 'react-router-dom';
import { observer, useObservable } from 'mobx-react-lite';

import UserStore from './mobx/user';

import NavBar from './components/NavBar';

import HomeScreen from './routes/Home';
import LoginScreen from './routes/Login';
import UsersListScreen from './routes/Users';

const App = () => {
  const { isLoggedIn } = useObservable(UserStore);
  return (
    <div>
      <NavBar />
      {isLoggedIn ? (
        <>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/users" component={UsersListScreen} />
        </>
      ) : (
        <LoginScreen />
      )}
    </div>
  );
};

export default observer(App);
