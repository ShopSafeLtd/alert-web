import React from 'react';
import StoreSummary from 'views/store-colleague-dashboard/components/StoreSummary/StoreSummary';
import { useStoreColleagueDashboard } from 'views/store-colleague-dashboard/hooks/useStoreColleagueDashboard';

const StoreSummaryWidget: React.FC = () => {
  const { loading, summary } = useStoreColleagueDashboard();
  return <StoreSummary loading={loading} summary={summary} />;
};

export default StoreSummaryWidget;
