import React from 'react';
import { useObservable, observer } from 'mobx-react-lite';
import {
  Card, CardHeader, CardContent, Typography,
} from '@material-ui/core';

import WeightStore from '../mobx/weight';

const StatsCard = () => {
  const { number, averageWeight, BMI } = useObservable(WeightStore);
  return (
    <Card>
      <CardHeader title="Stats" />
      <CardContent>
        <Typography variant="h6">
          {`BMI: ${BMI}`}
        </Typography>
        <Typography variant="h6">
          {`Average Weight: ${averageWeight}`}
        </Typography>
        <Typography variant="h6">
          {`Number of Weigh-ins: ${number}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default observer(StatsCard);
