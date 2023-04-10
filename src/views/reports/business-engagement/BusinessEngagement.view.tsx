import React from 'react';
import { Card, Col, Row, Select, Table, Typography } from 'antd';
import type { BusinessEngagementQuery } from 'graphql/generated';
import DatePicker from 'components/util-components/DatePicker';
import useStyles from './performance-report.styles';
import type { SelectOptions } from './useBusinessEngagement';

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
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Title level={2}>Business Engagement</Title>
      <Row style={{ marginBottom: 10 }}>
        <Col span={6}>
          <Select
            placeholder="Select Groups"
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
                        value?.[1] || new Date(new Date().setHours(23, 59, 59)),
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
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card loading={loading} style={{ height: '100%' }}>
            <Title level={4}>Business Contributions</Title>
            <Table
              size="small"
              pagination={{
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
                  title: 'Name',
                },
                {
                  key: 'incidentsCreated',
                  dataIndex: 'incidentsCreated',
                  title: 'Incidents',
                  defaultSortOrder: 'descend',
                  sorter: (a, b) => a.incidentsCreated - b.incidentsCreated,
                },
                {
                  key: 'offendersCreated',
                  dataIndex: 'offendersCreated',
                  title: 'Offenders',
                  sorter: (a, b) => a.offendersCreated - b.offendersCreated,
                },
                {
                  key: 'updatesCreated',
                  dataIndex: 'updatesCreated',
                  title: 'Updates',
                  sorter: (a, b) => a.updatesCreated - b.updatesCreated,
                },
                {
                  key: 'messagesSent',
                  dataIndex: 'messagesSent',
                  title: 'Messages',
                  sorter: (a, b) => a.messagesSent - b.messagesSent,
                },
                {
                  key: 'logins',
                  dataIndex: 'logins',
                  title: 'Logins',
                  sorter: (a, b) => a.logins - b.logins,
                },
                {
                  key: 'users',
                  dataIndex: 'users',
                  title: 'Users',
                  sorter: (a, b) => a.users - b.users,
                },
              ]}
              dataSource={data?.businessContribution?.businessContributions?.map(
                (business, i) => ({
                  key: business.name + i,
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
    </div>
  );
};

export default PerformanceReport;
