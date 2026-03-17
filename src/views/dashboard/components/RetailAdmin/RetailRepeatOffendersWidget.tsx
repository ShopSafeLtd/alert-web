import { subDays } from 'date-fns';
import React, { useMemo } from 'react';
import RepeatOffenderInsights from 'views/retail-admin-dashboard/components/RepeatOffenderInsights/RepeatOffenderInsights';
import { useRetailAdminDashboard } from 'views/retail-admin-dashboard/hooks/useRetailAdminDashboard';

const RetailRepeatOffendersWidget: React.FC = () => {
  const dateRange = useMemo(
    () => ({ endDate: new Date(), startDate: subDays(new Date(), 90) }),
    []
  );
  const { loading, repeatOffenderInsights } =
    useRetailAdminDashboard(dateRange);
  return (
    <RepeatOffenderInsights
      insights={repeatOffenderInsights}
      loading={loading}
    />
  );
};

export default RetailRepeatOffendersWidget;
