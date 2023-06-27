import React from 'react';
import { Button, Col, Input, Row, Table, Typography } from 'antd';
import type { SearchBusinessesQuery } from 'graphql/generated';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();

  return (
    <div className={classes.searchPage}>
      <Title level={3}>
        {intl.formatMessage({
          defaultMessage: 'Select an business to view',
          id: '4Y/QAD',
        })}
      </Title>
      <Row className={classes.toolbar}>
        <Col span={8}>
          <Input
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for an business...',
              id: 'K/tzzI',
            })}
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
            title: intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            }),
          },
          {
            key: 'location',
            dataIndex: 'location',
            title: intl.formatMessage({
              defaultMessage: 'Location',
              id: 'rvirM2',
            }),
          },
          {
            key: 'action',
            dataIndex: 'action',
            title: '',
            render: (_, item) => (
              <Button onClick={() => setSelectedBusiness(item.key)}>
                {intl.formatMessage({
                  defaultMessage: 'Select',
                  id: 'kQAf2d',
                })}
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
          hideOnSinglePage: true,
          current: currentSearchPage,
          onChange: onSearchPageChange,
          total: searchBusinessData?.listBusinesses?.total,
          pageSizeOptions: ['20', '50', '100'],
          defaultPageSize: 20,
          showTotal: (total) =>
            intl.formatMessage(
              {
                defaultMessage: 'Total businesses: {total}',
                id: 'HbFVjB',
              },
              {
                total,
              }
            ),
        }}
        size="small"
      />
    </div>
  );
};

export default SearchBusiness;
