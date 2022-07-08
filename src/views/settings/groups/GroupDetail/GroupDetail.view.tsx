import React from 'react';
import { GroupQuery } from 'graphql/generated';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, PageHeader, Card, Table, Drawer, Skeleton } from 'antd';
import EditGroup from 'components/form-components/group/EditGroup';
import { Link } from 'react-router-dom';

interface Props {
  data: GroupQuery | undefined;
  loading: boolean;
  editGroup: boolean;
  toggleEditGroup: () => void;
  saving: boolean;
  deleteConfirm: () => void;
}

const GroupDetail = ({
  data,
  loading,
  editGroup,
  toggleEditGroup,
  saving,
  deleteConfirm,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader
      onBack={() => window.history.back()}
      title={data?.group?.name}
      subTitle={data?.group?.description}
      extra={[
        <Button
          key="2"
          type="primary"
          disabled={saving}
          onClick={toggleEditGroup}
          icon={<EditOutlined />}
        >
          Edit Group
        </Button>,
        <Button
          key="1"
          disabled={saving}
          onClick={deleteConfirm}
          type="primary"
          icon={<DeleteOutlined />}
        >
          Delete Group
        </Button>,
      ]}
    />
    <Card>
      {loading ? (
        <Skeleton />
      ) : (
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
              render: (value, record) => (
                <Link to={`/app/scheme-settings/users/view/${record.key}`}>
                  {value}
                </Link>
              ),
            },
            {
              key: 'organisation',
              title: 'organisation',
              dataIndex: 'organisation',
            },
          ]}
          dataSource={data?.group?.users.map((user) => ({
            key: user.id,
            name: user.fullName,
            organisation: user.organisation,
          }))}
        />
      )}
      <Drawer
        title="Edit Group Details"
        visible={editGroup}
        width="400"
        onClose={toggleEditGroup}
      >
        {editGroup ? <EditGroup onClose={toggleEditGroup} /> : <div />}
      </Drawer>
    </Card>
  </div>
);
export default GroupDetail;
