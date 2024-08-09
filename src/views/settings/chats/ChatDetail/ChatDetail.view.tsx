import type { ChatQuery } from 'graphql/chat/queries/__generated__/chat.generated';

import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Drawer, PageHeader, Table } from 'antd';
import EditChat from 'components/form-components/chat/EditChat';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

interface Props {
  data: ChatQuery | undefined;
  deleteConfirm: () => void;
  editChat: boolean;
  loading: boolean;
  saving: boolean;
  toggleEditChat: () => void;
}

const ChatDetail = ({
  data,
  deleteConfirm,
  editChat,
  loading,
  saving,
  toggleEditChat,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <PageHeader
        extra={[
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="2"
            onClick={toggleEditChat}
          >
            {intl.formatMessage({
              defaultMessage: 'Edit Chat',
            })}
          </Button>,
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="1"
            onClick={deleteConfirm}
          >
            {intl.formatMessage({
              defaultMessage: 'Delete Chat',
            })}
          </Button>,
        ]}
        onBack={() => window.history.back()}
        subTitle={data?.chat?.description}
        title={data?.chat?.name}
      />
      <Card>
        <Table
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
              render: (value, record) => (
                <Link to={`/app/scheme-settings/users/view/${record.key}`}>
                  {value}
                </Link>
              ),
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
              width: 300,
            },
            {
              dataIndex: 'business',
              key: 'business',
              title: intl.formatMessage({
                defaultMessage: 'Business',
              }),
            },
          ]}
          dataSource={data?.chat?.members
            .map(({ user }) => user)
            .map(({ businesses, fullName, id }) => ({
              business: businesses[0]?.name,
              key: id,
              name: fullName,
            }))}
          loading={loading}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            pageSize: 20,
          }}
          size="small"
        />

        <Drawer
          onClose={toggleEditChat}
          open={editChat}
          title={intl.formatMessage({
            defaultMessage: 'Edit Chat Group Details',
          })}
          width="400"
        >
          {editChat ? <EditChat onClose={toggleEditChat} /> : <div />}
        </Drawer>
      </Card>
    </div>
  );
};

export default ChatDetail;
