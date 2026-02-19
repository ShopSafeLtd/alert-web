import type { UserEngagementQuery } from 'graphql/reports/queries/__generated__/list-user-engagement.generated';
import type { RefObject } from 'react';

import BrandsSelect from '#/components/form-components/BrandsSelect/BrandsSelect.view';
import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import RolesSelect from '#/components/form-components/RolesSelect/RolesSelect.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import Page from '#/components/shared-components/AntD/Page/Page';
import { useGroupsContext } from '#/context/groups-context';
import { faFileDownload, faFilters } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Table,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { FormattedMessage, useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  componentRef: RefObject<HTMLDivElement>;
  currentPage: number;
  data:
    | Exclude<UserEngagementQuery['userContributions'], null | undefined>
    | null
    | undefined;
  dateRange: { endDate: Date; startDate: Date };
  filtersOpen: boolean;
  handlePageChange: (page: number, newPageSize?: number) => void;
  handlePrint: () => void;
  handleSort: (field: string) => void;
  isPrinting: boolean;
  loading: boolean;
  pageSize: number;
  search: string;
  selectedBusinessGroups: string[];
  selectedBusinesses: string[];
  selectedDataBrands: string[];
  selectedGroups: string[];
  selectedRoles: string[];
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined
  ) => void;
  setSearch: (value: string) => void;
  setSelectedBusinessGroups: (groups: string[]) => void;
  setSelectedBusinesses: (value: string[]) => void;
  setSelectedDataBrands: (groups: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedRoles: (value: string[]) => void;
  sortDirection: 'asc' | 'desc';
  sortField: string;
  toggleFiltersOpen: () => void;
}

