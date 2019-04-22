import React from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Account as AccountIcon,
} from 'mdi-material-ui';

import useNavHandler from '../hooks/navmenu';
import UserStore from '../mobx/user';

import RouteMenuItem from './RouteMenuItem';
import styles from './NavBar.module.css';

const menuOrigin = {
  vertical: 'top',
  horizontal: 'right',
};
const NavBar = () => {
  const {
    open: routesOpen, anchorEl: routesAnchor, onClick: routesClick, onClose: routesClose,
  } = useNavHandler();
  const {
    open: userOpen, anchorEl: userAnchor, onClick: userClick, onClose: userClose,
  } = useNavHandler();
  const { name, isLoggedIn } = useObservable(UserStore);
  return (
    <AppBar position="static">
      <Toolbar>
        <div>
          <IconButton onClick={routesClick} className={styles.white}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorOrigin={menuOrigin}
            transformOrigin={menuOrigin}
            anchorEl={routesAnchor}
            open={routesOpen}
            onClose={routesClose}
          >
            <RouteMenuItem to="/">Home</RouteMenuItem>
            <RouteMenuItem to="/users">Users</RouteMenuItem>
          </Menu>
        </div>
        <Typography variant="h6" className={[styles.title, styles.white].join(' ')}>React GQL Mobx Example</Typography>
        {isLoggedIn && (
          <div className={styles.user}>
            <Typography variant="h6" className={styles.white}>{name}</Typography>
            <IconButton onClick={userClick} className={styles.white}>
              <AccountIcon />
            </IconButton>
            <Menu
              anchorOrigin={menuOrigin}
              transformOrigin={menuOrigin}
              anchorEl={userAnchor}
              open={userOpen}
              onClose={userClose}
            >
              <MenuItem onClick={UserStore.logout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default observer(NavBar);
