import React from 'react';
import type { ListBusinessesQuery } from 'graphql/generated';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddBusiness from 'components/form-components/businesses/AddBusiness';
import LinkBusiness from 'components/form-components/businesses/LinkBusiness';
import useStyles from './ListBusinesses.styles';

interface TableData {
  key: string;
  name: string;
  totalUsers: number;
  parent?: string;
  parentId?: string;
  location: string;
}

interface Props {
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  addVisible: boolean;
  toggleAddVisible: () => void;
  linkVisible: boolean;
  toggleLinkVisible: () => void;
}

const ListBusinesses = ({
  data,
  loading,
  onSearchChange,
  searchValue,
  addVisible,
  toggleAddVisible,
  linkVisible,
  toggleLinkVisible,
}: Props) => {
  const classNames = useStyles();

  return (
    <div className={classNames.page}>
      <Row gutter={8} className={classNames.actions}>
        <Col span={8}>
          <Input
            placeholder="Search businesses..."
            onChange={(e) => onSearchChange(e.target.value)}
            value={searchValue}
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
            danger
            onClick={toggleLinkVisible}
          >
            Link Existing Business
          </Button>
        </Col>
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            danger
            onClick={toggleAddVisible}
          >
            New Business
          </Button>
        </Col>
      </Row>
      <Table<TableData>
        columns={[
          {
            key: 'name',
            dataIndex: 'name',
            title: 'Name',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'totalUsers',
            dataIndex: 'totalUsers',
            title: 'Total Users',
          },
          {
            key: 'parent',
            dataIndex: 'parent',
            title: 'Parent',
            render: (value, item) =>
              value ? <Link to={`/${item.parentId}`}>{value}</Link> : '',
          },
          {
            key: 'location',
            dataIndex: 'location',
            title: 'Location',
          },
        ]}
        dataSource={data?.listBusinesses.businesses.map((item) => ({
          key: item.id,
          name: item.name,
          totalUsers: item.totalUsers,
          parent: item.parent?.name,
          parentId: item.parent?.id,
          location: item.locations[0]?.full || '',
        }))}
        loading={loading}
        size="small"
        pagination={{
          pageSize: 30,
        }}
      />

      <Drawer
        open={addVisible}
        onClose={toggleAddVisible}
        title="Add New Business"
        width={600}
      >
        {addVisible && <AddBusiness onClose={toggleAddVisible} />}
      </Drawer>
      <Drawer
        open={linkVisible}
        onClose={toggleLinkVisible}
        title="Add New Business"
        width={600}
      >
        {linkVisible && <LinkBusiness onClose={toggleLinkVisible} />}
      </Drawer>
    </div>
  );
};

export default ListBusinesses;
