import React from 'react';
import {
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
  Input,
  Pagination,
  Row,
  Select,
  Typography,
} from 'antd';
import OffenderCard from 'components/offenders/OffenderCard';
import OffenderSkeletonCard from 'components/offenders/OffenderSkeletonCard/OffenderSkeletonCard.view';
import { OffenderSort } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import { MutationUpdaterFn } from '@apollo/client';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import useStyles from './OffenderFeed.styles';

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
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <div className="feed-container">
      <Affix offsetTop={5}>
        <Card bodyStyle={{ padding: 10 }} style={{ marginBottom: 5 }}>
          <Row align="middle" gutter={16}>
            <Col>
              <Input
                size="small"
                style={{ width: 350 }}
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
                    label: 'Banned',
                    value: 'BANNED',
                  },
                  {
                    label: 'Seeking ID',
                    value: 'ID',
                  },
                  {
                    label: 'Active',
                    value: 'ACTIVE',
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
          {loading
            ? Array.from({ length: 24 }).map((_, index) => (
                <Col
                  style={{ marginBottom: 10 }}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={8}
                  xxl={6}
                >
                  <OffenderSkeletonCard />
                </Col>
              ))
            : data?.listOffenders?.offenders?.map((item) => (
                <Col
                  style={{ marginBottom: 10 }}
                  sm={24}
                  md={12}
                  lg={12}
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
              ))}
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
        <Row justify="end">
          <Col>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              Sort Order
            </Typography.Paragraph>
            <Select
              className={classes.select}
              value={order}
              onChange={setOrder}
              size="small"
            >
              <Select.Option value={OffenderSort.updatedAtDesc}>
                Newest First
              </Select.Option>
              <Select.Option value={OffenderSort.updatedAtAsc}>
                Oldest First
              </Select.Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              Groups
            </Typography.Paragraph>
            <Select
              className={classes.select}
              placeholder="Groups"
              mode="multiple"
              size="small"
              maxTagCount={2}
              allowClear
              loading={groupsLoading}
              onChange={setGroupsFilter}
              value={groupsFilter}
            >
              {groups.map((group) => (
                <Select.Option value={group.value}>{group.label}</Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              Offender Warnings
            </Typography.Paragraph>
            <Select
              className={classes.select}
              placeholder="Offender Warnings "
              mode="multiple"
              size="small"
              allowClear
              maxTagCount={2}
              onChange={setWarnings}
              value={warnings}
              loading={tagsLoading}
            >
              {tags.map((tag) => (
                <Select.Option value={tag.value}>{tag.label}</Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Typography.Paragraph className={classes.filtersTitle}>
          Description
        </Typography.Paragraph>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              Ethnicity
            </Typography.Paragraph>
            <Select
              placeholder="Ethnicity"
              className={classes.select}
              mode="multiple"
              allowClear
              value={ethnicity}
              onChange={setEthnicity}
            >
              <Select.Option value={Race.Ic1}>
                IC1 - North European
              </Select.Option>
              <Select.Option value={Race.Ic2}>
                IC2 - South European
              </Select.Option>
              <Select.Option value={Race.Ic3}>IC3 - Black</Select.Option>
              <Select.Option value={Race.Ic4}>IC - South Asian4</Select.Option>
              <Select.Option value={Race.Ic5}>
                IC5 - Southeast Asian
              </Select.Option>
              <Select.Option value={Race.Ic6}>
                IC6 - North African or Arab
              </Select.Option>
              <Select.Option value={Race.Unknown}>Unknown</Select.Option>
            </Select>
          </Col>
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              Build
            </Typography.Paragraph>
            <Select
              mode="multiple"
              allowClear
              placeholder="Build"
              className={classes.select}
              value={build}
              onChange={setBuild}
            >
              <Select.Option value={Build.Small}>Small</Select.Option>
              <Select.Option value={Build.Medium}>Medium</Select.Option>
              <Select.Option value={Build.Large}>Large</Select.Option>
              <Select.Option value={Build.Unknown}>Unknown</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              Age
            </Typography.Paragraph>
            <Select
              mode="multiple"
              allowClear
              placeholder="Age"
              className={classes.select}
              value={age}
              onChange={setAge}
            >
              <Select.Option value={Age.UnderEighteen}>Under 18</Select.Option>
              <Select.Option value={Age.EighteenThirty}>18 - 30</Select.Option>
              <Select.Option value={Age.ThirtyForty}>30 - 40</Select.Option>
              <Select.Option value={Age.FortyFifty}>40 - 50</Select.Option>
              <Select.Option value={Age.FiftySixty}>50 - 60</Select.Option>
              <Select.Option value={Age.SixtySeventy}>60 - 70</Select.Option>
              <Select.Option value={Age.SeventyEighty}>70 - 80</Select.Option>
              <Select.Option value={Age.OverEighty}>Over 80</Select.Option>
              <Select.Option value={Age.Unknown}>Unknown</Select.Option>
            </Select>
          </Col>
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              Sex
            </Typography.Paragraph>
            <Select
              mode="multiple"
              allowClear
              placeholder="Sex"
              className={classes.select}
              value={sex}
              onChange={setSex}
            >
              <Select.Option value={Gender.Female}>Female</Select.Option>
              <Select.Option value={Gender.Male}>Male</Select.Option>
              <Select.Option value={Gender.Unknown}>Unknown</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              Hair
            </Typography.Paragraph>
            <Input.TextArea
              value={hair}
              onChange={(e) => setHair(e.target.value)}
              className={classes.select}
            />
          </Col>
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              Peculiarities
            </Typography.Paragraph>
            <Input.TextArea
              value={peculiarities}
              onChange={(e) => setPeculiarities(e.target.value)}
              className={classes.select}
            />
          </Col>
        </Row>
        <Typography.Paragraph className={classes.filtersTitle}>
          Incidents
        </Typography.Paragraph>
        <Row gutter={16}>
          <Col span={24}>
            <Typography.Paragraph className={classes.selectTitle}>
              Offender has incidents at...
            </Typography.Paragraph>
            <Select
              mode="multiple"
              allowClear
              placeholder="Select Businesses"
              className={classes.select}
              value={businesses}
              onChange={setBusinesses}
              optionLabelProp="textLabel"
              options={businessData?.listBusinesses.businesses.map((item) => ({
                textLabel: item.name,
                label: (
                  <div style={{ display: 'inline-block' }} key={item.id}>
                    <Typography.Text>{item.name}</Typography.Text>
                    <div>
                      <Typography.Text>
                        {item.locations[0].full}
                      </Typography.Text>
                    </div>
                  </div>
                ),
                value: item.id,
              }))}
            />
          </Col>
        </Row>
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
      />
    </div>
  );
};

export default OffenderFeed;
