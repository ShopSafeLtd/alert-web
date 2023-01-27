import React from 'react';
import { ListOffendersQuery, RecycleOffenderMutation } from 'graphql/generated';
import { Affix, Button, Col, Input, Pagination, Row, Select } from 'antd';
import OffenderCard from 'components/offenders/OffenderCard';
import OffenderSkeletonCard from 'components/offenders/OffenderSkeletonCard/OffenderSkeletonCard.view';
import { OffenderSort } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { MutationUpdaterFn } from '@apollo/client';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

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
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
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
  lightBoxOpen,
}: Props): JSX.Element => {
  const [affix, setAffix] = React.useState(false);

  return (
    <div className="feed-container">
      <Affix offsetTop={40} onChange={(affixed) => setAffix(!!affixed)}>
        <Row
          gutter={8}
          style={{
            paddingBottom: 10,
            backgroundColor: !affix ? 'rgb(250, 250, 251)' : 'white',
            paddingTop: affix ? 10 : 0,
            marginRight: -8, // fix for cutoff from container
            marginLeft: -8, // fix for cutoff from container
            borderBottom: affix ? '1px solid #e8e8e8' : 'none',
          }}
        >
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
              style={{ minWidth: 150, marginRight: 5 }}
            >
              <Select.Option value={OffenderSort.updatedAtDesc}>
                Newest First
              </Select.Option>
              <Select.Option value={OffenderSort.updatedAtAsc}>
                Oldest First
              </Select.Option>
            </Select>
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
      </Affix>
      <Row gutter={8}>
        {loading
          ? Array.from({ length: 24 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col key={index} sm={24} md={12} lg={12} xl={8} xxl={6}>
                <OffenderSkeletonCard />
              </Col>
            ))
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
            hideOnSinglePage
          />
        </Col>
      </Row>

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
