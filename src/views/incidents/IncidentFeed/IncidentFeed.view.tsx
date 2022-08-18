import React from 'react';
import { ListIncidentsQuery, RecycleIncidentMutation } from 'graphql/generated';
import { Col, Input, Row, Select, Pagination, Button } from 'antd';
import IncidentCard from 'components/incidents/IncidentCard';
import IncidentSkeletonCard from 'components/incidents/IncidentSkeletonCard';
import { SRLWrapper } from 'simple-react-lightbox';
import { IncidentSort } from 'state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { MutationUpdaterFn } from '@apollo/client';

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
  setOrder: (value: IncidentSort) => void;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onGroupsChange: (groups: string[]) => void;
  variables: {
    groups: string[];
    crimeTypes: string[];
  };
  crimeTypes: { value: string; label: string }[];
  onCrimeTypesChange: (crimeTypes: string[]) => void;
  tagsLoading: boolean;
  updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  onNavigate: () => void;
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
              style={{ marginRight: 10 }}
            />
          }
        >
          Add Incident
        </Button>
      </Col>
    </Row>

    <Row gutter={8}>
      {loading && !data?.listIncidents?.incidents
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

    <SRLWrapper
      elements={lightboxElements}
      options={{ buttons: { showDownloadButton: false } }}
    />
  </div>
);

export default IncidentFeed;
