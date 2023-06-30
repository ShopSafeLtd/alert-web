import React from 'react';
import type { ListBusinessesQuery } from 'graphql/generated';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import { Link } from 'react-router-dom';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddBusiness from 'components/form-components/businesses/AddBusiness';
import LinkBusiness from 'components/form-components/businesses/LinkBusiness';
import type { BusinessData } from 'types/DataType';
import { useIntl } from 'react-intl';
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
  onSubmit: (value: BusinessData) => void;
  saving: boolean;
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
  onSubmit,
  saving,
}: Props) => {
  const classNames = useStyles();
  const intl = useIntl();
  return (
    <div className={classNames.page}>
      <Row gutter={8} className={classNames.actions}>
        <Col span={8}>
          <Input
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a business...',
              id: 'qaJxSS',
            })}
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
            {intl.formatMessage({
              defaultMessage: 'Link Existing Business',
              id: '50iYmp',
            })}
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
            {intl.formatMessage({
              defaultMessage: 'New Business',
              id: 'KepKya',
            })}
          </Button>
        </Col>
      </Row>
      <Table<TableData>
        columns={[
          {
            key: 'name',
            dataIndex: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            }),
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'totalUsers',
            dataIndex: 'totalUsers',
            title: intl.formatMessage({
              defaultMessage: 'Total Users',
              id: '/VwiLT',
            }),
          },
          {
            key: 'parent',
            dataIndex: 'parent',
            title: intl.formatMessage({
              defaultMessage: 'Parent',
              id: 'zTbLfn',
            }),
            render: (value, item) =>
              value ? <Link to={`/${item.parentId || ''}`}>{value}</Link> : '',
          },
          {
            key: 'location',
            dataIndex: 'location',
            title: intl.formatMessage({
              defaultMessage: 'Location',
              id: 'rvirM2',
            }),
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
          hideOnSinglePage: true,
          pageSize: 30,
        }}
      />

      <Drawer
        open={addVisible}
        onClose={toggleAddVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
          id: 'p47asT',
        })}
        width={600}
      >
        {addVisible && (
          <AddBusiness
            onClose={toggleAddVisible}
            saving={saving}
            update={onSubmit}
          />
        )}
      </Drawer>
      <Drawer
        open={linkVisible}
        onClose={toggleLinkVisible}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
          id: 'p47asT',
        })}
        width={600}
      >
        {linkVisible && <LinkBusiness onClose={toggleLinkVisible} />}
      </Drawer>
    </div>
  );
};

export default ListBusinesses;
