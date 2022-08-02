import React from 'react';
import { ListOffendersQuery, RecycleOffenderMutation } from 'graphql/generated';
import { Col, Input, Row, Select, Pagination, Button } from 'antd';
import OffenderCard from 'components/offenders/OffenderCard';
import OffenderSkeletonCard from 'components/offenders/OffenderSkeletonCard/OffenderSkeletonCard.view';
import { SRLWrapper } from 'simple-react-lightbox';
import { OffenderSort } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { MutationUpdaterFn } from '@apollo/client';

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
  onGroupsChange: (groups: string[]) => void;
  variables: {
    groups: string[];
    tags: string[];
  };
  tags: { value: string; label: string }[];
  onTagsChange: (tags: string[]) => void;
  tagsLoading: boolean;
  updateOffenderList: MutationUpdaterFn<RecycleOffenderMutation>;
  onNavigate: () => void;
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
  onGroupsChange,
  variables,
  tags,
  onTagsChange,
  updateOffenderList,
  tagsLoading,
  onNavigate,
}: Props): JSX.Element => (
  <div className="feed-container">
    <Row gutter={8} style={{ marginBottom: 10 }}>
      <Col>
        <Select
          placeholder="Groups"
          mode="multiple"
          size="small"
          maxTagCount={2}
          style={{ minWidth: 150 }}
          loading={groupsLoading}
          onChange={onGroupsChange}
          value={variables.groups}
        >
          {groups.map((group) => (
            <Select.Option value={group.value}>{group.label}</Select.Option>
          ))}
        </Select>
      </Col>
      <Col>
        <Select
          placeholder="Offender Warnings "
          mode="multiple"
          size="small"
          maxTagCount={2}
          style={{ minWidth: 200 }}
          onChange={onTagsChange}
          value={variables.tags}
          loading={tagsLoading}
        >
          {tags.map((tag) => (
            <Select.Option value={tag.value}>{tag.label}</Select.Option>
          ))}
        </Select>
      </Col>
      <Col flex={1}>
        <Input
          size="small"
          style={{ width: '80%' }}
          placeholder="Search Offenders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Col>
      <Col>
        <Select
          value={order}
          onChange={setOrder}
          size="small"
          style={{ minWidth: 150 }}
        >
          <Select.Option value={OffenderSort.updatedAtDesc}>
            Newest First
          </Select.Option>
          <Select.Option value={OffenderSort.updatedAtAsc}>
            Oldest First
          </Select.Option>
        </Select>
      </Col>
      {/* <Col>
          <Button size="small">All Options</Button>
        </Col> */}
    </Row>
    <Row gutter={8}>
      {loading && !data?.listOffenders?.offenders
        ? [
            <Col key="0" sm={24} md={12} lg={12} xl={8} xxl={6}>
              <OffenderSkeletonCard />
            </Col>,
            <Col key="1" sm={24} md={12} lg={12} xl={8} xxl={6}>
              <OffenderSkeletonCard />
            </Col>,
            <Col key="2" sm={24} md={12} lg={12} xl={8} xxl={6}>
              <OffenderSkeletonCard />
            </Col>,
            <Col key="3" sm={24} md={12} lg={12} xl={8} xxl={6}>
              <OffenderSkeletonCard />
            </Col>,
            <Col key="4" sm={24} md={12} lg={12} xl={8} xxl={6}>
              <OffenderSkeletonCard />
            </Col>,
            <Col key="5" sm={24} md={12} lg={12} xl={8} xxl={6}>
              <OffenderSkeletonCard />
            </Col>,
          ]
        : data?.listOffenders?.offenders?.map((item) => (
            <Col sm={24} md={12} lg={12} xl={8} xxl={6} key={item?.id}>
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
        />
      </Col>
    </Row>
    <Button
      className="add-button"
      size="large"
      type="primary"
      shape="round"
      onClick={onNavigate}
      icon={
        <FontAwesomeIcon icon={faPlus} size="lg" style={{ marginRight: 10 }} />
      }
    >
      Add Offender
    </Button>
    <SRLWrapper
      elements={lightboxElements}
      options={{ buttons: { showDownloadButton: false } }}
    />
  </div>
);

export default OffenderFeed;
