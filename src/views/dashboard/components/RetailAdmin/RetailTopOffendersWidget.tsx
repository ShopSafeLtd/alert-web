import { subDays } from 'date-fns';
import React, { useMemo } from 'react';
import TopOffenders from 'views/retail-admin-dashboard/components/TopOffenders/TopOffenders';
import { useRetailAdminDashboard } from 'views/retail-admin-dashboard/hooks/useRetailAdminDashboard';

const RetailTopOffendersWidget: React.FC = () => {
  const dateRange = useMemo(
    () => ({ endDate: new Date(), startDate: subDays(new Date(), 30) }),
    []
  );
  const { loading, topOffenders } = useRetailAdminDashboard(dateRange);
  return <TopOffenders loading={loading} offenders={topOffenders} />;
};

export default RetailTopOffendersWidget;
