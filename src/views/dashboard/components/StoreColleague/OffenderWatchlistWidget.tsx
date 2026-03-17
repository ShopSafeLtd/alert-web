import React from 'react';
import OffenderWatchlist from 'views/store-colleague-dashboard/components/OffenderWatchlist/OffenderWatchlist';
import { useStoreColleagueDashboard } from 'views/store-colleague-dashboard/hooks/useStoreColleagueDashboard';

const OffenderWatchlistWidget: React.FC = () => {
  const { loading, offenderWatchlist } = useStoreColleagueDashboard();
  return <OffenderWatchlist loading={loading} offenders={offenderWatchlist} />;
};

export default OffenderWatchlistWidget;
