import React, { useRef, useEffect, useState } from 'react';
import { useObservable, observer } from 'mobx-react-lite';

import {
  Card, CardHeader, CardContent,
} from '@material-ui/core';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';

import WeightStore from '../mobx/weight';

const baseSize = [600, 200];
const sizeRatio = baseSize[1] / baseSize[0];
const WeightChart = () => {
  const [[width, height], setSize] = useState(baseSize);
  const { weightsData } = useObservable(WeightStore);
  const containerRef = useRef(null);
  const updateSize = () => {
    if (containerRef.current) {
      const { width: clientWidth } = containerRef.current.getBoundingClientRect();
      setSize([clientWidth - 50, sizeRatio * clientWidth]);
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
    </Card>
  );
};

export default observer(WeightChart);
