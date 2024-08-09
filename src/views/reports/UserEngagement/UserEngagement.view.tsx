import type { UserEngagementQuery } from 'graphql/reports/queries/__generated__/list-user-engagement.generated';
import type { RefObject } from 'react';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import RolesSelect from '#/components/form-components/RolesSelect/RolesSelect.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import { faFileDownload, faFilters } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import useStyles from './UserEngagement.styles';

const { Title } = Typography;

interface Props {
  componentRef: RefObject<HTMLDivElement>;
  data:
    | Exclude<UserEngagementQuery['listUserContribution'], null | undefined>
    | null
    | undefined;
  dateRange: { endDate: Date; startDate: Date };
  filtersOpen: boolean;
  handlePrint: () => void;
  loading: boolean;
  search: string;
  selectedBusinesses: string[];
  selectedGroups: string[];
  selectedRoles: string[];
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined
  ) => void;
  setSearch: (value: string) => void;
  setSelectedBusinesses: (value: string[]) => void;
  setSelectedGroups: (groups: string[]) => void;
  setSelectedRoles: (value: string[]) => void;
  toggleFiltersOpen: () => void;
}

const PerformanceReport = ({
  componentRef,
  data,
  dateRange,
  filtersOpen,
  handlePrint,
  loading,
  search,
  selectedBusinesses,
  selectedGroups,
  selectedRoles,
  setDateRange,
  setSearch,
  setSelectedBusinesses,
  setSelectedGroups,
  setSelectedRoles,
  toggleFiltersOpen,
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
          selectedId="user-engagement"
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col className={classes.page} flex={1} ref={componentRef}>
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
              endDate: dateRange.endDate.toLocaleDateString(),
              startDate: dateRange.startDate.toLocaleDateString(),
            }
          )}
        </Title>
        <Row
          className="no-print"
          gutter={6}
          style={{ left: 20, position: 'absolute', right: 20, top: 20 }}
        >
          <Col>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search for users...',
              })}
              style={{ width: 350 }}
              value={search}
            />
          </Col>
          <Col>
            <DateSelect defaultRange="last30Days" onChange={setDateRange} />
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
        <Row gutter={16}>
          <Col span={24}>
            <Card loading={loading} style={{ height: '100%' }}>
              <Title className="no-print" level={4}>
                {intl.formatMessage({
                  defaultMessage: 'User Contributions',
                })}
              </Title>
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
                      if (value.length > 2) {
                        return (
                          <>
                            {value
                              ?.slice(0, 2)
                              .map((el) => <Tag key={el}>{el}</Tag>)}
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
                    defaultSortOrder: 'descend',
                    key: 'incidentsCreated',
                    sorter: (a, b) => a.incidentsCreated - b.incidentsCreated,
                    title: intl.formatMessage({
                      defaultMessage: 'Incidents',
                    }),
                  },
                  {
                    dataIndex: 'offendersCreated',
                    key: 'offendersCreated',
                    sorter: (a, b) => a.offendersCreated - b.offendersCreated,
                    title: intl.formatMessage({
                      defaultMessage: 'Offenders',
                    }),
                  },
                  {
                    dataIndex: 'updatesCreated',
                    key: 'updatesCreated',
                    sorter: (a, b) => a.updatesCreated - b.updatesCreated,
                    title: intl.formatMessage({
                      defaultMessage: 'Updates',
                    }),
                  },
                  {
                    dataIndex: 'messagesSent',
                    key: 'messagesSent',
                    sorter: (a, b) => a.messagesSent - b.messagesSent,
                    title: intl.formatMessage({
                      defaultMessage: 'Messages',
                    }),
                  },
                  {
                    dataIndex: 'logins',
                    key: 'logins',
                    sorter: (a, b) => a.logins - b.logins,
                    title: intl.formatMessage({
                      defaultMessage: 'Logins',
                    }),
                  },
                  {
                    dataIndex: 'lastLogin',
                    key: 'lastLogin',
                    title: intl.formatMessage({
                      defaultMessage: 'Last Login',
                    }),
                    // sorter: (a, b) => a.lastLogin - b.lastLogin,
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
                  defaultPageSize: 30,
                  hideOnSinglePage: true,
                  showSizeChanger: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total}`,
                  total: data?.total || 0,
                }}
                size="small"
              />
            </Card>
          </Col>
        </Row>

        <Drawer
          onClose={toggleFiltersOpen}
          title={intl.formatMessage({
            defaultMessage: 'Report Filters',
          })}
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
                maxTagCount="responsive"
                mode="multiple"
                onChange={(value) => {
                  setSelectedGroups(value || []);
                }}
                style={{ width: '100%' }}
                value={selectedGroups}
              />
            </Form.Item>
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
          </Form>
        </Drawer>
      </Col>
    </Row>
  );
};

export default PerformanceReport;
