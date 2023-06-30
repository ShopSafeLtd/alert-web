import React from 'react';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import type { CreateChatMutation, SchemeChatsQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';
import AddChat from 'components/form-components/chat/AddChat';
import type { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';

interface Props {
  data: SchemeChatsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addChat: boolean;
  toggleAddChat: () => void;
  updateChatList: MutationUpdaterFn<CreateChatMutation>;
}

const ChatList = ({
  data,
  loading,
  search,
  setSearch,
  addChat,
  toggleAddChat,
  updateChatList,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a chat group...',
              id: 'FbQY8L',
            })}
            allowClear
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            onClick={toggleAddChat}
            type="primary"
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            {intl.formatMessage({
              defaultMessage: 'New Chat Group',
              id: 'bekTqS',
            })}
          </Button>
        </Col>
      </Row>
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
              id: 'HAlOn1',
            }),
            dataIndex: 'name',
            width: 300,
            render: (value, record) => (
              <Link to={`/app/scheme-settings/chat-groups/view/${record.key}`}>
                {value}
              </Link>
            ),
          },
          {
            key: 'description',
            title: intl.formatMessage({
              defaultMessage: 'Description',
              id: 'Q8Qw5B',
            }),
            dataIndex: 'description',
            ellipsis: true,
          },
        ]}
        dataSource={data?.chats.map((chat) => ({
          key: chat.id,
          name: chat.name,
          description: chat.description,
        }))}
      />

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'New Chat Group',
          id: 'bekTqS',
        })}
        visible={addChat}
        width="400"
        onClose={toggleAddChat}
      >
        {addChat ? (
          <AddChat update={updateChatList} onClose={toggleAddChat} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ChatList;