const PerformanceReport = ({
  componentRef,
  currentPage,
  data,
  dateRange,
  filtersOpen,
  handlePageChange,
  handlePrint,
  handleSort,
  isPrinting,
  loading,
  pageSize,
  search,
  selectedBusinessGroups,
  selectedBusinesses,
  selectedDataBrands,
  selectedGroups,
  selectedRoles,
  setDateRange,
  setSearch,
  setSelectedBusinessGroups,
  setSelectedBusinesses,
  setSelectedDataBrands,
  setSelectedGroups,
  setSelectedRoles,
  sortDirection,
  sortField,
  toggleFiltersOpen,
}: Props) => {
  const logo = localStorage.getItem('logo');
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  const { groups } = useGroupsContext();

  // Helper function to show sort indicator
  const getSortIndicator = (columnField: string) => {
    if (sortField === columnField) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };
  const csvData = [
    [
      'Name',
      'Businesses',
      'Incidents',
      'Offenders',
      'Updates',
      'Messages',
      'Logins',
      'Last Login',
      'Groups',
    ],
    ...(data?.userContributions.map((user) => [
      user.name,
      user.businesses.join(', '),
      user.totalIncidents,
      user.totalOffenders,
      user.totalUpdates,
      user.totalMessages,
      user.totalLogins,
      user.lastLogin,
      user.groups?.join(', '),
    ]) || []),
  ];
  return (
    <Row wrap={false}>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId="user-engagement"
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col flex={1}>
        <Page>
          <div ref={componentRef}>
            <div className="logo">
              <img
                // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                alt="logo"
                src={logo || ''}
                style={{ height: '100%', width: '25 %' }}
              />
            </div>
            <Title className="print-title" level={2}>
              {intl.formatMessage(
                {
                  defaultMessage: ' User Engagement: {startDate} - {endDate}',
                },
                {
                  endDate: dayjs(dateRange.endDate).format('DD/MM/YYYY'),
                  startDate: dayjs(dateRange.startDate).format('DD/MM/YYYY'),
                }
              )}
            </Title>
            <Form layout="vertical">
              <Row
                className="no-print"
                gutter={4}
                style={{ left: 20, position: 'absolute', right: 20, top: 20 }}
                wrap={false}
              >
                <Col span={4}>
                  <Form.Item
                    label={intl.formatMessage({ defaultMessage: 'Groups' })}
                    style={{ marginBottom: 0 }}
                  >
                    <GroupsSelect
                      allowClear
                      maxTagCount="responsive"
                      mode="multiple"
                      onChange={(value) => setSelectedGroups(value || [])}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Select Groups',
                      })}
                      style={{ width: '100%' }}
                      value={selectedGroups}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label={intl.formatMessage({ defaultMessage: 'Search' })}
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Search for users...',
                      })}
                      value={search}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Date Range',
                    })}
                    style={{ marginBottom: 0 }}
                  >
                    <DateSelect
                      defaultRange="last30Days"
                      onChange={setDateRange}
                    />
                  </Form.Item>
                </Col>
                <Col flex={1} />
                <Col style={{ alignSelf: 'flex-end' }}>
                  <Button onClick={toggleFiltersOpen}>
                    <FontAwesomeIcon
                      icon={faFilters}
                      style={{ marginRight: 10 }}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'More Filters',
                    })}
                  </Button>
                </Col>
                <Col style={{ alignSelf: 'flex-end' }}>
                  <CSVLink data={csvData} filename="User Engagement">
                    <Button>
                      <FormattedMessage defaultMessage="Download CSV" />
                    </Button>
                  </CSVLink>
                </Col>
                <Col style={{ alignSelf: 'flex-end' }}>
                  <Button onClick={handlePrint}>
                    <FontAwesomeIcon
                      icon={faFileDownload}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Download',
                    })}
                  </Button>
                </Col>
              </Row>
            </Form>
            <Row gutter={16}>
              <Col span={24}>
                <Card loading={loading} style={{ height: '100%' }}>
                  <Title className="no-print" level={4}>
                    {intl.formatMessage({
                      defaultMessage: 'User Contributions',
                    })}
                  </Title>
                  {selectedGroups.length === 0 &&
                  groups.length >= 3 &&
                  !loading ? (
                    <Alert
                      description={
                        <>
                          <Typography.Text>
                            {intl.formatMessage({
                              defaultMessage: 'Quick select:',
                            })}
                          </Typography.Text>
                          <div style={{ marginTop: 8 }}>
                            {groups.slice(0, 10).map((group) => (
                              <Tag
                                key={group.value}
                                onClick={() => setSelectedGroups([group.value])}
                                style={{ cursor: 'pointer', marginBottom: 8 }}
                              >
                                {group.label}
                              </Tag>
                            ))}
                          </div>
                        </>
                      }
                      message={intl.formatMessage({
                        defaultMessage:
                          'Please select one or more groups to view data',
                      })}
                      showIcon
                      style={{ marginBottom: 16 }}
                      type="info"
                    />
                  ) : (
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
                          dataIndex: 'businesses',
                          key: 'businesses',
                          render: (value: string[]) => {
                            if (isPrinting) {
                              if (value.length > 2) {
                                return `${value.slice(0, 2).join(', ')} + ${value.length - 1} more`;
                              }
                              return value.join(', ');
                            }
                            if (value.length > 2) {
                              return (
                                <>
                                  {value?.slice(0, 2).map((el) => (
                                    <Tag key={el}>{el}</Tag>
                                  ))}
                                  <Tag>
                                    {intl.formatMessage(
                                      {
                                        defaultMessage: '+ {num} more',
                                      },
                                      {
                                        num: value.length - 1,
                                      }
                                    )}
                                  </Tag>
                                </>
                              );
                            }
                            return value?.map((el) => <Tag key={el}>{el}</Tag>);
                          },
                          title: intl.formatMessage({
                            defaultMessage: 'Businesses',
                          }),
                        },
                        {
                          dataIndex: 'incidentsCreated',
                          key: 'incidentsCreated',
                          onHeaderCell: () => ({
                            onClick: () => handleSort('totalIncidents'),
                            style: { cursor: 'pointer' },
                          }),
                          title:
                            intl.formatMessage({
                              defaultMessage: 'Incidents',
                            }) + getSortIndicator('totalIncidents'),
                        },
                        {
                          dataIndex: 'offendersCreated',
                          key: 'offendersCreated',
                          onHeaderCell: () => ({
                            onClick: () => handleSort('totalOffenders'),
                            style: { cursor: 'pointer' },
                          }),
                          title:
                            intl.formatMessage({
                              defaultMessage: 'Offenders',
                            }) + getSortIndicator('totalOffenders'),
                        },
                        {
                          dataIndex: 'updatesCreated',
                          key: 'updatesCreated',
                          onHeaderCell: () => ({
                            onClick: () => handleSort('totalUpdates'),
                            style: { cursor: 'pointer' },
                          }),
                          title:
                            intl.formatMessage({
                              defaultMessage: 'Updates',
                            }) + getSortIndicator('totalUpdates'),
                        },
                        {
                          dataIndex: 'messagesSent',
                          key: 'messagesSent',
                          onHeaderCell: () => ({
                            onClick: () => handleSort('totalMessages'),
                            style: { cursor: 'pointer' },
                          }),
                          title:
                            intl.formatMessage({
                              defaultMessage: 'Messages',
                            }) + getSortIndicator('totalMessages'),
                        },
                        {
                          dataIndex: 'logins',
                          key: 'logins',
                          onHeaderCell: () => ({
                            onClick: () => handleSort('totalLogins'),
                            style: { cursor: 'pointer' },
                          }),
                          title:
                            intl.formatMessage({
                              defaultMessage: 'Logins',
                            }) + getSortIndicator('totalLogins'),
                        },
                        {
                          dataIndex: 'lastLogin',
                          key: 'lastLogin',
                          onHeaderCell: () => ({
                            onClick: () => handleSort('lastLogin'),
                            style: { cursor: 'pointer' },
                          }),
                          title:
                            intl.formatMessage({
                              defaultMessage: 'Last Login',
                            }) + getSortIndicator('lastLogin'),
                        },
                      ]}
                      dataSource={data?.userContributions.map((user, i) => ({
                        businesses: user.businesses,
                        incidentsCreated: user.totalIncidents,
                        key: user.name + i.toString(),
                        lastLogin: user.lastLogin,
                        logins: user.totalLogins,
                        messagesSent: user.totalMessages,
                        name: user.name,
                        offendersCreated: user.totalOffenders,
                        updatesCreated: user.totalUpdates,
                      }))}
                      pagination={{
                        current: currentPage,
                        defaultPageSize: 30,
                        hideOnSinglePage: true,
                        onChange: handlePageChange,
                        onShowSizeChange: handlePageChange,
                        pageSize:
                          isPrinting && data?.total ? data.total : pageSize,
                        showSizeChanger: true,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} of ${total}`,
                        total: data?.total || 0,
                      }}
                      size="small"
                    />
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </Page>
        <Drawer
          onClose={toggleFiltersOpen}
          title={intl.formatMessage({
            defaultMessage: 'Report Filters',
          })}
          visible={filtersOpen}
          width={700}
        >
          <Form layout="vertical">
            <Typography.Title level={4}>
              {intl.formatMessage({ defaultMessage: 'User Filters' })}
            </Typography.Title>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Businesses',
              })}
            >
              <BusinessesSelect
                maxTagCount="responsive"
                mode="multiple"
                onChange={(value) => {
                  setSelectedBusinesses(value || []);
                }}
                style={{ width: '100%' }}
                value={selectedBusinesses}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Roles',
              })}
            >
              <RolesSelect
                maxTagCount="responsive"
                mode="multiple"
                onChange={(value) => {
                  setSelectedRoles(value || []);
                }}
                style={{ width: '100%' }}
                value={selectedRoles}
              />
            </Form.Item>
            <Divider />
            <Typography.Title level={4}>
              {intl.formatMessage({ defaultMessage: 'Data Filters' })}
            </Typography.Title>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Incident Business Groups',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Limits the data shows for each user only data from incidents which are assigned to businesses in the selected groups.',
              })}
            >
              <GroupsSelect
                maxTagCount="responsive"
                mode="multiple"
                onChange={(value) => {
                  setSelectedBusinessGroups(value || []);
                }}
                style={{ width: '100%' }}
                value={selectedBusinessGroups}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Incident Business Brands',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Limits the data shows for each user only data from incidents which are assigned to businesses assigned to the selected brands.',
              })}
            >
              <BrandsSelect
                maxTagCount="responsive"
                mode="multiple"
                onChange={(value) => {
                  setSelectedDataBrands(value || []);
                }}
                style={{ width: '100%' }}
                value={selectedDataBrands}
              />
            </Form.Item>
          </Form>
        </Drawer>
      </Col>
    </Row>
  );
};

export default PerformanceReport;
