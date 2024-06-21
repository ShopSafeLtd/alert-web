import type { RefObject } from 'react';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Table,
  Tag,
  Typography,
} from 'antd';

import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faFilters } from '@fortawesome/pro-light-svg-icons';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import RolesSelect from '#/components/form-components/RolesSelect/RolesSelect.view';
import useStyles from './UserEngagement.styles';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import type { UserEngagementQuery } from 'graphql/reports/queries/list-user-engagement.generated';

const { Title } = Typography;

interface Props {
  loading: boolean;
  data:
    | Exclude<UserEngagementQuery['listUserContribution'], undefined | null>
    | null
    | undefined;
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  selectedGroups: string[];
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  filtersOpen: boolean;
  toggleFiltersOpen: () => void;
  selectedRoles: string[];
  setSelectedRoles: (value: string[]) => void;
  selectedBusinesses: string[];
  setSelectedBusinesses: (value: string[]) => void;
  search: string;
  setSearch: (value: string) => void;
}

const PerformanceReport = ({
  data,
  loading,
  setDateRange,
  dateRange,
  setSelectedGroups,
  selectedGroups,
  handlePrint,
  componentRef,
  toggleFiltersOpen,
  filtersOpen,
  selectedBusinesses,
  setSelectedBusinesses,
  setSelectedRoles,
  selectedRoles,
  search,
  setSearch,
}: Props) => {
  const classes = useStyles();
  const logo = localStorage.getItem('logo');
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Row>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          selectedId={'user-engagement'}
        />
      </Col>
      <Col flex={1} className={classes.page} ref={componentRef}>
        <div className="logo">
          <img
            style={{ height: '100%', width: '25 %' }}
            src={logo || ''}
            // eslint-disable-next-line formatjs/no-literal-string-in-jsx
            alt="logo"
          />
        </div>
        <Title level={2} className="print-title">
          {intl.formatMessage(
            {
              defaultMessage: ' User Engagement: {startDate} - {endDate}',
            },
            {
              startDate: dateRange.startDate.toLocaleDateString(),
              endDate: dateRange.endDate.toLocaleDateString(),
            }
          )}
        </Title>
        <Row
          gutter={6}
          style={{ position: 'absolute', top: 20, right: 20, left: 20 }}
          className="no-print"
        >
          <Col>
            <Input
              style={{ width: 350 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for users...',
              })}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col>
            <DateSelect onChange={setDateRange} defaultRange="last30Days" />
          </Col>
          <Col>
            <Button onClick={toggleFiltersOpen}>
              <FontAwesomeIcon icon={faFilters} style={{ marginRight: 10 }} />
              {intl.formatMessage({
                defaultMessage: 'More Filters',
              })}
            </Button>
          </Col>
          <Col flex={1} />
          <Col>
            <Button onClick={handlePrint}>
              <FontAwesomeIcon
                size="lg"
                style={{ marginRight: 10 }}
                icon={faFileDownload}
              />
              {intl.formatMessage({
                defaultMessage: 'Download',
              })}
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Card loading={loading} style={{ height: '100%' }}>
              <Title className="no-print" level={4}>
                {intl.formatMessage({
                  defaultMessage: 'User Contributions',
                })}
              </Title>
              <Table
                size="small"
                pagination={{
                  hideOnSinglePage: true,
                  total: data?.total || 0,
                  defaultPageSize: 30,
                  showSizeChanger: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total}`,
                }}
                columns={[
                  {
                    key: 'name',
                    dataIndex: 'name',
                    title: intl.formatMessage({
                      defaultMessage: 'Name',
                    }),
                  },
                  {
                    key: 'businesses',
                    dataIndex: 'businesses',
                    title: intl.formatMessage({
                      defaultMessage: 'Businesses',
                    }),
                    render: (value: string[]) => {
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
                  },
                  {
                    key: 'incidentsCreated',
                    dataIndex: 'incidentsCreated',
                    title: intl.formatMessage({
                      defaultMessage: 'Incidents',
                    }),
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.incidentsCreated - b.incidentsCreated,
                  },
                  {
                    key: 'offendersCreated',
                    dataIndex: 'offendersCreated',
                    title: intl.formatMessage({
                      defaultMessage: 'Offenders',
                    }),
                    sorter: (a, b) => a.offendersCreated - b.offendersCreated,
                  },
                  {
                    key: 'updatesCreated',
                    dataIndex: 'updatesCreated',
                    title: intl.formatMessage({
                      defaultMessage: 'Updates',
                    }),
                    sorter: (a, b) => a.updatesCreated - b.updatesCreated,
                  },
                  {
                    key: 'messagesSent',
                    dataIndex: 'messagesSent',
                    title: intl.formatMessage({
                      defaultMessage: 'Messages',
                    }),
                    sorter: (a, b) => a.messagesSent - b.messagesSent,
                  },
                  {
                    key: 'logins',
                    dataIndex: 'logins',
                    title: intl.formatMessage({
                      defaultMessage: 'Logins',
                    }),
                    sorter: (a, b) => a.logins - b.logins,
                  },
                  {
                    key: 'lastLogin',
                    dataIndex: 'lastLogin',
                    title: intl.formatMessage({
                      defaultMessage: 'Last Login',
                    }),
                    // sorter: (a, b) => a.lastLogin - b.lastLogin,
                  },
                ]}
                dataSource={data?.userContributions.map((user, i) => ({
                  key: user.name + i.toString(),
                  name: user.name,
                  incidentsCreated: user.totalIncidents,
                  offendersCreated: user.totalOffenders,
                  updatesCreated: user.totalUpdates,
                  messagesSent: user.totalMessages,
                  logins: user.totalLogins,
                  lastLogin: user.lastLogin,
                  businesses: user.businesses,
                }))}
              />
            </Card>
          </Col>
        </Row>

        <Drawer
          title={intl.formatMessage({
            defaultMessage: 'Report Filters',
          })}
          onClose={toggleFiltersOpen}
          visible={filtersOpen}
          width={700}
        >
          <Form layout="vertical">
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
            >
              <GroupsSelect
                mode="multiple"
                maxTagCount="responsive"
                onChange={(value) => {
                  setSelectedGroups(value || []);
                }}
                value={selectedGroups}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Businesses',
              })}
            >
              <BusinessesSelect
                mode="multiple"
                maxTagCount="responsive"
                onChange={(value) => {
                  setSelectedBusinesses(value || []);
                }}
                value={selectedBusinesses}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Roles',
              })}
            >
              <RolesSelect
                mode="multiple"
                maxTagCount="responsive"
                onChange={(value) => {
                  setSelectedRoles(value || []);
                }}
                value={selectedRoles}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>
        </Drawer>
      </Col>
    </Row>
  );
};

export default PerformanceReport;
