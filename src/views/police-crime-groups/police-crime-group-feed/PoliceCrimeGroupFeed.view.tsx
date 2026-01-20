import { faGrid, faGrid2, faSearch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Empty, Input, Row, Tooltip } from 'antd';
import CompactSkeletonCard from 'components/offenders/OffenderCard/OffenderSkeletonCard.view';
import OffenderSkeletonCard from 'components/offenders/OffenderSkeletonCard/OffenderSkeletonCard.view';
import PoliceCrimeGroupCard from 'components/police-crime-groups/PoliceCrimeGroupCard';
import LoadingOverlay from 'components/shared-components/LoadingOverlay/LoadingOverlay';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';

import type { SharedCrimeGroupsFeedQuery } from '../graphql/queries/__generated__/shared-crime-groups-feed.generated';

interface Props {
  compactView: boolean;
  data: SharedCrimeGroupsFeedQuery | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  search: string;
  setCompactView: () => void;
  setSearch: (value: string) => void;
  setTableView: () => void;
}

const PoliceCrimeGroupFeed = ({
  compactView,
  data,
  fetchMoreScroll,
  loading,
  search,
  setCompactView,
  setSearch,
  setTableView,
}: Props): JSX.Element => {
  const intl = useIntl();

  const crimeGroups =
    data?.sharedCrimeGroupRelay?.edges?.map((edge) => edge.node) || [];
  const hasNextPage =
    data?.sharedCrimeGroupRelay?.pageInfo.hasNextPage || false;
  const isLoadingMore = loading && crimeGroups.length > 0;

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {/* Header */}
        <Col span={24}>
          <Row align="middle" gutter={16} justify="space-between">
            <Col flex="auto">
              <Input
                allowClear
                onChange={(e) => setSearch(e.target.value)}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search by alias, ref, or reference...',
                })}
                prefix={<FontAwesomeIcon icon={faSearch} />}
                size="large"
                value={search}
              />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Compact View',
                })}
              >
                <Button
                  icon={<FontAwesomeIcon icon={faGrid} />}
                  onClick={setCompactView}
                  size="large"
                  type={compactView ? 'primary' : 'default'}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Card View',
                })}
              >
                <Button
                  icon={<FontAwesomeIcon icon={faGrid2} />}
                  onClick={setTableView}
                  size="large"
                  type={compactView ? 'default' : 'primary'}
                />
              </Tooltip>
            </Col>
          </Row>
        </Col>

        {/* Content */}
        <Col span={24}>
          {loading && crimeGroups.length === 0 ? (
            <Row gutter={[16, 16]}>
              {Array.from({ length: compactView ? 12 : 6 }).map((_, index) =>
                compactView ? (
                  <Col key={index} lg={8} md={12} span={24} xl={6} xs={24}>
                    <CompactSkeletonCard />
                  </Col>
                ) : (
                  <Col key={index} lg={8} md={12} span={24} xl={6} xxl={4}>
                    <OffenderSkeletonCard />
                  </Col>
                )
              )}
            </Row>
          ) : crimeGroups.length === 0 ? (
            <Card>
              <Empty
                description={intl.formatMessage({
                  defaultMessage:
                    'No shared crime groups found. Try adjusting your search or filters.',
                })}
              />
            </Card>
          ) : (
            <InfiniteScroll
              dataLength={crimeGroups.length}
              hasMore={hasNextPage}
              loader={<span />}
              next={fetchMoreScroll}
              style={{
                overflowX: 'hidden',
              }}
            >
              <Row gutter={[16, 16]}>
                {crimeGroups.map((crimeGroup) =>
                  compactView ? (
                    <Col
                      key={crimeGroup.id}
                      lg={8}
                      md={12}
                      span={24}
                      xl={6}
                      xs={24}
                    >
                      <PoliceCrimeGroupCard
                        compactView
                        sharedCrimeGroup={crimeGroup}
                      />
                    </Col>
                  ) : (
                    <Col
                      key={crimeGroup.id}
                      lg={8}
                      md={12}
                      span={24}
                      xl={6}
                      xxl={4}
                    >
                      <PoliceCrimeGroupCard sharedCrimeGroup={crimeGroup} />
                    </Col>
                  )
                )}
              </Row>
            </InfiniteScroll>
          )}
        </Col>
      </Row>

      {/* Loading More Overlay */}
      <LoadingOverlay visible={isLoadingMore} />
    </div>
  );
};

export default PoliceCrimeGroupFeed;
