/* eslint-disable react/prop-types */

import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import md5 from 'md5';

import {
  Card, CardHeader, CardActions, Button, Switch,
} from '@material-ui/core';

import { DeleteUser, SetAdmin } from '../gql/user.mutation.gql';

const UserCard = ({
  id, name, email, isAdmin,
}) => {
  const removeUser = useMutation(DeleteUser, {
    variables: { id },
  });
  const toggleAdmin = useMutation(SetAdmin, {
    variables: { id, isAdmin: !isAdmin },
  });
  return (
    <Card>
      <CardHeader
        avatar={<img src={`https://www.gravatar.com/avatar/${md5(email)}`} alt="" />}
        title={name}
        subheader={email}
      />
      <CardActions>
        <Button onClick={toggleAdmin}>
          <span>
            {isAdmin ? 'Is an admin' : 'Is not an admin'}
          </span>
          <Switch checked={isAdmin} color="primary" />
        </Button>
      </CardActions>
      <CardActions>
        <Button color="secondary" onClick={removeUser}>Remove User</Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
