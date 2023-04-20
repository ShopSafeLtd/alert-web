import React from 'react';
import {
  Table,
  Row,
  Col,
  Input,
  Drawer,
  Button,
  Typography,
  Tooltip,
  Card,
} from 'antd';
import type { CreateTagMutation, TagsQuery } from 'graphql/generated';
import { TagType } from 'graphql/generated';
import AddIncident from 'components/form-components/tags/crimeTypes/AddCrimeType';
import EditIncident from 'components/form-components/tags/crimeTypes/EditCrimeType';

import type { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';

interface Props {
  data: TagsQuery | undefined;
  loading: boolean;
  involvedData: TagsQuery | undefined;
  involvedLoading: boolean;
  impactData: TagsQuery | undefined;
  impactLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addIncident: boolean;
  addInvolved: boolean;
  addImpact: boolean;
  toggleAddIncident: () => void;
  toggleAddInvolved: () => void;
  toggleAddImpact: () => void;
  updateCrimeTypeList: MutationUpdaterFn<CreateTagMutation>;
  updateInvolvedList: MutationUpdaterFn<CreateTagMutation>;
  updateImpactList: MutationUpdaterFn<CreateTagMutation>;
  incidentId: string;
  setIncidentId: (value: string) => void;
  editIncident: boolean;
  toggleEditIncident: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
}

const CrimeTypeList = ({
  data,
  loading,
  search,
  setSearch,
  editIncident,
  toggleEditIncident,
  addIncident,
  toggleAddIncident,
  updateCrimeTypeList,
  incidentId,
  setIncidentId,
  saving,
  deleteConfirm,
  impactData,
  impactLoading,
  involvedData,
  involvedLoading,
  addImpact,
  addInvolved,
  toggleAddImpact,
  toggleAddInvolved,
  updateImpactList,
  updateInvolvedList,
}: Props): JSX.Element => (
  <div className="list-view">
    <Card>
      <Row align="middle" gutter={16} style={{ marginBottom: 10 }}>
        <Col>
          <Typography.Title style={{ margin: 0 }} level={4}>
            Crime Types
          </Typography.Title>
        </Col>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search crime types..."
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            danger
            onClick={toggleAddIncident}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            Add Crime Type
          </Button>
        </Col>
      </Row>
      <Table
        size="small"
        loading={loading}
        pagination={{
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={[
          {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            width: 250,
            render: (value, record) => (
              <Typography.Link
                disabled={saving}
                onClick={() => {
                  setIncidentId(record.key);
                  toggleEditIncident();
                }}
              >
                {value}
              </Typography.Link>
            ),
          },
          {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
            ellipsis: true,
          },
          {
            key: 'Options',
            title: '',
            dataIndex: 'Options',
            width: 100,
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip title="Edit Crime Type">
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        setIncidentId(record.key);
                        toggleEditIncident();
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title="Remove Crime Type">
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        deleteConfirm(record.key);
                      }}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
          },
        ]}
        dataSource={data?.tags.map((tag) => ({
          key: tag.id,
          name: tag.name,
          description: tag.description,
        }))}
      />
    </Card>

    <Card>
      <Row gutter={16} align="middle" style={{ marginBottom: 10 }}>
        <Col>
          <Typography.Title style={{ margin: 0 }} level={4}>
            Involved Tags
          </Typography.Title>
        </Col>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search involved tags..."
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            danger
            onClick={toggleAddInvolved}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            Add Involved Tag
          </Button>
        </Col>
      </Row>
      <Table
        size="small"
        loading={involvedLoading}
        pagination={{
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={[
          {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            width: 250,
            render: (value, record) => (
              <Typography.Link
                disabled={saving}
                onClick={() => {
                  setIncidentId(record.key);
                  toggleEditIncident();
                }}
              >
                {value}
              </Typography.Link>
            ),
          },
          {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
            ellipsis: true,
          },
          {
            key: 'Options',
            title: '',
            dataIndex: 'Options',
            width: 100,
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip title="Edit Crime Type">
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        setIncidentId(record.key);
                        toggleEditIncident();
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title="Remove Crime Type">
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        deleteConfirm(record.key);
                      }}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
          },
        ]}
        dataSource={involvedData?.tags.map((tag) => ({
          key: tag.id,
          name: tag.name,
          description: tag.description,
        }))}
      />
    </Card>

    <Card>
      <Row align="middle" gutter={16} style={{ marginBottom: 10 }}>
        <Col>
          <Typography.Title style={{ margin: 0 }} level={4}>
            Impact Tags
          </Typography.Title>
        </Col>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search impact tags..."
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            danger
            onClick={toggleAddImpact}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            Add Impact Type
          </Button>
        </Col>
      </Row>
      <Table
        size="small"
        loading={impactLoading}
        pagination={{
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={[
          {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            width: 250,
            render: (value, record) => (
              <Typography.Link
                disabled={saving}
                onClick={() => {
                  setIncidentId(record.key);
                  toggleEditIncident();
                }}
              >
                {value}
              </Typography.Link>
            ),
          },
          {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
            ellipsis: true,
          },
          {
            key: 'Options',
            title: '',
            dataIndex: 'Options',
            width: 100,
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip title="Edit Crime Type">
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        setIncidentId(record.key);
                        toggleEditIncident();
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title="Remove Crime Type">
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        deleteConfirm(record.key);
                      }}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
          },
        ]}
        dataSource={impactData?.tags.map((tag) => ({
          key: tag.id,
          name: tag.name,
          description: tag.description,
        }))}
      />
    </Card>

    <Drawer
      title="Add Crime Types"
      visible={addIncident}
      width="400"
      onClose={toggleAddIncident}
    >
      {addIncident ? (
        <AddIncident
          type={TagType.IncidentCrimeType}
          update={updateCrimeTypeList}
          onClose={toggleAddIncident}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add Involved Tag"
      visible={addInvolved}
      width="400"
      onClose={toggleAddInvolved}
    >
      {addInvolved ? (
        <AddIncident
          type={TagType.IncidentInvolved}
          update={updateInvolvedList}
          onClose={toggleAddInvolved}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add Impact Tag"
      visible={addImpact}
      width="400"
      onClose={toggleAddImpact}
    >
      {addImpact ? (
        <AddIncident
          type={TagType.IncidentImpact}
          update={updateImpactList}
          onClose={toggleAddImpact}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Edit Tag"
      visible={editIncident}
      width="400"
      onClose={toggleEditIncident}
    >
      {editIncident && (
        <EditIncident incidentId={incidentId} onClose={toggleEditIncident} />
      )}
    </Drawer>
  </div>
);

export default CrimeTypeList;
