import { subDays } from 'date-fns';
import React, { useMemo } from 'react';
import OperationalQueue from 'views/retail-admin-dashboard/components/OperationalQueue/OperationalQueue';
import { useRetailAdminDashboard } from 'views/retail-admin-dashboard/hooks/useRetailAdminDashboard';

const OperationalQueueWidget: React.FC = () => {
  const dateRange = useMemo(
    () => ({ endDate: new Date(), startDate: subDays(new Date(), 90) }),
    []
  );
  const { loading, operationalQueue } = useRetailAdminDashboard(dateRange);
  return <OperationalQueue data={operationalQueue} loading={loading} />;
};

export default OperationalQueueWidget;
