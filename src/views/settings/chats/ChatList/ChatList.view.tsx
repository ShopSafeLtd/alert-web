import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateChatMutation } from 'graphql/chats/mutations/__generated__/create-chat.generated';
import type { SchemeChatsQuery } from 'graphql/chats/queries/__generated__/scheme-chats.generated';

import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import AddChat from 'components/form-components/chat/AddChat';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

interface Props {
  addChat: boolean;
  data: SchemeChatsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  toggleAddChat: () => void;
  updateChatList: MutationUpdaterFn<CreateChatMutation>;
}

const ChatList = ({
  addChat,
  data,
  loading,
  search,
  setSearch,
  toggleAddChat,
  updateChatList,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a chat group...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleAddChat}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'New Chat Group',
            })}
          </Button>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (value, record) => (
              <Link to={`/app/scheme-settings/chat-groups/view/${record.key}`}>
                {value}
              </Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            width: 300,
          },
          {
            dataIndex: 'description',
            ellipsis: true,
            key: 'description',
            title: intl.formatMessage({
              defaultMessage: 'Description',
            }),
          },
        ]}
        dataSource={data?.chats.map((chat) => ({
          description: chat.description,
          key: chat.id,
          name: chat.name,
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
        onClose={toggleAddChat}
        open={addChat}
        title={intl.formatMessage({
          defaultMessage: 'New Chat Group',
        })}
        width="400"
      >
        {addChat ? (
          <AddChat onClose={toggleAddChat} update={updateChatList} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ChatList;
