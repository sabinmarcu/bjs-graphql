import React from 'react';

import HeightForm from '../components/HeightForm';
import WeightChart from '../components/WeightChart';
import WeightForm from '../components/WeightForm';
import StatsCard from '../components/StatsCard';

const HomeScreen = () => (
  <div>
    <HeightForm />
    <WeightChart />
    <StatsCard />
    <WeightForm />
  </div>
);

export default HomeScreen;
