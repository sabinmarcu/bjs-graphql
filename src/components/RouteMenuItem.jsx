/* eslint-disable react/prop-types */

import React from 'react';
import { MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

const RouterButton = ({ to, children, ...rest }) => (
  <Link to={to} style={{ textDecoration: 'none', display: 'block' }}>
    <MenuItem {...rest}>{children}</MenuItem>
  </Link>
);

export default RouterButton;
