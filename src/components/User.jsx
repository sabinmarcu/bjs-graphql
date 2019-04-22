/* eslint-disable react/prop-types */

import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import md5 from 'md5';

import {
  Card, CardHeader, CardActions, Button,
} from '@material-ui/core';

import { DeleteUser } from '../gql/user.mutation.gql';

const UserCard = ({ id, name, email }) => {
  const removeUser = useMutation(DeleteUser, {
    variables: { id },
  });
  return (
    <Card>
      <CardHeader
        avatar={<img src={`https://www.gravatar.com/avatar/${md5(email)}`} alt="" />}
        title={name}
        subheader={email}
      />
      <CardActions>
        <Button onClick={removeUser}>Remove User</Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
