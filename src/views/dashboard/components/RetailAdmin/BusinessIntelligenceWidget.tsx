import { subDays } from 'date-fns';
import React, { useMemo } from 'react';
import BusinessIntelligence from 'views/retail-admin-dashboard/components/BusinessIntelligence/BusinessIntelligence';
import { useRetailAdminDashboard } from 'views/retail-admin-dashboard/hooks/useRetailAdminDashboard';

const BusinessIntelligenceWidget: React.FC = () => {
  const dateRange = useMemo(
    () => ({ endDate: new Date(), startDate: subDays(new Date(), 90) }),
    []
  );
  const { businessIntelligence, loading } = useRetailAdminDashboard(dateRange);
  return <BusinessIntelligence data={businessIntelligence} loading={loading} />;
};

export default BusinessIntelligenceWidget;
