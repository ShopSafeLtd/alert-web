import React from 'react';
import type {
  IncidentsFeedQuery,
  RecycleIncidentMutation,
} from 'graphql/generated';
import { Button, Card, Col, Drawer, Empty, Input, Row } from 'antd';
import IncidentCard from 'components/incidents/IncidentCard';
import IncidentSkeletonCard from 'components/incidents/IncidentSkeletonCard';
import type { IncidentSort } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import type { MutationUpdaterFn } from '@apollo/client';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import IncidentFilter from 'components/incidents/IncidentFilter';
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { DateType } from 'types/DataType';
import type { IncidentFilters } from 'state/data-model';
import CheckTag from 'components/form-components/check-tag/CheckTag.view';
import CompactSkeletonCard from 'components/offenders/OffenderCard/OffenderSkeletonCard.view';
import Loading from '../../../components/shared-components/AntD/Loading';

interface Props {
  data: IncidentsFeedQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  order: IncidentSort;
  setOrder: (value: IncidentSort) => void;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  crimeTypes: { value: string; label: string }[];
  tagsLoading: boolean;
  updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  onNavigate: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setPeculiarities: (value: string) => void;
  clearFilters: () => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setCrimeTypesFilter: (value: string[]) => void;
  goods: { value: string; label: string }[];
  setGoodsFilter: (value: string[]) => void;
  businesses: { value: string; label: string; location: string }[];
  setBusinessesFilter: (value: string[]) => void;
  goodsLoading: boolean;
  businessesLoading: boolean;
  setIncidentDateFilter: (value: DateType | undefined) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  fetchMoreScroll: () => void;
  variables: IncidentFilters;
  setCompactView: () => void;
}

