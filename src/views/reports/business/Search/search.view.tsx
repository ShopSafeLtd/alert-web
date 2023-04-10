import React from 'react';
import { Button, Col, Input, Row, Table, Typography } from 'antd';
import type { SearchBusinessesQuery } from 'graphql/generated';
import useStyles from './search.styles';

const { Title } = Typography;

interface Props {
  searchBusinessData: SearchBusinessesQuery | undefined;
  searchBusinessLoading: boolean;
  searchValue: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedBusiness: (value: string) => void;
  currentSearchPage: number;
  onSearchPageChange: (page: number, pageSize: number) => void;
}

const SearchBusiness = ({
  searchBusinessData,
  searchBusinessLoading,
  searchValue,
  handleSearchChange,
  setSelectedBusiness,
  currentSearchPage,
  onSearchPageChange,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.searchPage}>
      <Title level={3}>Select an business to view</Title>
      <Row className={classes.toolbar}>
        <Col span={8}>
          <Input
            placeholder="Search for an business..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>
      <Table
        columns={[
          {
            key: 'name',
            dataIndex: 'name',
            title: 'Name',
          },
          {
            key: 'location',
            dataIndex: 'location',
            title: 'location',
          },
          {
            key: 'action',
            dataIndex: 'action',
            title: '',
            render: (_, item) => (
              <Button onClick={() => setSelectedBusiness(item.key)}>
                Select
              </Button>
            ),
            onCell: () => ({
              className: classes.actionCell,
            }),
          },
        ]}
        loading={searchBusinessLoading}
        dataSource={searchBusinessData?.listBusinesses.businesses?.map(
          (business) => ({
            key: business.id,
            name: business.name,
            location: business.locations[0]?.full,
          })
        )}
        pagination={{
          current: currentSearchPage,
          onChange: onSearchPageChange,
          total: searchBusinessData?.listBusinesses?.total,
          pageSizeOptions: ['20', '50', '100'],
          defaultPageSize: 20,
          showTotal: (total) => `Total offenders: ${total}`,
        }}
        size="small"
      />
    </div>
  );
};

export default SearchBusiness;
