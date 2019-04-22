/* eslint-disable react/prop-types */

import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const RouterButton = ({ to, children, ...rest }) => (
  <Link to={to}>
    <Button {...rest}>{children}</Button>
  </Link>
);

export default RouterButton;
