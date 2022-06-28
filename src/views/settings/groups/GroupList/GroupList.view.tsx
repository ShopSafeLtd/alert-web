import { Table, Row, Col, Input, Drawer, Button } from "antd";
import { CreateGroupMutation, SchemeGroupsQuery } from "graphql/generated";
import { Link } from "react-router-dom";
import AddGroup from "components/form-components/group/AddGroup";
import { MutationUpdaterFn } from "@apollo/client";

interface Props {
  data: SchemeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addGroup: boolean;
  toggleAddGroup: () => void;
  updateGroupList: MutationUpdaterFn<CreateGroupMutation>;
}

const GroupList = ({
  data,
  loading,
  search,
  setSearch,
  addGroup,
  toggleAddGroup,
  updateGroupList
}: Props) => (
  <div className="list-view">
    <Row gutter={8} style={{ marginBottom: 10 }}>
      <Col span={8}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for a group..."
          allowClear
        />
      </Col>
      <Col flex={1} />
      <Col>
        <Button type="primary" onClick={toggleAddGroup}>
          Create New Groups
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
            <Link to={`/app/scheme-settings/groups/view/${record.key}`}>
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
      dataSource={data?.groups.map((group) => ({
        key: group.id,
        name: group.name,
        description: group.description,
      }))}
    />

    <Drawer
      title="Invite New Group"
      visible={addGroup}
      width="400"
      onClose={toggleAddGroup}
    >
      {addGroup ? (
        <AddGroup
          update={updateGroupList}
          onClose={toggleAddGroup}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </div>
);

export default GroupList;
