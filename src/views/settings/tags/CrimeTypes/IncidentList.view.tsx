import React from 'react';
import { Table, Row, Col, Input, Drawer, Button, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CreateTagMutation, TagsQuery } from 'graphql/generated';
import AddIncident from 'components/form-components/tags/crimeTypes/AddIncident';
import EditIncident from 'components/form-components/tags/crimeTypes/EditIncident';

import { MutationUpdaterFn } from '@apollo/client';

interface Props {
  data: TagsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addIncident: boolean;
  toggleAddIncident: () => void;
  updateIncidentList: MutationUpdaterFn<CreateTagMutation>;
  incidentId: string;
  setIncidentId: (value: string) => void;
  editIncident: boolean;
  toggleEditIncident: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
}

const IncidentList = ({
  data,
  loading,
  search,
  setSearch,
  editIncident,
  toggleEditIncident,
  addIncident,
  toggleAddIncident,
  updateIncidentList,
  incidentId,
  setIncidentId,
  saving,
  deleteConfirm,
}: Props): JSX.Element => (
  <div className="list-view">
    <Row gutter={8} style={{ marginBottom: 10 }}>
      <Col span={8}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for an Incident..."
          allowClear
        />
      </Col>
      <Col flex={1} />
      <Col>
        <Button type="primary" onClick={toggleAddIncident}>
          Add
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
          width: 300,
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
          key: 'edit',
          title: 'Edit',
          dataIndex: 'edit',
          width: 60,
          render: (value, record) => (
            <Button
              disabled={saving}
              onClick={() => {
                setIncidentId(record.key);
                toggleEditIncident();
              }}
              icon={<EditOutlined />}
            />
          ),
        },
        {
          key: 'delete',
          title: 'Delete',
          dataIndex: 'delete',
          width: 60,
          render: (value, record) => (
            <Button
              disabled={saving}
              onClick={() => {
                deleteConfirm(record.key);
              }}
              icon={<DeleteOutlined />}
            />
          ),
        },
      ]}
      dataSource={data?.tags.map((tag) => ({
        key: tag.id,
        name: tag.name,
        description: tag.description,
      }))}
    />

    <Drawer
      title="Add Crime Types"
      visible={addIncident}
      width="400"
      onClose={toggleAddIncident}
    >
      {addIncident ? (
        <AddIncident update={updateIncidentList} onClose={toggleAddIncident} />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Edit Crime Types"
      visible={editIncident}
      width="400"
      onClose={toggleEditIncident}
    >
      <EditIncident incidentId={incidentId} onClose={toggleEditIncident} />
    </Drawer>
  </div>
);

export default IncidentList;
