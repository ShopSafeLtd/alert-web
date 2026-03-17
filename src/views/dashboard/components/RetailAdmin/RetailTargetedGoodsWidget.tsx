import { subDays } from 'date-fns';
import React, { useMemo } from 'react';
import TargetedGoods from 'views/retail-admin-dashboard/components/TargetedGoods/TargetedGoods';
import { useRetailAdminDashboard } from 'views/retail-admin-dashboard/hooks/useRetailAdminDashboard';

const RetailTargetedGoodsWidget: React.FC = () => {
  const dateRange = useMemo(
    () => ({ endDate: new Date(), startDate: subDays(new Date(), 30) }),
    []
  );
  const { loading, targetedGoods } = useRetailAdminDashboard(dateRange);
  return <TargetedGoods data={targetedGoods} loading={loading} />;
};

export default RetailTargetedGoodsWidget;
