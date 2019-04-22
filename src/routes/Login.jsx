import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
} from '@material-ui/core';
import UserStore from '../mobx/user';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

const useFormState = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    setIsValid(
      email.length > 0
      && email.match(emailRegex),
    );
    setIsChanged(
      email.length > 0,
    );
  }, [email]);
  const onChange = ({ target: { value } }) => setEmail(value);
  const reset = () => setEmail('');
  return {
    isValid, isChanged, value: email, onChange, reset,
  };
};

const LoginScreen = () => {
  const {
    value, isValid, isChanged, reset, onChange,
  } = useFormState();
  return (
    <Card>
      <CardHeader title="Login" subtitle="All we need is your email address" />
      <CardContent>
        <TextField {...{ value, onChange }} type="email" />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          disabled={!isValid}
          variant={isValid ? 'contained' : null}
          onClick={isValid ? (() => UserStore.login(value)) : null}
        >
          Login!
        </Button>
        <Button
          disabled={!isChanged}
          onClick={reset}
        >
          Reset Data!
        </Button>
      </CardActions>
    </Card>
  );
};

export default LoginScreen;
