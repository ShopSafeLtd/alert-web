import React from 'react';
import ActiveBans from 'views/store-colleague-dashboard/components/ActiveBans/ActiveBans';
import { useStoreColleagueDashboard } from 'views/store-colleague-dashboard/hooks/useStoreColleagueDashboard';

const StoreActiveBansWidget: React.FC = () => {
  const { activeBans, loading } = useStoreColleagueDashboard();
  return <ActiveBans bans={activeBans} loading={loading} />;
};

export default StoreActiveBansWidget;
