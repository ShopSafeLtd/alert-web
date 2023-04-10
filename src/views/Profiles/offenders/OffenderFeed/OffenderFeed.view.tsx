import React from 'react';
import type {
  Age,
  Build,
  Gender,
  ListOffendersQuery,
  Race,
  RecycleOffenderMutation,
  SearchBusinessesQuery,
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
import OffenderCard from 'components/offenders/OffenderCard';
import OffenderSkeletonCard from 'components/offenders/OffenderSkeletonCard/OffenderSkeletonCard.view';
import type { OffenderSort } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import type { MutationUpdaterFn } from '@apollo/client';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import OffenderFilter from 'components/offenders/OffenderFilter';
// import useStyles from './OffenderFeed.styles';

interface Props {
  data: ListOffendersQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  order: OffenderSort;
  setOrder: (value: OffenderSort) => void;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation>;
  onNavigate: () => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  sortFilter: boolean;
  toggleSortFilter: () => void;
  ethnicity: Race[];
  setEthnicity: (value: Race[]) => void;
  age: Age[];
  setAge: (value: Age[]) => void;
  build: Build[];
  setBuild: (value: Build[]) => void;
  sex: Gender[];
  setSex: (value: Gender[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  hair: string;
  peculiarities: string;
  clearFilters: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  warnings: string[];
  setWarnings: (value: string[]) => void;
  businesses: string[];
  setBusinesses: (value: string[]) => void;
  businessData: SearchBusinessesQuery | undefined;
  businessesLoading: boolean;
}

const OffenderFeed = ({
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
  tags,
  updateOffenderList,
  tagsLoading,
  onNavigate,
  lightBoxOpen,
  sortFilter,
  toggleSortFilter,
  age,
  build,
  clearFilters,
  ethnicity,
  gallery,
  groupsFilter,
  hair,
  peculiarities,
  setAge,
  setBuild,
  setEthnicity,
  setGallery,
  setGroupsFilter,
  setHair,
  setPeculiarities,
  setSex,
  setWarnings,
  sex,
  warnings,
  businessData,
  businesses,
  setBusinesses,
  businessesLoading,
}: Props): JSX.Element => (
  <div className="feed-container">
    <Affix offsetTop={5}>
      <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 5 }}>
        <Row align="middle" gutter={16}>
          <Col span={4} xxl={6}>
            <Input
              size="small"
              placeholder="Search Offenders..."
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
                  label: 'Banned',
                  value: 'BANNED',
                },
                {
                  label: 'Seeking ID',
                  value: 'ID',
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
              Add Offender
            </Button>
          </Col>
        </Row>
      </Card>
    </Affix>

    <div style={{ paddingBottom: 10 }}>
      <Row gutter={8}>
        {loading ? (
          Array.from({ length: 24 }).map((_, index) => (
            <Col
              style={{ marginBottom: 10 }}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              xxl={6}
            >
              <OffenderSkeletonCard />
            </Col>
          ))
        ) : data?.listOffenders?.total ? (
          data?.listOffenders?.offenders?.map((item) => (
            <Col
              style={{ marginBottom: 10 }}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              xxl={6}
              key={item?.id}
            >
              <OffenderCard
                offender={item}
                openLightbox={openLightbox}
                update={updateOffenderList}
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
            <Empty description="No Offenders" />
          </div>
        )}
      </Row>

      <Row justify="center">
        <Col>
          <Pagination
            total={data?.listOffenders?.total}
            pageSizeOptions={pagination.sizeOptions}
            pageSize={pagination.pageSize}
            current={pagination.page}
            onChange={onPaginationChange}
            showTotal={(total) => `Total Offenders: ${total}`}
            hideOnSinglePage
          />
        </Col>
      </Row>
    </div>

    <Drawer
      title="Offender Filters"
      visible={sortFilter}
      onClose={toggleSortFilter}
      width={500}
    >
      <OffenderFilter
        order={order}
        setOrder={setOrder}
        groups={groups}
        groupsLoading={groupsLoading}
        tags={tags}
        tagsLoading={tagsLoading}
        age={age}
        build={build}
        clearFilters={clearFilters}
        ethnicity={ethnicity}
        groupsFilter={groupsFilter}
        hair={hair}
        peculiarities={peculiarities}
        setAge={setAge}
        setBuild={setBuild}
        setEthnicity={setEthnicity}
        setGroupsFilter={setGroupsFilter}
        setHair={setHair}
        setPeculiarities={setPeculiarities}
        setSex={setSex}
        setWarnings={setWarnings}
        sex={sex}
        warnings={warnings}
        businessData={businessData}
        businesses={businesses}
        setBusinesses={setBusinesses}
        businessesLoading={businessesLoading}
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

export default OffenderFeed;
