import React from 'react';
import { Table, Row, Col, Input, Drawer, Button } from 'antd';
import { CreateChatMutation, SchemeChatsQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';
import AddChat from 'components/form-components/chat/AddChat';
import { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

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
}: Props): JSX.Element => (
  <div className="list-view">
    <Row gutter={8} style={{ marginBottom: 10 }}>
      <Col span={8}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for a chat group..."
          allowClear
        />
      </Col>
      <Col flex={1} />
      <Col>
        <Button
          type="primary"
          onClick={toggleAddChat}
          icon={
            <FontAwesomeIcon
              icon={faPlus}
              size="lg"
              style={{ marginRight: 5 }}
            />
          }
        >
          Create New Chat
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
            <Link to={`/app/scheme-settings/chat-groups/view/${record.key}`}>
              {value}
            </Link>
          ),
        },
        {
          key: 'description',
          title: 'description',
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
      title="Create A New Chat"
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

export default ChatList;
