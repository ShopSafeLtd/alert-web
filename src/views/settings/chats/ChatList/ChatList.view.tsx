import { Table, Row, Col, Input, Drawer, Button } from "antd";
import { SchemeChatsQuery } from "graphql/generated";
import { Link } from "react-router-dom";
import AddChatGroup from "components/form-components/chatGroup/AddChatGroup";

interface Props {
  data: SchemeChatsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addChatGroup: boolean;
  toggleAddChatGroup: () => void;
}

const ChatList = ({
  data,
  loading,
  search,
  setSearch,
  addChatGroup,
  toggleAddChatGroup,
}: Props) => (
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
        <Button type="primary" onClick={toggleAddChatGroup}>
          Create New Chat Groups
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
          key: "name",
          title: "Name",
          dataIndex: "name",
          render: (value, record) => (
            <Link to={`/app/scheme-settings/Chats/view/${record.key}`}>
              {value}
            </Link>
          ),
        },
        {
          key: "description",
          title: "description",
          dataIndex: "description",
        },
      ]}
      dataSource={data?.chats.map((chat) => ({
        key: chat.id,
        name: chat.name,
        description: chat.description,
      }))}
    />

    <Drawer
      title="Invite A New Chat Group"
      visible={addChatGroup}
      width="800"
      onClose={toggleAddChatGroup}
    >
      {addChatGroup ? <AddChatGroup onClose={toggleAddChatGroup} /> : <div />}
    </Drawer>
  </div>
);

export default ChatList;
