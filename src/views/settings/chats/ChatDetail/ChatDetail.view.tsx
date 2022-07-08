import React from 'react';
import { ChatQuery } from 'graphql/generated';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { Button, PageHeader, Card, Table, Drawer, Skeleton } from 'antd';
import EditChat from 'components/form-components/chat/EditChat';
import { Link } from 'react-router-dom';

interface Props {
  data: ChatQuery | undefined;
  loading: boolean;
  editChat: boolean;
  toggleEditChat: () => void;
  saving: boolean;
  deleteConfirm: () => void;
}

const ChatDetail = ({
  data,
  loading,
  editChat,
  toggleEditChat,
  saving,
  deleteConfirm,
}: Props): JSX.Element => (
  <div className="list-view">
    <PageHeader
      onBack={() => window.history.back()}
      title={data?.chat?.name}
      subTitle={data?.chat?.description}
      extra={[
        <Button
          key="2"
          type="primary"
          disabled={saving}
          onClick={toggleEditChat}
          icon={<EditOutlined />}
        >
          Edit Chat Group
        </Button>,
        <Button
          key="1"
          disabled={saving}
          onClick={deleteConfirm}
          type="primary"
          icon={<DeleteOutlined />}
        >
          Delete Chat Group
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
          dataSource={data?.chat?.members
            .map(({ user }) => user)
            .map(({ id, fullName, organisation }) => ({
              key: id,
              name: fullName,
              organisation,
            }))}
        />
      )}
      <Drawer
        title="Edit Chat Group Details"
        visible={editChat}
        width="400"
        onClose={toggleEditChat}
      >
        {editChat ? <EditChat onClose={toggleEditChat} /> : <div />}
      </Drawer>
    </Card>
  </div>
);

export default ChatDetail;
