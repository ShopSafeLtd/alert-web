import type { RefObject } from 'react';
import React, { useState } from 'react';
import { Button, Card, Col, Row, Table, Typography } from 'antd';
import type { BusinessEngagementQuery } from 'graphql/generated';
import { useIntl } from 'react-intl';
import useStyles from './performance-report.styles';
import type { SelectOptions } from './useBusinessEngagement';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/pro-light-svg-icons';

const { Title } = Typography;

interface Props {
  loading: boolean;
  data: BusinessEngagementQuery | undefined;
  groups: SelectOptions[];
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
        <ReportsSideMenu
          selectedId="business-enagement"
          collapsed={collapsed}
          setCollapsed={setCollapsed}
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
              defaultMessage: ' Business Engagement: {startDate} - {endDate}',
              id: 'OgG2/I',
            },
            {
              startDate: dateRange.startDate.toLocaleDateString(),
              endDate: dateRange.endDate.toLocaleDateString(),
            }
          )}
        </Title>
        <Row className="no-print" style={{ marginBottom: 10 }} gutter={8}>
          <Col span={6}>
            <GroupsSelect
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Groups',
                id: 'q2cuIU',
              })}
              mode="multiple"
              maxTagCount="responsive"
              onChange={(value) => {
                setSelectedGroups(value || []);
              }}
              value={selectedGroups}
              defaultValue={groups.map((group) => group.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col>
            <DateSelect onChange={setDateRange} defaultRange="last30Days" />
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
                id: '5q3qC0',
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
