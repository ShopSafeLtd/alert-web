import { subDays } from 'date-fns';
import React, { useMemo } from 'react';
import AdminSummary from 'views/retail-admin-dashboard/components/AdminSummary/AdminSummary';
import { useRetailAdminDashboard } from 'views/retail-admin-dashboard/hooks/useRetailAdminDashboard';

const AdminSummaryWidget: React.FC = () => {
  const dateRange = useMemo(
    () => ({ endDate: new Date(), startDate: subDays(new Date(), 30) }),
    []
  );
  const { loading, summary } = useRetailAdminDashboard(dateRange);
  return <AdminSummary loading={loading} summary={summary} />;
};

export default AdminSummaryWidget;
