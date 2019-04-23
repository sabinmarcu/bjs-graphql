import React, { useState, useEffect } from 'react';
import { useObservable, observer } from 'mobx-react-lite';
import { useMutation } from 'react-apollo-hooks';
import {
  Card, CardHeader, CardContent, CardActions, TextField, Button,
} from '@material-ui/core';

import { AddWeight } from '../gql/weight.mutation.gql';
import UserStore from '../mobx/user';
import WeightStore from '../mobx/weight';

const useFormState = () => {
  const [weight, setWeight] = useState(0);
  const [isValid, setIsValid] = useState(false);
  useEffect(() => setIsValid(weight > 0), [weight]);
  const onChange = ({ target: { value } }) => setWeight(value);
  return {
    weight, setWeight, isValid, onChange,
  };
};

const WeightForm = () => {
  const {
    weight, setWeight, isValid, onChange,
  } = useFormState();
  const { id } = useObservable(UserStore);
  const addWeight = useMutation(AddWeight, {
    variables: {
      id,
      weight: parseFloat(weight),
    },
    update: (_, { data: { createWeight: newWeight } }) => {
      setWeight(0);
      WeightStore.weights.push(newWeight);
    },
  });
  return (
    <Card>
      <CardHeader title="Add Weight" subtitle="Enter a number" />
      <CardContent>
        <TextField
          value={weight}
          onChange={onChange}
          type="number"
        />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant={isValid ? 'contained' : null}
          disabled={!isValid}
          onClick={isValid ? addWeight : null}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default observer(WeightForm);
