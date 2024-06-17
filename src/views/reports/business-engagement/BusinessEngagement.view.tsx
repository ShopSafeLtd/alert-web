import type { RefObject } from 'react';
import React, { useState } from 'react';
import { Button, Card, Col, Row, Select, Table, Typography } from 'antd';
import type { BusinessEngagementQuery } from 'graphql/generated';
import DatePicker from 'components/util-components/DatePicker';
import { useIntl } from 'react-intl';
import useStyles from './performance-report.styles';
import type { SelectOptions } from './useBusinessEngagement';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';

const { Title } = Typography;

interface Props {
  loading: boolean;
  data: BusinessEngagementQuery | undefined;
  groups: SelectOptions[];
  groupsLoading: boolean;
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  selectedGroups: string[];
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
}

const PerformanceReport = ({
  data,
  loading,
  setDateRange,
  dateRange,
  groups,
  setSelectedGroups,
  groupsLoading,
  selectedGroups,
  handlePrint,
  componentRef,
}: Props) => {
  const classes = useStyles();
  const logo = localStorage.getItem('logo');
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Row>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu collapsed={collapsed} setCollapsed={setCollapsed} />
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
              defaultMessage: ' Business Engagement: {startDate} - {endDate}',
              id: 'OgG2/I',
            },
            {
              startDate: dateRange.startDate.toLocaleDateString(),
              endDate: dateRange.endDate.toLocaleDateString(),
            }
          )}
        </Title>
        <Row className="no-print" style={{ marginBottom: 10 }}>
          <Col span={6}>
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Content Groups',
                id: '5D6XJu',
              })}
              mode="multiple"
              maxTagCount="responsive"
              onChange={(value) => {
                setSelectedGroups(value || []);
              }}
              value={selectedGroups}
              defaultValue={groups.map((group) => group.value)}
              style={{ width: '100%' }}
            >
              {groups?.map((group) => (
                <Select.Option
                  loading={groupsLoading}
                  key={group.value}
                  value={group.value}
                >
                  {group.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <DatePicker.RangePicker
              style={{ marginLeft: 10 }}
              defaultValue={[dateRange.startDate, dateRange.endDate]}
              value={[dateRange.startDate, dateRange.endDate]}
              onChange={(value) => {
                setDateRange(
                  value
                    ? {
                        startDate:
                          value?.[0] ||
                          new Date(
                            new Date(
                              new Date().setMonth(new Date().getMonth() - 1)
                            ).setHours(0, 0, 59)
                          ),
                        endDate:
                          value?.[1] ||
                          new Date(new Date().setHours(23, 59, 59)),
                      }
                    : {
                        startDate: new Date(
                          new Date(
                            new Date().setMonth(new Date().getMonth() - 1)
                          ).setHours(0, 0, 59)
                        ),
                        endDate: new Date(new Date().setHours(23, 59, 59)),
                      }
                );
              }}
            />
          </Col>
          <Col>
            <Button type="primary" onClick={handlePrint}>
              {intl.formatMessage({
                defaultMessage: 'Print',
                id: 'CXRlIo',
              })}
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Card loading={loading} style={{ height: '100%' }}>
              <Title className="no-print" level={4}>
                {intl.formatMessage({
                  defaultMessage: 'Business Contributions',
                  id: 'ZwVlvA',
                })}
              </Title>
              <Table
                size="small"
                pagination={{
                  hideOnSinglePage: true,
                  total: data?.businessContribution?.total || 0,
                  defaultPageSize: 30,
                  showSizeChanger: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total}`,
                }}
                columns={[
                  {
                    key: 'fullName',
                    dataIndex: 'fullName',
                    title: intl.formatMessage({
                      defaultMessage: 'Name',
                      id: 'HAlOn1',
                    }),
                  },
                  {
                    key: 'incidentsCreated',
                    dataIndex: 'incidentsCreated',
                    title: intl.formatMessage({
                      defaultMessage: 'Incidents',
                      id: 'mtr3R4',
                    }),
                    defaultSortOrder: 'descend',
                    sorter: (a, b) => a.incidentsCreated - b.incidentsCreated,
                  },
                  {
                    key: 'offendersCreated',
                    dataIndex: 'offendersCreated',
                    title: intl.formatMessage({
                      defaultMessage: 'Offenders',
                      id: 'xb54TN',
                    }),
                    sorter: (a, b) => a.offendersCreated - b.offendersCreated,
                  },
                  {
                    key: 'updatesCreated',
                    dataIndex: 'updatesCreated',
                    title: intl.formatMessage({
                      defaultMessage: 'Updates',
                      id: 'recCg9',
                    }),
                    sorter: (a, b) => a.updatesCreated - b.updatesCreated,
                  },
                  {
                    key: 'messagesSent',
                    dataIndex: 'messagesSent',
                    title: intl.formatMessage({
                      defaultMessage: 'Messages',
                      id: 'hMzcSq',
                    }),
                    sorter: (a, b) => a.messagesSent - b.messagesSent,
                  },
                  {
                    key: 'logins',
                    dataIndex: 'logins',
                    title: intl.formatMessage({
                      defaultMessage: 'Logins',
                      id: '+vA//S',
                    }),
                    sorter: (a, b) => a.logins - b.logins,
                  },
                  {
                    key: 'users',
                    dataIndex: 'users',
                    title: intl.formatMessage({
                      defaultMessage: 'Users',
                      id: 'YDMrKK',
                    }),
                    sorter: (a, b) => a.users - b.users,
                  },
                ]}
                dataSource={data?.businessContribution?.businessContributions?.map(
                  (business, i) => ({
                    key: business.name + i.toString(),
                    fullName: business.name,
                    incidentsCreated: business.totalIncidents,
                    offendersCreated: business.totalOffenders,
                    updatesCreated: business.totalUpdates,
                    messagesSent: business.totalMessages,
                    logins: business.totalLogins,
                    users: business.totalUsers,
                  })
                )}
              />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PerformanceReport;