const IncidentFeed = ({
  data,
  loading,
  lightboxElements,
  openLightbox,
  // onPaginationChange,
  // pagination,
  order,
  setOrder,
  setSearch,
  groups,
  groupsLoading,
  crimeTypes,
  tagsLoading,
  updateIncidentList,
  lightBoxOpen,
  onNavigate,
  sortFilter,
  toggleSortFilter,
  clearFilters,
  setGallery,
  setPeculiarities,
  setGroupsFilter,
  businesses,
  goods,
  setGoodsFilter,
  setBusinessesFilter,
  goodsLoading,
  businessesLoading,
  setCrimeTypesFilter,
  setIncidentDateFilter,
  setCreatedAtFilter,
  fetchMoreScroll,
  variables,
  setCompactView,
}: Props): JSX.Element => {
  const intl = useIntl();
  const { search, gallery, compactView } = variables;

  return (
    <div
      className="feed-container"
      style={
        loading
          ? { padding: 10, paddingRight: 12 }
          : { padding: 10, paddingRight: 0, paddingBottom: 0 }
      }
    >
      <Card
        bodyStyle={{ padding: 10 }}
        style={{ marginBottom: 5, marginRight: 10 }}
      >
        <Row align="middle" gutter={16}>
          <Col span={8} xxl={6}>
            <Input
              size="small"
              // style={{ width: 350 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search Incidents...',
                id: 'gvqTQ8',
              })}
              value={search || ''}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col flex={1}>
            <CheckTags
              mode="radio"
              value={gallery}
              onChange={setGallery}
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Following',
                    id: 'cPIKU2',
                  }),
                  value: 'FOLLOWING',
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'My Data',
                    id: 'dr0ueW',
                  }),
                  value: 'MYDATA',
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Not Approved',
                    id: 'VwMCyX',
                  }),
                  value: 'NOT APPROVED',
                  needAdminRight: true,
                },
              ]}
            />
          </Col>
          <Col>
            <CheckTag
              option={{
                label: intl.formatMessage({
                  defaultMessage: 'Compact View',
                  id: '9P0/Y7',
                }),
                value: 'Compact',
                tooltip: intl.formatMessage({
                  defaultMessage: 'Present incidents in compact card',
                  id: 'tga/q5',
                }),
              }}
              active={compactView}
              onClick={setCompactView}
            />
            {/* <CheckTags
              mode="radio"
              value={compactView ? ['Compact'] : ['Default']}
              onChange={setCompactView}
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Default Card',
                    id: '1K+0py',
                  }),
                  value: 'Default',
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Compact Card',
                    id: 'O3k0C9',
                  }),
                  value: 'Compact',
                },
              ]}
            /> */}
          </Col>
          <Col>
            <Button
              onClick={toggleSortFilter}
              icon={
                <FontAwesomeIcon
                  icon={faFilter}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              {intl.formatMessage({
                defaultMessage: 'Sort & Filter',
                id: 'f2g3SM',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={onNavigate}
              icon={
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
            >
              {intl.formatMessage({
                defaultMessage: 'Add Incident',
                id: 'kG1p3q',
              })}
            </Button>
          </Col>
        </Row>
      </Card>

      <div>
        {loading ? (
          <Row
            gutter={24}
            align="stretch"
            style={{
              alignItems: 'stretch',
              padding: 10,
              overflowX: 'hidden',
            }}
          >
            {Array.from({ length: compactView ? 48 : 24 }).map((_, index) => (
              <Col
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{ marginBottom: compactView ? 0 : 20 }}
                span={compactView ? 6 : 8}
                xxl={compactView ? 4 : 6}
              >
                {compactView ? (
                  <CompactSkeletonCard />
                ) : (
                  <IncidentSkeletonCard />
                )}
              </Col>
            ))}
          </Row>
        ) : data?.incidentsRelay && data.incidentsRelay.edges.length > 0 ? (
          <InfiniteScroll
            dataLength={data?.incidentsRelay.edges.length}
            next={() => fetchMoreScroll()}
            hasMore={data?.incidentsRelay.pageInfo.hasNextPage}
            loader={<Loading />}
            height="calc(100vh - 78px)"
            style={{ overflowX: 'hidden' }}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <b>-----------</b>
              </p>
            }
          >
            <Row
              gutter={compactView ? 12 : [8, 16]}
              align="stretch"
              style={{
                alignItems: 'stretch',
                padding: 10,
                overflowX: 'hidden',
              }}
            >
              {data.incidentsRelay.edges.map(({ node }) => (
                <Col
                  span={compactView ? 6 : 8}
                  xxl={compactView ? 4 : 6}
                  key={node?.id}
                >
                  <IncidentCard
                    key={node?.id}
                    incident={node}
                    openLightbox={openLightbox}
                    update={updateIncidentList}
                    compactView={compactView}
                  />
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        ) : (
          <Row gutter={8}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                height: 'calc(100vh - 100px)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Empty
                description={
                  search === ''
                    ? intl.formatMessage({
                        defaultMessage: 'No Incidents',
                        id: '+nJOH5',
                      })
                    : intl.formatMessage({
                        defaultMessage:
                          'No incidents match your search criteria',
                        id: '3vA0/l',
                      })
                }
              />
            </div>
          </Row>
        )}
      </div>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Incident Filters',
          id: 'd3tEdR',
        })}
        visible={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <IncidentFilter
          order={order}
          setOrder={setOrder}
          groups={groups}
          groupsLoading={groupsLoading}
          setGroupsFilter={setGroupsFilter}
          crimeTypes={crimeTypes}
          tagsLoading={tagsLoading}
          setCrimeTypesFilter={setCrimeTypesFilter}
          clearFilters={clearFilters}
          setPeculiarities={setPeculiarities}
          goods={goods}
          setGoodsFilter={setGoodsFilter}
          businesses={businesses}
          setBusinessesFilter={setBusinessesFilter}
          goodsLoading={goodsLoading}
          businessesLoading={businessesLoading}
          setIncidentDateFilter={setIncidentDateFilter}
          setCreatedAtFilter={setCreatedAtFilter}
          variables={variables}
        />
      </Drawer>
      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox([], 0)}
        plugins={[Zoom]}
        index={lightBoxOpen.index}
        slides={lightboxElements}
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </div>
  );
};

export default IncidentFeed;
