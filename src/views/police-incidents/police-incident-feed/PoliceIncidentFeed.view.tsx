import {
  type GeographicalFilter,
  GeographicalFilterControl,
} from '#/components/filters/GeographicalFilterControl';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { faGrid, faGrid2, faSearch } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Empty, Input, Row, Tooltip } from 'antd';
import PoliceIncidentCard from 'components/police-incidents/PoliceIncidentCard';
import LoadingOverlay from 'components/shared-components/LoadingOverlay/LoadingOverlay';
import { useAtomValue } from 'jotai';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import type { SharedIncidentsFeedQuery } from '../graphql/queries/__generated__/shared-incidents-feed.generated';

interface Props {
  compactView: boolean;
  data: SharedIncidentsFeedQuery | undefined;
  fetchMoreScroll: () => void;
  geographicalFilter: GeographicalFilter | undefined;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: { src: string }[];
  loading: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  search: string;
  setCompactView: () => void;
  setGeographicalFilter: (filter: GeographicalFilter | undefined) => void;
  setSearch: (value: string) => void;
  setTableView: () => void;
}

const PoliceIncidentFeed = ({
  compactView,
  data,
  fetchMoreScroll,
  geographicalFilter,
  lightBoxOpen,
  lightboxElements,
  loading,
  openLightbox,
  search,
  setCompactView,
  setGeographicalFilter,
  setSearch,
  setTableView,
}: Props): JSX.Element => {
  const intl = useIntl();
  const currentScheme = useAtomValue(currentSchemeAtom);

  const incidents =
    data?.sharedIncidentRelay?.edges?.map((edge) => edge.node) || [];
  const hasNextPage = data?.sharedIncidentRelay?.pageInfo.hasNextPage || false;
  const isLoadingMore = loading && incidents.length > 0;

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
                  defaultMessage:
                    'Search by subject, reference, business, or location...',
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

        {/* Geographical Filter */}
        {currentScheme?.id && (
          <Col span={24} style={{ marginBottom: 16 }}>
            <GeographicalFilterControl
              onChange={setGeographicalFilter}
              schemeId={currentScheme.id}
              value={geographicalFilter}
            />
          </Col>
        )}

        {/* Content */}
        <Col span={24}>
          {loading && incidents.length === 0 ? (
            <Row gutter={[16, 16]}>
              {Array.from({ length: compactView ? 12 : 6 }).map((_, index) => (
                <Col
                  key={index}
                  lg={8}
                  md={12}
                  span={24}
                  xl={6}
                  xs={24}
                  xxl={compactView ? 6 : 4}
                >
                  <Card loading />
                </Col>
              ))}
            </Row>
          ) : incidents.length === 0 ? (
            <Card>
              <Empty
                description={intl.formatMessage({
                  defaultMessage:
                    'No shared incidents found. Try adjusting your search or filters.',
                })}
              />
            </Card>
          ) : (
            <InfiniteScroll
              dataLength={incidents.length}
              hasMore={hasNextPage}
              loader={<span />}
              next={fetchMoreScroll}
              style={{
                overflowX: 'hidden',
              }}
            >
              <Row gutter={[16, 16]}>
                {incidents.map((incident) =>
                  compactView ? (
                    <Col
                      key={incident.id}
                      lg={8}
                      md={12}
                      span={24}
                      xl={6}
                      xs={24}
                    >
                      <PoliceIncidentCard
                        compactView
                        openLightbox={openLightbox}
                        sharedIncident={incident}
                      />
                    </Col>
                  ) : (
                    <Col
                      key={incident.id}
                      lg={8}
                      md={12}
                      span={24}
                      xl={6}
                      xxl={4}
                    >
                      <PoliceIncidentCard
                        compactView={false}
                        openLightbox={openLightbox}
                        sharedIncident={incident}
                      />
                    </Col>
                  )
                )}
              </Row>
            </InfiniteScroll>
          )}
        </Col>
      </Row>

      {/* Lightbox */}
      <Lightbox
        close={() =>
          lightBoxOpen.open &&
          React.createElement('div', {
            onClick: () => lightBoxOpen.open && console.log('close'),
          })
        }
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

export default PoliceIncidentFeed;
