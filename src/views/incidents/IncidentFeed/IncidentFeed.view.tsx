import React from 'react';
import type {
  ListIncidentsQuery,
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
import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../../components/shared-components/AntD/Loading';

interface Props {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  // onPaginationChange: (page: number, pageSize: number) => void;
  // pagination: { page: number; pageSize: number; sizeOptions: string[] };
  order: IncidentSort;
  setOrder: (value: IncidentSort) => void;
  search: string;
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
  peculiarities: string;
  clearFilters: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  crimeTypesFilter: string[];
  setCrimeTypesFilter: (value: string[]) => void;
  goodsFilter: string[];
  goods: { value: string; label: string }[];
  setGoodsFilter: (value: string[]) => void;
  businesses: { value: string; label: string; location: string }[];
  businessesFilter: string[];
  setBusinessesFilter: (value: string[]) => void;
  goodsLoading: boolean;
  businessesLoading: boolean;
  setIncidentDateFilter: (value: DateType | undefined) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  fetchMoreScroll: () => void;
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
  search,
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
  gallery,
  peculiarities,
  setGallery,
  setPeculiarities,
  groupsFilter,
  setGroupsFilter,
  businesses,
  businessesFilter,
  goods,
  goodsFilter,
  setGoodsFilter,
  setBusinessesFilter,
  goodsLoading,
  businessesLoading,
  crimeTypesFilter,
  setCrimeTypesFilter,
  setIncidentDateFilter,
  setCreatedAtFilter,
  fetchMoreScroll,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="feed-container" style={{ padding: 10, paddingRight: 0 }}>
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
              value={search}
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

      <div style={{ paddingBottom: 10 }}>
        {loading ? (
          <Row gutter={[8, 16]}>
            {Array.from({ length: 24 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col key={index} sm={24} md={12} lg={8} xl={8} xxl={6}>
                <IncidentSkeletonCard />
              </Col>
            ))}
          </Row>
        ) : data?.listIncidents?.total ? (
          <InfiniteScroll
            dataLength={data?.listIncidents?.incidents.length}
            next={() => fetchMoreScroll()}
            hasMore={
              data?.listIncidents?.incidents.length < data?.listIncidents?.total
            }
            loader={<Loading />}
            height="calc(100vh - 87px)"
            style={{ overflowX: 'hidden' }}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                <b>-----------</b>
              </p>
            }
          >
            <Row
              gutter={[8, 16]}
              align="stretch"
              style={{
                alignItems: 'stretch',
                padding: 10,
                overflowX: 'hidden',
              }}
            >
              {data?.listIncidents?.incidents?.map((el) => (
                <Col sm={24} md={12} lg={8} xl={8} xxl={6} key={el?.id}>
                  <IncidentCard
                    key={el?.id}
                    incident={el}
                    openLightbox={openLightbox}
                    update={updateIncidentList}
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
        {/* <Row justify="center"> */}
        {/*   <Col> */}
        {/*     <Pagination */}
        {/*       total={data?.listIncidents?.total} */}
        {/*       pageSizeOptions={pagination.sizeOptions} */}
        {/*       pageSize={pagination.pageSize} */}
        {/*       current={pagination.page} */}
        {/*       onChange={onPaginationChange} */}
        {/*       showTotal={(total) => */}
        {/*         intl.formatMessage( */}
        {/*           { defaultMessage: `Total Incidents: {total}`, id: 'SHEopq' }, */}
        {/*           { total } */}
        {/*         ) */}
        {/*       } */}
        {/*       hideOnSinglePage */}
        {/*     /> */}
        {/*   </Col> */}
        {/* </Row> */}
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
          groupsFilter={groupsFilter}
          setGroupsFilter={setGroupsFilter}
          crimeTypes={crimeTypes}
          crimeTypesFilter={crimeTypesFilter}
          tagsLoading={tagsLoading}
          setCrimeTypesFilter={setCrimeTypesFilter}
          clearFilters={clearFilters}
          peculiarities={peculiarities}
          setPeculiarities={setPeculiarities}
          goods={goods}
          setGoodsFilter={setGoodsFilter}
          goodsFilter={goodsFilter}
          businessesFilter={businessesFilter}
          businesses={businesses}
          setBusinessesFilter={setBusinessesFilter}
          goodsLoading={goodsLoading}
          businessesLoading={businessesLoading}
          setIncidentDateFilter={setIncidentDateFilter}
          setCreatedAtFilter={setCreatedAtFilter}
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
