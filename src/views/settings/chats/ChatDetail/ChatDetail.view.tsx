import React from 'react';

import { Button, Card, Drawer, PageHeader, Table } from 'antd';
import EditChat from 'components/form-components/chat/EditChat';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import type { ChatQuery } from 'graphql/chat/queries/chat.generated';

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
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={data?.chat?.name}
        subTitle={data?.chat?.description}
        extra={[
          <Button
            key="2"
            disabled={saving}
            onClick={toggleEditChat}
            icon={
              <FontAwesomeIcon
                size="lg"
                icon={faPenToSquare}
                style={{ marginRight: 5 }}
              />
            }
          >
            {intl.formatMessage({
              defaultMessage: 'Edit Chat',
            })}
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
            {intl.formatMessage({
              defaultMessage: 'Delete Chat',
            })}
          </Button>,
        ]}
      />
      <Card>
        <Table
          size="small"
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 20,
            pageSize: 20,
          }}
          columns={[
            {
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
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
              title: intl.formatMessage({
                defaultMessage: 'Business',
              }),
              dataIndex: 'business',
            },
          ]}
          dataSource={data?.chat?.members
            .map(({ user }) => user)
            .map(({ id, fullName, businesses }) => ({
              key: id,
              name: fullName,
              business: businesses[0]?.name,
            }))}
        />

        <Drawer
          title={intl.formatMessage({
            defaultMessage: 'Edit Chat Group Details',
          })}
          open={editChat}
          width="400"
          onClose={toggleEditChat}
        >
          {editChat ? <EditChat onClose={toggleEditChat} /> : <div />}
        </Drawer>
      </Card>
    </div>
  );
};

export default ChatDetail;
