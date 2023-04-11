import React from 'react';
import type {
  ListIncidentsQuery,
  RecycleIncidentMutation,
} from 'graphql/generated';
import {
  Affix,
  Button,
  Card,
  Col,
  Drawer,
  Empty,
  Input,
  Pagination,
  Row,
} from 'antd';
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
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
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
}

const IncidentFeed = ({
  data,
  loading,
  lightboxElements,
  openLightbox,
  onPaginationChange,
  pagination,
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
}: Props): JSX.Element => (
  <div className="feed-container" style={{ padding: 10 }}>
    <Affix offsetTop={5}>
      <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 5 }}>
        <Row align="middle" gutter={16}>
          <Col span={4} xxl={6}>
            <Input
              size="small"
              // style={{ width: 350 }}
              placeholder="Search Incidents..."
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
                  label: 'Active',
                  value: 'ACTIVE',
                },
                {
                  label: 'Not Approved',
                  value: 'NOT APPROVED',
                  needAdminRight: true,
                },
                {
                  label: 'Following',
                  value: 'FOLLOWING',
                },
                {
                  label: 'My Data',
                  value: 'MYDATA',
                },

                {
                  label: 'PoliceInvolved',
                  value: 'POLICEINVOLVED',
                },
                // {
                //   label: 'PoliceReported',
                //   value: 'POLICEREPORTED',
                // },
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
              Sort &amp; Filter
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
              Add Incident
            </Button>
          </Col>
        </Row>
      </Card>
    </Affix>

    <div style={{ paddingBottom: 10 }}>
      <Row gutter={8}>
        {loading ? (
          Array.from({ length: 24 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={index} sm={24} md={12} lg={8} xl={8} xxl={6}>
              <IncidentSkeletonCard />
            </Col>
          ))
        ) : data?.listIncidents?.total ? (
          data?.listIncidents?.incidents?.map((el) => (
            <Col sm={24} md={12} lg={8} xl={8} xxl={6} key={el?.id}>
              <IncidentCard
                incident={el}
                openLightbox={openLightbox}
                update={updateIncidentList}
              />
            </Col>
          ))
        ) : (
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
                  ? 'No Incidents'
                  : 'No incidents match your search criteria'
              }
            />
          </div>
        )}
      </Row>
      <Row justify="center">
        <Col>
          <Pagination
            total={data?.listIncidents?.total}
            pageSizeOptions={pagination.sizeOptions}
            pageSize={pagination.pageSize}
            current={pagination.page}
            onChange={onPaginationChange}
            showTotal={(total) => `Total Incidents: ${total}`}
            hideOnSinglePage
          />
        </Col>
      </Row>
    </div>
    <Drawer
      title="Incident Filters"
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
        slide: (slide: WatermarkSlideType) => <WatermarkSlide slide={slide} />,
      }}
    />
  </div>
);

export default IncidentFeed;
