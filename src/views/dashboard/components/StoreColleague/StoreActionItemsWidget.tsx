import React from 'react';
import ActionItems from 'views/store-colleague-dashboard/components/ActionItems/ActionItems';
import { useStoreColleagueDashboard } from 'views/store-colleague-dashboard/hooks/useStoreColleagueDashboard';

const StoreActionItemsWidget: React.FC = () => {
  const { actionItems, loading } = useStoreColleagueDashboard();
  return <ActionItems actionItems={actionItems} loading={loading} />;
};

export default StoreActionItemsWidget;
