import {
  type GeographicalFilter,
  GeographicalFilterControl,
} from '#/components/filters/GeographicalFilterControl';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Input,
  Radio,
  Row,
  Select,
} from 'antd';
import CompactSkeletonCard from 'components/offenders/OffenderCard/OffenderSkeletonCard.view';
import PoliceOffenderCard from 'components/police-offenders/PoliceOffenderCard';
import LoadingOverlay from 'components/shared-components/LoadingOverlay/LoadingOverlay';
import { useAtomValue } from 'jotai';
import moment from 'moment';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import type { SharedOffendersFeedQuery } from '../graphql/queries/__generated__/shared-offenders-feed.generated';

interface Props {
  customDateRange: {
    endDate: null | string;
    startDate: null | string;
  };
  data: SharedOffendersFeedQuery | undefined;
  dateFilter: '3months' | '6months' | '30days' | 'all' | 'custom';
  fetchMoreScroll: () => void;
  geographicalFilter: GeographicalFilter | undefined;
  hasImageFilter: 'all' | 'false' | 'true';
  hasNameFilter: 'all' | 'false' | 'true';
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: { src: string }[];
  loading: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  priorityFilter: 'all' | 'high' | 'low' | 'medium';
  search: string;
  setCustomDateRange: (range: {
    endDate: null | string;
    startDate: null | string;
  }) => void;
  setDateFilter: (
    value: '3months' | '6months' | '30days' | 'all' | 'custom'
  ) => void;
  setGeographicalFilter: (filter: GeographicalFilter | undefined) => void;
  setHasImageFilter: (value: 'all' | 'false' | 'true') => void;
  setHasNameFilter: (value: 'all' | 'false' | 'true') => void;
  setLightBoxOpen: (state: { index: number; open: boolean }) => void;
  setPriorityFilter: (value: 'all' | 'high' | 'low' | 'medium') => void;
  setSearch: (value: string) => void;
  setSortBy: (value: ('incidents' | 'priority' | 'recent' | 'value')[]) => void;
  sortBy: ('incidents' | 'priority' | 'recent' | 'value')[];
}

