import React, { useState, useEffect } from 'react';
import { useObservable, observer } from 'mobx-react-lite';
import { useMutation } from 'react-apollo-hooks';
import {
  Card, CardHeader, CardContent, CardActions, TextField, Button,
} from '@material-ui/core';

import { SetHeight } from '../gql/user.mutation.gql';
import UserStore from '../mobx/user';

const useFormState = (initialValue = 0) => {
  const [height, setHeight] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => setIsValid(
    height >= 0.5 && height,
  ), [height]);
  const onChange = ({ target: { value } }) => setHeight(value);
  return {
    height, setHeight, onChange, isValid,
  };
};

const WeightForm = () => {
  const {
    height,
    id,
  } = useObservable(UserStore);
  const {
    height: formHeight, setHeight, onChange, isValid,
  } = useFormState();
  useEffect(() => setHeight(height), [height]);
  const updateHeight = useMutation(SetHeight, {
    variables: {
      id,
      height: parseFloat(formHeight),
    },
    update: (_, { data: { updateUser: { height: newHeight } } }) => {
      UserStore.height = newHeight;
    },
  });
  return (
    <Card>
      <CardHeader title={`Height (${height}m)`} subtitle="Set your height" />
      <CardContent>
        <TextField
          value={formHeight}
          onChange={onChange}
          type="number"
        />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant={isValid ? 'contained' : null}
          disabled={!isValid}
          onClick={isValid ? updateHeight : null}
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
};

export default observer(WeightForm);
