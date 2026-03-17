import { subDays } from 'date-fns';
import React, { useMemo } from 'react';
import CrimeTypeDistribution from 'views/retail-admin-dashboard/components/CrimeTypeDistribution/CrimeTypeDistribution';
import { useRetailAdminDashboard } from 'views/retail-admin-dashboard/hooks/useRetailAdminDashboard';

const CrimeTypeDistributionWidget: React.FC = () => {
  const dateRange = useMemo(
    () => ({ endDate: new Date(), startDate: subDays(new Date(), 90) }),
    []
  );
  const { crimeTypeDistribution, loading } = useRetailAdminDashboard(dateRange);
  return (
    <CrimeTypeDistribution data={crimeTypeDistribution} loading={loading} />
  );
};

export default CrimeTypeDistributionWidget;
