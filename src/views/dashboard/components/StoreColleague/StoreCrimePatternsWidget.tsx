import React from 'react';
import CrimePatterns from 'views/store-colleague-dashboard/components/CrimePatterns/CrimePatterns';
import { useStoreColleagueDashboard } from 'views/store-colleague-dashboard/hooks/useStoreColleagueDashboard';

const StoreCrimePatternsWidget: React.FC = () => {
  const { crimePatterns, loading } = useStoreColleagueDashboard();
  return <CrimePatterns data={crimePatterns} loading={loading} />;
};

export default StoreCrimePatternsWidget;