const PoliceOffenderFeed = ({
  customDateRange,
  data,
  dateFilter,
  fetchMoreScroll,
  geographicalFilter,
  hasImageFilter,
  hasNameFilter,
  lightBoxOpen,
  lightboxElements,
  loading,
  openLightbox,
  priorityFilter,
  search,
  setCustomDateRange,
  setDateFilter,
  setGeographicalFilter,
  setHasImageFilter,
  setHasNameFilter,
  setLightBoxOpen,
  setPriorityFilter,
  setSearch,
  setSortBy,
  sortBy,
}: Props): JSX.Element => {
  const intl = useIntl();
  const currentScheme = useAtomValue(currentSchemeAtom);

  const offenders =
    data?.sharedOffenderRelay?.edges?.map((edge) => edge.node) || [];
  const hasNextPage = data?.sharedOffenderRelay?.pageInfo.hasNextPage || false;
  const isLoadingMore = loading && offenders.length > 0;

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 0]}>
        {/* Header - Search + Sort + Filters Inline */}
        <Col span={24} style={{ marginBottom: 16 }}>
          <Row align="middle" gutter={16} wrap={false}>
            {/* Search Bar */}
            <Col flex="0 0 240px">
              <div
                style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}
              >
                {intl.formatMessage({ defaultMessage: 'Search' })}
              </div>
              <Input
                allowClear
                onChange={(e) => setSearch(e.target.value)}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search by name or reference...',
                })}
                size="small"
                value={search}
              />
            </Col>

            {/* Sort Selector */}
            <Col flex="0 0 180px">
              <div
                style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}
              >
                {intl.formatMessage({ defaultMessage: 'Sort By' })}
              </div>
              <Select
                mode="multiple"
                onChange={setSortBy}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select sorting...',
                })}
                size="small"
                style={{ width: '100%' }}
                value={sortBy}
              >
                <Select.Option value="priority">
                  {intl.formatMessage({ defaultMessage: 'Priority' })}
                </Select.Option>
                <Select.Option value="incidents">
                  {intl.formatMessage({ defaultMessage: 'Incidents' })}
                </Select.Option>
                <Select.Option value="value">
                  {intl.formatMessage({ defaultMessage: 'Loss Value' })}
                </Select.Option>
                <Select.Option value="recent">
                  {intl.formatMessage({ defaultMessage: 'Recent' })}
                </Select.Option>
              </Select>
            </Col>

            {/* Filters */}
            <Col flex="auto" style={{ overflow: 'hidden' }}>
              <Row gutter={16} style={{ flexWrap: 'nowrap' }} wrap={false}>
                {/* Date Filter */}
                <Col>
                  <div
                    style={{
                      color: '#666',
                      fontSize: '12px',
                      marginBottom: '4px',
                    }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Last Incident' })}
                  </div>
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      gap: '8px',
                    }}
                  >
                    {dateFilter === 'custom' ? (
                      <>
                        <DatePicker.RangePicker
                          onChange={(dates) => {
                            if (dates && dates[0] && dates[1]) {
                              setCustomDateRange({
                                endDate: dates[1].toISOString(),
                                startDate: dates[0].toISOString(),
                              });
                            } else {
                              setCustomDateRange({
                                endDate: null,
                                startDate: null,
                              });
                            }
                          }}
                          size="small"
                          style={{ width: '240px' }}
                          value={
                            customDateRange.startDate && customDateRange.endDate
                              ? [
                                  moment(customDateRange.startDate),
                                  moment(customDateRange.endDate),
                                ]
                              : null
                          }
                        />
                        <Button
                          onClick={() => {
                            setDateFilter('all');
                            setCustomDateRange({
                              endDate: null,
                              startDate: null,
                            });
                          }}
                          size="small"
                        >
                          {intl.formatMessage({ defaultMessage: 'Cancel' })}
                        </Button>
                      </>
                    ) : (
                      <Radio.Group
                        onChange={(e) =>
                          setDateFilter(
                            e.target.value as
                              | '3months'
                              | '6months'
                              | '30days'
                              | 'all'
                              | 'custom'
                          )
                        }
                        size="small"
                        value={dateFilter}
                      >
                        <Radio.Button value="all">
                          {intl.formatMessage({ defaultMessage: '12 Months' })}
                        </Radio.Button>
                        <Radio.Button value="6months">
                          {intl.formatMessage({ defaultMessage: '6 Months' })}
                        </Radio.Button>
                        <Radio.Button value="3months">
                          {intl.formatMessage({ defaultMessage: '3 Months' })}
                        </Radio.Button>
                        <Radio.Button value="30days">
                          {intl.formatMessage({ defaultMessage: '30 Days' })}
                        </Radio.Button>
                        <Radio.Button value="custom">
                          {intl.formatMessage({ defaultMessage: 'Custom' })}
                        </Radio.Button>
                      </Radio.Group>
                    )}
                  </div>
                </Col>
                {/* Geographical Filter */}
                {currentScheme?.id && (
                  <Col flex="0 0 180px">
                    <div
                      style={{
                        color: '#666',
                        fontSize: '12px',
                        marginBottom: '4px',
                      }}
                    >
                      {intl.formatMessage({ defaultMessage: 'Location' })}
                    </div>
                    <GeographicalFilterControl
                      onChange={setGeographicalFilter}
                      schemeId={currentScheme.id}
                      size="small"
                      value={geographicalFilter}
                    />
                  </Col>
                )}

                {/* Has Image Filter */}
                <Col flex="none">
                  <div
                    style={{
                      color: '#666',
                      fontSize: '12px',
                      marginBottom: '4px',
                    }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Has Image' })}
                  </div>
                  <Radio.Group
                    onChange={(e) =>
                      setHasImageFilter(
                        e.target.value as 'all' | 'false' | 'true'
                      )
                    }
                    size="small"
                    value={hasImageFilter}
                  >
                    <Radio.Button value="all">
                      {intl.formatMessage({ defaultMessage: 'All' })}
                    </Radio.Button>
                    <Radio.Button value="true">
                      {intl.formatMessage({ defaultMessage: 'Yes' })}
                    </Radio.Button>
                    <Radio.Button value="false">
                      {intl.formatMessage({ defaultMessage: 'No' })}
                    </Radio.Button>
                  </Radio.Group>
                </Col>

                {/* Has Name Filter */}
                <Col flex="none">
                  <div
                    style={{
                      color: '#666',
                      fontSize: '12px',
                      marginBottom: '4px',
                    }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Has Name' })}
                  </div>
                  <Radio.Group
                    onChange={(e) =>
                      setHasNameFilter(
                        e.target.value as 'all' | 'false' | 'true'
                      )
                    }
                    size="small"
                    value={hasNameFilter}
                  >
                    <Radio.Button value="all">
                      {intl.formatMessage({ defaultMessage: 'All' })}
                    </Radio.Button>
                    <Radio.Button value="true">
                      {intl.formatMessage({ defaultMessage: 'Yes' })}
                    </Radio.Button>
                    <Radio.Button value="false">
                      {intl.formatMessage({ defaultMessage: 'No' })}
                    </Radio.Button>
                  </Radio.Group>
                </Col>

                {/* Priority Filter */}
                <Col flex="none">
                  <div
                    style={{
                      color: '#666',
                      fontSize: '12px',
                      marginBottom: '4px',
                    }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Priority' })}
                  </div>
                  <Radio.Group
                    onChange={(e) =>
                      setPriorityFilter(
                        e.target.value as 'all' | 'high' | 'low' | 'medium'
                      )
                    }
                    size="small"
                    value={priorityFilter}
                  >
                    <Radio.Button value="all">
                      {intl.formatMessage({ defaultMessage: 'All' })}
                    </Radio.Button>
                    <Radio.Button value="high">
                      {intl.formatMessage({ defaultMessage: 'High' })}
                    </Radio.Button>
                    <Radio.Button value="medium">
                      {intl.formatMessage({ defaultMessage: 'Medium' })}
                    </Radio.Button>
                    <Radio.Button value="low">
                      {intl.formatMessage({ defaultMessage: 'Low' })}
                    </Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        {/* Content */}
        <Col span={24} style={{ overflow: 'hidden' }}>
          {loading && offenders.length === 0 ? (
            <Row gutter={[16, 16]}>
              {Array.from({ length: 12 }).map((_, index) => (
                <Col
                  key={index}
                  lg={24}
                  md={24}
                  sm={24}
                  xl={12}
                  xs={24}
                  xxl={8}
                >
                  <CompactSkeletonCard />
                </Col>
              ))}
            </Row>
          ) : offenders.length === 0 ? (
            <Card>
              <Empty
                description={intl.formatMessage({
                  defaultMessage:
                    'No shared offenders found. Try adjusting your search or filters.',
                })}
              />
            </Card>
          ) : (
            <InfiniteScroll
              dataLength={offenders.length}
              hasMore={hasNextPage}
              loader={<span />}
              next={fetchMoreScroll}
              style={{
                overflow: 'hidden',
                overflowX: 'hidden',
              }}
            >
              <Row gutter={[16, 16]}>
                {offenders.map((offender) => (
                  <Col
                    key={offender.id}
                    lg={24}
                    md={24}
                    sm={24}
                    xl={12}
                    xs={24}
                    xxl={8}
                  >
                    <PoliceOffenderCard
                      openLightbox={openLightbox}
                      sharedOffender={offender}
                    />
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          )}
        </Col>
      </Row>

      {/* Lightbox */}
      <Lightbox
        close={() => setLightBoxOpen({ index: 0, open: false })}
        index={lightBoxOpen.index}
        open={lightBoxOpen.open}
        plugins={[Zoom]}
        slides={lightboxElements}
      />

      {/* Loading More Overlay */}
      <LoadingOverlay visible={isLoadingMore} />
    </div>
  );
};

export default PoliceOffenderFeed;
