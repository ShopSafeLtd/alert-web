import type { SearchBusinessesQuery } from 'graphql/businesses/queries/__generated__/search-businesses.generated';

import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import { Button, Col, Input, Row, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import useStyles from './search.styles';

const { Title } = Typography;

// TODO move to business Select
interface Props {
  currentSearchPage: number;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchPageChange: (page: number, pageSize: number) => void;
  searchBusinessData: SearchBusinessesQuery | undefined;
  searchBusinessLoading: boolean;
  searchValue: string;
  setSelectedBusiness: (value: string) => void;
}

const SearchBusiness = ({
  currentSearchPage,
  handleSearchChange,
  onSearchPageChange,
  searchBusinessData,
  searchBusinessLoading,
  searchValue,
  setSelectedBusiness,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  const { reportId } = useParams();

  return (
    <Row>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId={reportId ?? ''}
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col className={classes.searchPage} flex={1}>
        <Title level={3}>
          {intl.formatMessage({
            defaultMessage: 'Select an business to view',
          })}
        </Title>
        <Row className={classes.toolbar}>
          <Col span={8}>
            <Input
              onChange={handleSearchChange}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for an business...',
              })}
              value={searchValue}
            />
          </Col>
        </Row>
        <Table
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
            },
            {
              dataIndex: 'location',
              key: 'location',
              title: intl.formatMessage({
                defaultMessage: 'Location',
              }),
            },
            {
              dataIndex: 'action',
              key: 'action',
              onCell: () => ({
                className: classes.actionCell,
              }),
              render: (_, item) => (
                <Button onClick={() => setSelectedBusiness(item.key)}>
                  {intl.formatMessage({
                    defaultMessage: 'Select',
                  })}
                </Button>
              ),
              title: '',
            },
          ]}
          dataSource={searchBusinessData?.listBusinesses.businesses?.map(
            (business) => ({
              key: business.id,
              location: business.locations[0]?.full,
              name: business.name,
            })
          )}
          loading={searchBusinessLoading}
          pagination={{
            current: currentSearchPage,
            defaultPageSize: 20,
            hideOnSinglePage: true,
            onChange: onSearchPageChange,
            pageSizeOptions: ['20', '50', '100'],
            showTotal: (total) =>
              intl.formatMessage(
                {
                  defaultMessage: 'Total businesses: {total}',
                },
                {
                  total,
                }
              ),
            total: searchBusinessData?.listBusinesses?.total,
          }}
          size="small"
        />
      </Col>
    </Row>
  );
};

export default SearchBusiness;
