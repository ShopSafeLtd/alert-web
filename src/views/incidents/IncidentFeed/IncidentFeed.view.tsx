import React from 'react';
import { ListIncidentsQuery, RecycleIncidentMutation } from 'graphql/generated';
import { Affix, Button, Col, Input, Pagination, Row, Select } from 'antd';
import IncidentCard from 'components/incidents/IncidentCard';
import IncidentSkeletonCard from 'components/incidents/IncidentSkeletonCard';
import { IncidentSort } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { MutationUpdaterFn } from '@apollo/client';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

interface Props {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (elements: { src: string }[], index: number) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  order: IncidentSort;
  variables: {
    groups: string[];
    crimeTypes: string[];
  };
  setOrder: (value: IncidentSort) => void;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onGroupsChange: (groups: string[]) => void;

  crimeTypes: { value: string; label: string }[];
  onCrimeTypesChange: (crimeTypes: string[]) => void;
  tagsLoading: boolean;
  updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  onNavigate: () => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
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
  onGroupsChange,
  variables,
  crimeTypes,
  onCrimeTypesChange,
  tagsLoading,
  updateIncidentList,
  lightBoxOpen,
  onNavigate,
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
              placeholder="Crime Types"
              mode="multiple"
              size="small"
              maxTagCount={2}
              style={{ minWidth: 200 }}
              onChange={onCrimeTypesChange}
              value={variables.crimeTypes}
              loading={tagsLoading}
            >
              {crimeTypes.map((crimeType) => (
                <Select.Option value={crimeType.value}>
                  {crimeType.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col flex={1}>
            <Input
              size="small"
              style={{ width: '80%' }}
              placeholder="Search incidents..."
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
              <Select.Option value={IncidentSort.createdAtDesc}>
                Newest First
              </Select.Option>
              <Select.Option value={IncidentSort.createdAtAsc}>
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
              Add Incident
            </Button>
          </Col>
        </Row>
      </Affix>

      <Row gutter={8}>
        {loading
          ? [
              <Col key="0" sm={24} md={12} lg={12} xl={8} xxl={6}>
                <IncidentSkeletonCard />
              </Col>,
              <Col key="1" sm={24} md={12} lg={12} xl={8} xxl={6}>
                <IncidentSkeletonCard />
              </Col>,
              <Col key="2" sm={24} md={12} lg={12} xl={8} xxl={6}>
                <IncidentSkeletonCard />
              </Col>,
              <Col key="3" sm={24} md={12} lg={12} xl={8} xxl={6}>
                <IncidentSkeletonCard />
              </Col>,
              <Col key="4" sm={24} md={12} lg={12} xl={8} xxl={6}>
                <IncidentSkeletonCard />
              </Col>,
              <Col key="5" sm={24} md={12} lg={12} xl={8} xxl={6}>
                <IncidentSkeletonCard />
              </Col>,
            ]
          : data?.listIncidents?.incidents?.map((el) => (
              <Col sm={24} md={12} lg={12} xl={8} xxl={6} key={el?.id}>
                <IncidentCard
                  incident={el}
                  openLightbox={openLightbox}
                  update={updateIncidentList}
                />
              </Col>
            ))}
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
          />
        </Col>
      </Row>

      <Lightbox
        open={lightBoxOpen.open}
        close={() => openLightbox([], 0)}
        plugins={[Zoom]}
        index={lightBoxOpen.index}
        slides={lightboxElements}
      />
    </div>
  );
};

export default IncidentFeed;
