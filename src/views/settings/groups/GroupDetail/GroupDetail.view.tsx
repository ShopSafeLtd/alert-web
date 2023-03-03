import React from 'react';
import { GroupQuery } from 'graphql/generated';
import { Button, PageHeader, Card, Table, Drawer } from 'antd';
import EditGroup from 'components/form-components/group/EditGroup';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';

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
          disabled={saving}
          onClick={toggleEditGroup}
          icon={
            <FontAwesomeIcon
              size="lg"
              icon={faPenToSquare}
              style={{ marginRight: 5 }}
            />
          }
        >
          Edit Group
        </Button>,
        <Button
          key="1"
          disabled={saving}
          onClick={deleteConfirm}
          icon={
            <FontAwesomeIcon
              size="lg"
              icon={faTrash}
              style={{ marginRight: 5 }}
            />
          }
        >
          Delete Group
        </Button>,
      ]}
    />
    <Card>
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
              <Link to={`/app/scheme-settings/users/view/${record.key}`}>
                {value}
              </Link>
            ),
          },
          {
            key: 'business',
            title: 'Business',
            dataIndex: 'business',
          },
        ]}
        dataSource={data?.group?.users.map((user) => ({
          key: user.id,
          name: user.fullName,
          business: user.businesses[0]?.name,
        }))}
      />

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
