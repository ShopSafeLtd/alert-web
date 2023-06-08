import React from 'react';
import View from './Dashboard.view';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { data, loading, matchesData } = useDashboard();
  return <View data={data} loading={loading} matchesData={matchesData} />;
};

export default Dashboard;
