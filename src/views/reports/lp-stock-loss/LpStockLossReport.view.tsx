import type { DateRange } from 'views/police-dashboard/types';

import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import { Result, Select, Space, Tag } from 'antd';
import BusinessesSelect from 'components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from 'components/form-components/GroupsSelect/GroupsSelect.view';
import StockItemSelect from 'components/form-components/StockItemSelect/StockItemSelect.view';
import { useGoodsData } from 'components/form-components/goodsSelect/GoodsSelect.view';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import BusinessHotspots from './components/BusinessHotspots';
import GoodsTypeBreakdown from './components/GoodsTypeBreakdown';
import IncidentAnalysis from './components/IncidentAnalysis';
import LpStockLossSummary from './components/LpStockLossSummary';
import OffenderAssociations from './components/OffenderAssociations';
import RecoveryAnalysis, {
  RecoveryItemsSummary,
} from './components/RecoveryAnalysis';
import TopTargetedItems from './components/TopTargetedItems';
import {
  LpStockLossBusinessHotspotsOrderBy,
  LpStockLossGoodsTypeOrderBy,
  LpStockLossOffenderOrderBy,
  LpStockLossTopItemsOrderBy,
  useLpStockLossReport,
} from './useLpStockLossReport';

const LpStockLossReport: React.FC = () => {
  const intl = useIntl();

  const [dateRange, setDateRange] = useState<DateRange>(null);
  const [goodsTypeId, setGoodsTypeId] = useState<null | string>(null);
  const [businessId, setBusinessId] = useState<null | string>(null);
  const [selectedStockItem, setSelectedStockItem] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [topItemsOrderBy, setTopItemsOrderBy] =
    useState<LpStockLossTopItemsOrderBy>(
      LpStockLossTopItemsOrderBy.IncidentCount
    );
  const [offenderOrderBy, setOffenderOrderBy] =
    useState<LpStockLossOffenderOrderBy>(
      LpStockLossOffenderOrderBy.IncidentCount
    );
  const [goodsTypeOrderBy, setGoodsTypeOrderBy] =
    useState<LpStockLossGoodsTypeOrderBy>(
      LpStockLossGoodsTypeOrderBy.IncidentCount
    );
  const [businessHotspotsOrderBy, setBusinessHotspotsOrderBy] =
    useState<LpStockLossBusinessHotspotsOrderBy>(
      LpStockLossBusinessHotspotsOrderBy.TotalValue
    );
  const [groupIds, setGroupIds] = useState<string[]>([]);

  const { goodsData, loading: goodsLoading } = useGoodsData();

  const {
    businessHotspots,
    error,
    goodsTypeBreakdown,
    incidentAnalysis,
    loading,
    offenderAssociations,
    recoveryAnalysis,
    refetch,
    summary,
    topTargetedItems,
  } = useLpStockLossReport(
    dateRange,
    goodsTypeId,
    selectedStockItem?.id ?? null,
    businessId,
    topItemsOrderBy,
    offenderOrderBy,
    goodsTypeOrderBy,
    businessHotspotsOrderBy,
    groupIds
  );

  if (error) {
    return (
      <div className="page-container" style={{ padding: 24 }}>
        <Result
          extra={[
            <button
              key="retry"
              onClick={() => {
                void refetch();
              }}
              style={{
                backgroundColor: '#1890ff',
                border: 'none',
                borderRadius: 4,
                color: 'white',
                cursor: 'pointer',
                padding: '8px 16px',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Retry' })}
            </button>,
          ]}
          status="warning"
          subTitle={error.message}
          title={intl.formatMessage({
            defaultMessage: 'Unable to load LP Stock Loss Report',
          })}
        />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16 }} wrap>
        <DateSelect
          defaultRange="last3Months"
          onChange={(value) => setDateRange(value ?? null)}
        />
        <BusinessesSelect
          allowClear
          onChange={(ids) => setBusinessId(ids[0] ?? null)}
          onClear={() => setBusinessId(null)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Filter by Business',
          })}
          style={{ minWidth: 240 }}
          value={businessId ?? undefined}
        />
        <Select
          allowClear
          loading={goodsLoading}
          onChange={(v: string | undefined) => setGoodsTypeId(v ?? null)}
          optionFilterProp="label"
          options={goodsData}
          placeholder={intl.formatMessage({
            defaultMessage: 'Filter by Goods Type',
          })}
          showSearch
          style={{ minWidth: 220 }}
          value={goodsTypeId}
        />
        <GroupsSelect
          allowClear
          maxTagCount="responsive"
          mode="multiple"
          onChange={(ids) => setGroupIds(ids)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Filter by Group',
          })}
          style={{ minWidth: 220 }}
          value={groupIds}
        />
        {selectedStockItem ? (
          <Tag
            closable
            color="blue"
            onClose={() => setSelectedStockItem(null)}
            style={{ fontSize: 14, padding: '4px 8px' }}
          >
            {selectedStockItem.name}
          </Tag>
        ) : (
          <StockItemSelect
            allowClear
            onChange={(item) =>
              setSelectedStockItem({ id: item.id, name: item.name ?? item.id })
            }
            onClear={() => setSelectedStockItem(null)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Filter by Stock Item',
            })}
            style={{ minWidth: 280 }}
          />
        )}
      </Space>

      <LpStockLossSummary loading={loading} summary={summary} />
      <TopTargetedItems
        data={topTargetedItems}
        loading={loading}
        onOrderByChange={setTopItemsOrderBy}
        onSelectBusiness={setBusinessId}
        onSelectStockItem={(id, name) =>
          setSelectedStockItem({ id, name: name ?? id })
        }
        orderBy={topItemsOrderBy}
      />
      <GoodsTypeBreakdown
        data={goodsTypeBreakdown}
        loading={loading}
        onOrderByChange={setGoodsTypeOrderBy}
        orderBy={goodsTypeOrderBy}
      />
      <IncidentAnalysis data={incidentAnalysis} loading={loading} />
      <OffenderAssociations
        data={offenderAssociations}
        loading={loading}
        onOrderByChange={setOffenderOrderBy}
        orderBy={offenderOrderBy}
      />
      <RecoveryAnalysis data={recoveryAnalysis} loading={loading} />
      <BusinessHotspots
        data={businessHotspots}
        loading={loading}
        onOrderByChange={setBusinessHotspotsOrderBy}
        orderBy={businessHotspotsOrderBy}
      />
      <RecoveryItemsSummary data={recoveryAnalysis} />
    </div>
  );
};

export default LpStockLossReport;
