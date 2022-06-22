import React from "react";
import { Table, Row, Col, Input } from "antd";
import { ListSchemeUsersQuery } from "graphql/generated";

interface Props {
  data: ListSchemeUsersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const UserList = ({ data, loading, search, setSearch }: Props) => (
  <div className="list-view">
    <Row style={{ marginBottom: 10 }}>
      <Col span={8}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for a user..."
        />
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
        },
        {
          key: "emailAddress",
          title: "Email Address",
          dataIndex: "emailAddress",
        },
      ]}
      dataSource={data?.users.map((user) => ({
        name: user.fullName,
        emailAddress: user.email,
      }))}
    />
  </div>
);

export default UserList;
