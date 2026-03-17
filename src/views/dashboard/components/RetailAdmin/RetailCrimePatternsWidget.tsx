import { subDays } from 'date-fns';
import React, { useMemo } from 'react';
import CrimePatterns from 'views/retail-admin-dashboard/components/CrimePatterns/CrimePatterns';
import { useRetailAdminDashboard } from 'views/retail-admin-dashboard/hooks/useRetailAdminDashboard';

const RetailCrimePatternsWidget: React.FC = () => {
  const dateRange = useMemo(
    () => ({ endDate: new Date(), startDate: subDays(new Date(), 30) }),
    []
  );
  const { crimePatterns, loading } = useRetailAdminDashboard(dateRange);
  return <CrimePatterns data={crimePatterns} loading={loading} />;
};

export default RetailCrimePatternsWidget;
