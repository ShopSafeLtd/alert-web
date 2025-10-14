import React from 'react';

import View from './Dashboard.view';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { data, loading } = useDashboard();
  return <View data={data} loading={loading} />;
};

export default Dashboard;
