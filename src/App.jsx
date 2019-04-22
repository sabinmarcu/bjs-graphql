import React from 'react';
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
} from 'mdi-material-ui';

import useNavHandler from './hooks/navmenu';
import UserList from './components/UserList';

const menuOrigin = {
  vertical: 'top',
  horizontal: 'right',
};
const App = () => {
  const {
    open, anchorEl, onClick, onClose,
  } = useNavHandler();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div>
            <IconButton {...{ onClick }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorOrigin={menuOrigin}
              transformOrigin={menuOrigin}
              {...{ anchorEl, open, onClose }}
            >
              <MenuItem onClick={onClose}>Item</MenuItem>
            </Menu>
          </div>
          <Typography variant="h6">React GQL Mobx Example</Typography>
        </Toolbar>
      </AppBar>
      <div>
        <UserList />
      </div>
    </div>
  );
};

export default App;
