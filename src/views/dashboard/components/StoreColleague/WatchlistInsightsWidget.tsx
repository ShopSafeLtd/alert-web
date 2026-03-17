import React from 'react';
import WatchlistInsights from 'views/store-colleague-dashboard/components/WatchlistInsights/WatchlistInsights';
import { useStoreColleagueDashboard } from 'views/store-colleague-dashboard/hooks/useStoreColleagueDashboard';

const WatchlistInsightsWidget: React.FC = () => {
  const { loading, watchlistInsights } = useStoreColleagueDashboard();
  return <WatchlistInsights insights={watchlistInsights} loading={loading} />;
};

export default WatchlistInsightsWidget;
