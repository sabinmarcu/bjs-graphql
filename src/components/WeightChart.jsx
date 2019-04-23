import React from 'react';
import { useObservable, observer } from 'mobx-react-lite';

import {
  Card, CardHeader, CardContent,
} from '@material-ui/core';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';

import WeightStore from '../mobx/weight';

const WeightChart = () => {
  const { weightsData, BMI } = useObservable(WeightStore);
  return (
    <Card>
      <CardHeader title="Weights" subheader="A chart of weight recordings" />
      <CardContent>
        <LineChart width={600} height={300} data={weightsData}>
          <Line dataKey="weight" stroke="#888" />
          <CartesianGrid stroke="#ccc" />
          <YAxis />
          <XAxis dataKey="date" />
          <Tooltip />
        </LineChart>
      </CardContent>
      <CardHeader title="Your BMI" subheader={BMI} />
    </Card>
  );
};

export default observer(WeightChart);
