import React, { useRef, useEffect, useState } from 'react';
import { useObservable, observer } from 'mobx-react-lite';

import {
  Card, CardHeader, CardContent,
} from '@material-ui/core';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';

import WeightStore from '../mobx/weight';

const WeightChart = () => {
  const [[width, height], setSize] = useState([600, 300]);
  const { weightsData, BMI } = useObservable(WeightStore);
  const containerRef = useRef(null);
  const updateSize = () => {
    if (containerRef.current) {
      const { width: clientWidth } = containerRef.current.getBoundingClientRect();
      setSize([clientWidth, height]);
    }
  };
  useEffect(updateSize, [containerRef]);
  useEffect(() => {
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);
  return (
    <Card>
      <CardHeader title="Weights" subheader="A chart of weight recordings" />
      <CardContent>
        <div ref={containerRef}>
          <LineChart width={width} height={height} data={weightsData}>
            <Line dataKey="weight" stroke="#888" />
            <CartesianGrid stroke="#ccc" />
            <YAxis />
            <XAxis dataKey="date" />
            <Tooltip />
          </LineChart>
        </div>
      </CardContent>
      <CardHeader title="Your BMI" subheader={BMI} />
    </Card>
  );
};

export default observer(WeightChart);
