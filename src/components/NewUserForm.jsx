import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo-hooks';
import {
  Card, CardHeader, CardContent, TextField, Button,
} from '@material-ui/core';

import { CreateUser } from '../gql/user.mutation.gql';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

const useHandlers = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  useEffect(() => setIsValid(
    name.length > 0
    && email.length > 0
    && emailRegex.test(email),
  ), [name, email]);
  const changeMap = {
    name: setName,
    email: setEmail,
  };
  const onChange = field => ({ target: { value } }) => {
    if (changeMap[field]) {
      changeMap[field](value);
    }
  };
  const reset = () => {
    setName('');
    setEmail('');
  };
  return {
    name, email, isValid, onChange, reset,
  };
};

const NewUserForm = () => {
  const {
    name, email, onChange, isValid, reset,
  } = useHandlers();
  const createUser = useMutation(CreateUser, {
    variables: {
      email,
      name,
    },
    update: reset,
  });
  return (
    <Card>
      <CardHeader title="New User" subheader="Create a new user" />
      <CardContent>
        <TextField value={name} label="Name" onChange={onChange('name')} />
        <TextField value={email} type="email" label="Email" onChange={onChange('email')} />
        <Button
          disabled={!isValid}
          raised={isValid}
          onClick={isValid ? createUser : null}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewUserForm;
