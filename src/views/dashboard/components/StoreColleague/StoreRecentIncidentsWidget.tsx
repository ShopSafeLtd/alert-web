import React from 'react';
import RecentIncidents from 'views/store-colleague-dashboard/components/RecentIncidents/RecentIncidents';
import { useStoreColleagueDashboard } from 'views/store-colleague-dashboard/hooks/useStoreColleagueDashboard';

const StoreRecentIncidentsWidget: React.FC = () => {
  const { loading, recentIncidents } = useStoreColleagueDashboard();
  return <RecentIncidents incidents={recentIncidents} loading={loading} />;
};

export default StoreRecentIncidentsWidget;
