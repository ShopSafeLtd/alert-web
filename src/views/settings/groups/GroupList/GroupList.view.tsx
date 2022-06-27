import { Table, Row, Col, Input } from "antd";
import { SchemeGroupsQuery } from "graphql/generated";
import { Link } from "react-router-dom";

interface Props {
  data: SchemeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const GroupList = ({ data, loading, search, setSearch }: Props) => (
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
  </div>
);

export default GroupList;
