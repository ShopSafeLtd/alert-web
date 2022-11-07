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
} from 'antd';
import { CreateTagMutation, TagsQuery } from 'graphql/generated';
import AddIncident from 'components/form-components/tags/crimeTypes/AddCrimeType';
import EditIncident from 'components/form-components/tags/crimeTypes/EditCrimeType';

import { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';

interface Props {
  data: TagsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addIncident: boolean;
  toggleAddIncident: () => void;
  updateCrimeTypeList: MutationUpdaterFn<CreateTagMutation>;
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
}: Props): JSX.Element => (
  <div className="list-view">
    <Row gutter={8} style={{ marginBottom: 10 }}>
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
          type="primary"
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
                <Tooltip title="Delete Crime Type">
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

    <Drawer
      title="Add Crime Types"
      visible={addIncident}
      width="400"
      onClose={toggleAddIncident}
    >
      {addIncident ? (
        <AddIncident update={updateCrimeTypeList} onClose={toggleAddIncident} />
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

export default CrimeTypeList;
