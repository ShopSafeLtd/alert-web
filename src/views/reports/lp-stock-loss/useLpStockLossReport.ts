import type { DateRange } from 'views/police-dashboard/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

import type {
  LpStockLossBusinessHotspotsOrderBy,
  LpStockLossGoodsTypeOrderBy,
  LpStockLossOffenderOrderBy,
  LpStockLossReportQueryVariables,
  LpStockLossTopItemsOrderBy,
} from './graphql/__generated__/lp-stock-loss-report.generated';

import { useLpStockLossReportQuery } from './graphql/__generated__/lp-stock-loss-report.generated';

export const useLpStockLossReport = (
  dateRange: DateRange,
  goodsTypeId?: null | string,
  stockItemId?: null | string,
  businessId?: null | string,
  topItemsOrderBy?: LpStockLossTopItemsOrderBy,
  offenderOrderBy?: LpStockLossOffenderOrderBy,
  goodsTypeOrderBy?: LpStockLossGoodsTypeOrderBy,
  businessHotspotsOrderBy?: LpStockLossBusinessHotspotsOrderBy,
  groupIds?: null | string[]
) => {
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const variables = useMemo(() => {
    const vars: LpStockLossReportQueryVariables = { schemeId };
    if (goodsTypeId) vars.goodsTypeId = goodsTypeId;
    if (stockItemId) vars.stockItemId = stockItemId;
    if (businessId) vars.businessId = businessId;
    if (topItemsOrderBy) vars.topItemsOrderBy = topItemsOrderBy;
    if (offenderOrderBy) vars.offenderOrderBy = offenderOrderBy;
    if (goodsTypeOrderBy) vars.goodsTypeOrderBy = goodsTypeOrderBy;
    if (businessHotspotsOrderBy)
      vars.businessHotspotsOrderBy = businessHotspotsOrderBy;
    if (groupIds && groupIds.length > 0) vars.groupIds = groupIds;
    if (dateRange) {
      const startDate = new Date(dateRange.startDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(dateRange.endDate);
      endDate.setHours(23, 59, 59, 999);
      vars.startDate = startDate;
      vars.endDate = endDate;
    }
    return vars;
  }, [
    schemeId,
    dateRange,
    goodsTypeId,
    stockItemId,
    businessId,
    topItemsOrderBy,
    offenderOrderBy,
    goodsTypeOrderBy,
    businessHotspotsOrderBy,
    groupIds,
  ]);

  const { data, error, loading, refetch } = useLpStockLossReportQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const report = data?.lpStockLossReport;

  return {
    businessHotspots: report?.businessHotspots ?? [],
    error,
    goodsTypeBreakdown: report?.goodsTypeBreakdown ?? [],
    incidentAnalysis: report?.incidentAnalysis ?? null,
    loading,
    offenderAssociations: report?.offenderAssociations ?? [],
    recoveryAnalysis: report?.recoveryAnalysis ?? null,
    refetch,
    summary: report?.summary ?? null,
    topTargetedItems: report?.topTargetedItems ?? [],
  };
};

export {
  LpStockLossBusinessHotspotsOrderBy,
  LpStockLossGoodsTypeOrderBy,
  LpStockLossOffenderOrderBy,
  LpStockLossTopItemsOrderBy,
} from './graphql/__generated__/lp-stock-loss-report.generated';
