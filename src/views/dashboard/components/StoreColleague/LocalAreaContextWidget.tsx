import React from 'react';
import LocalAreaContext from 'views/store-colleague-dashboard/components/LocalAreaContext/LocalAreaContext';
import { useStoreColleagueDashboard } from 'views/store-colleague-dashboard/hooks/useStoreColleagueDashboard';

const LocalAreaContextWidget: React.FC = () => {
  const { loading, localAreaContext } = useStoreColleagueDashboard();
  return <LocalAreaContext context={localAreaContext} loading={loading} />;
};

export default LocalAreaContextWidget;
