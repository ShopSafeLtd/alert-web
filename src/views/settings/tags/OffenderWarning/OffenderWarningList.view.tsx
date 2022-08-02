import React from 'react';
import { Table, Row, Col, Input, Drawer, Button, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CreateTagMutation, TagsQuery } from 'graphql/generated';
import AddOffender from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';
import EditOffender from 'components/form-components/tags/offenderWarnings/EditOffenderWarning';

import { MutationUpdaterFn } from '@apollo/client';

interface Props {
  data: TagsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addOffender: boolean;
  toggleAddOffender: () => void;
  updateOffenderWarningList: MutationUpdaterFn<CreateTagMutation>;
  offenderId: string;
  setOffenderId: (value: string) => void;
  editOffender: boolean;
  toggleEditOffender: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
}

const OffenderWarningList = ({
  data,
  loading,
  search,
  setSearch,
  editOffender,
  toggleEditOffender,
  addOffender,
  toggleAddOffender,
  updateOffenderWarningList,
  offenderId,
  setOffenderId,
  saving,
  deleteConfirm,
}: Props): JSX.Element => (
  <div className="list-view">
    <Row gutter={8} style={{ marginBottom: 10 }}>
      <Col span={8}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for an Offender..."
          allowClear
        />
      </Col>
      <Col flex={1} />
      <Col>
        <Button type="primary" onClick={toggleAddOffender}>
          Add
        </Button>
      </Col>
    </Row>
    <Table
      size="small"
      style={{ marginRight: 10 }}
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
                setOffenderId(record.key);
                toggleEditOffender();
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
          title: 'Options',
          dataIndex: 'Options',
          width: 100,
          render: (value, record) => (
            <>
              <Button
                disabled={saving}
                onClick={() => {
                  setOffenderId(record.key);
                  toggleEditOffender();
                }}
                icon={<EditOutlined />}
              />
              <Button
                disabled={saving}
                onClick={() => {
                  deleteConfirm(record.key);
                }}
                icon={<DeleteOutlined />}
              />
            </>
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
      title="Add Offender Warning"
      visible={addOffender}
      width="400"
      onClose={toggleAddOffender}
    >
      {addOffender ? (
        <AddOffender
          update={updateOffenderWarningList}
          onClose={toggleAddOffender}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Edit Offender Warning"
      visible={editOffender}
      width="400"
      onClose={toggleEditOffender}
    >
      <EditOffender offenderId={offenderId} onClose={toggleEditOffender} />
    </Drawer>
  </div>
);

export default OffenderWarningList;
