import { useListBusinessesQuery } from '#/graphql/businesses/queries/__generated__/list-businesses.generated';
import {
  currentSchemeBusinessesAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { SwapOutlined } from '@ant-design/icons';
import { Col, Result, Row, Select, Space, Typography } from 'antd';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import ActionItems from './components/ActionItems/ActionItems';
import ActiveBans from './components/ActiveBans/ActiveBans';
import CrimePatterns from './components/CrimePatterns/CrimePatterns';
import LocalAreaContext from './components/LocalAreaContext/LocalAreaContext';
import OffenderWatchlist from './components/OffenderWatchlist/OffenderWatchlist';
import RecentIncidents from './components/RecentIncidents/RecentIncidents';
import StoreSummary from './components/StoreSummary/StoreSummary';
import WatchlistInsights from './components/WatchlistInsights/WatchlistInsights';
import { useStoreColleagueDashboard } from './hooks/useStoreColleagueDashboard';

const STORAGE_KEY = 'storeColleagueDashboard.businessId';

const StoreColleagueDashboard: React.FC = () => {
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const defaultBusinessId = useAtomValue(currentSchemeBusinessesAtom)?.at(
    0
  )?.id;

  const [selectedBusinessId, setSelectedBusinessId] = useState<
    string | undefined
  >(() => localStorage.getItem(STORAGE_KEY) ?? undefined);

  // Admin mode: user has no business attached to their account
  const isAdminMode = !defaultBusinessId;

  const handleSelectBusiness = (value: string) => {
    localStorage.setItem(STORAGE_KEY, value);
    setSelectedBusinessId(value);
  };

  const {
    actionItems,
    activeBans,
    businessId,
    crimePatterns,
    error,
    loading,
    localAreaContext,
    offenderWatchlist,
    recentIncidents,
    refetch,
    summary,
    watchlistInsights,
  } = useStoreColleagueDashboard(selectedBusinessId);

  // Fetch businesses for the selector — only in admin mode
  const { data: businessesData, loading: businessesLoading } =
    useListBusinessesQuery({
      fetchPolicy: 'cache-and-network',
      skip: !isAdminMode,
      variables: {
        orderBy: [{ name: SortOrder.Asc }],
        take: 200,
        where: { schemes: { some: { id: { equals: schemeId } } } },
      },
    });

  const businessOptions = (businessesData?.listBusinesses.businesses ?? []).map(
    (b) => ({
      label: b.name,
      value: b.id,
    })
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
            defaultMessage: 'Unable to load dashboard data',
          })}
        />
      </div>
    );
  }

  if (!businessId) {
    return (
      <div
        className="page-container"
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 400,
          padding: 24,
        }}
      >
        <Typography.Title level={4}>
          {intl.formatMessage({ defaultMessage: 'Select a store' })}
        </Typography.Title>
        <Typography.Text style={{ marginBottom: 16 }} type="secondary">
          {intl.formatMessage({
            defaultMessage: 'Choose a store to view its dashboard.',
          })}
        </Typography.Text>
        <Select
          filterOption={(input, option) =>
            (option?.label as string)
              ?.toLowerCase()
              .includes(input.toLowerCase())
          }
          loading={businessesLoading}
          onChange={handleSelectBusiness}
          options={businessOptions}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search stores...',
          })}
          showSearch
          style={{ width: 320 }}
        />
      </div>
    );
  }

  const selectedBusinessName = businessOptions.find(
    (o) => o.value === businessId
  )?.label;

  return (
    <div className="page-container" style={{ padding: 24 }}>
      {isAdminMode && (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: 8,
            marginBottom: 16,
          }}
        >
          <Typography.Text type="secondary">
            {intl.formatMessage({ defaultMessage: 'Viewing:' })}
          </Typography.Text>
          <Space>
            <Select
              filterOption={(input, option) =>
                (option?.label as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
              loading={businessesLoading}
              onChange={handleSelectBusiness}
              options={businessOptions}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search stores...',
              })}
              showSearch
              style={{ width: 260 }}
              suffixIcon={<SwapOutlined />}
              value={selectedBusinessName ?? businessId}
            />
          </Space>
        </div>
      )}

      {/* KPI Strip */}
      <StoreSummary loading={loading} summary={summary} />

      {/* Watchlist + Insights */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col lg={14} xs={24} xxl={16}>
          <OffenderWatchlist loading={loading} offenders={offenderWatchlist} />
        </Col>
        <Col lg={10} xs={24} xxl={8}>
          <WatchlistInsights insights={watchlistInsights} loading={loading} />
        </Col>
      </Row>

      {/* Active Bans + Recent Incidents */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col lg={12} xs={24}>
          <ActiveBans bans={activeBans} loading={loading} />
        </Col>
        <Col lg={12} xs={24}>
          <RecentIncidents incidents={recentIncidents} loading={loading} />
        </Col>
      </Row>

      {/* Crime Patterns + Local Area Context */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col lg={localAreaContext || loading ? 12 : 24} xs={24}>
          <CrimePatterns data={crimePatterns} loading={loading} />
        </Col>
        {(localAreaContext || loading) && (
          <Col lg={12} xs={24}>
            <LocalAreaContext context={localAreaContext} loading={loading} />
          </Col>
        )}
      </Row>

      {/* Action Items — full width */}
      <ActionItems actionItems={actionItems} loading={loading} />
    </div>
  );
};

export default StoreColleagueDashboard;
