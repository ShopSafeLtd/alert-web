import type { BusinessEngagementQuery } from 'graphql/reports/queries/__generated__/business-engagement.generated';
import type { RefObject } from 'react';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import Page from '#/components/shared-components/AntD/Page/Page';
import { faFileDownload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { FormattedMessage, useIntl } from 'react-intl';

import type { SelectOptions } from './useBusinessEngagement';

const { Title } = Typography;

interface Props {
  componentRef: RefObject<HTMLDivElement>;
  data: BusinessEngagementQuery | undefined;
  dateRange: { endDate: Date; startDate: Date };
  groups: SelectOptions[];
  handlePrint: () => void;
  isPrinting: boolean;
  loading: boolean;
  selectedGroups: string[];
  setDateRange: (
    dateRange: { endDate: Date; startDate: Date } | undefined
  ) => void;
  setSelectedGroups: (groups: string[]) => void;
}

const PerformanceReport = ({
  componentRef,
  data,
  dateRange,
  groups,
  handlePrint,
  isPrinting,
  loading,
  selectedGroups,
  setDateRange,
  setSelectedGroups,
}: Props) => {
  const logo = localStorage.getItem('logo');
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(false);

  const csvData = [
    [
      'Name',
      'Incidents',
      'Offenders',
      'Updates',
      'Messages',
      'Logins',
      'Users',
    ],
    ...(data?.businessContribution?.businessContributions?.map(
      (business, i) => ({
        fullName: business.name,
        incidentsCreated: business.totalIncidents,
        key: business.name + i.toString(),
        logins: business.totalLogins,
        messagesSent: business.totalMessages,
        offendersCreated: business.totalOffenders,
        updatesCreated: business.totalUpdates,
        users: business.totalUsers,
      })
    ) || []),
  ];

  return (
    <Row>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId="business-enagement"
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
                  defaultMessage:
                    ' Business Engagement: {startDate} - {endDate}',
                },
                {
                  endDate: dateRange.endDate.toLocaleDateString(),
                  startDate: dateRange.startDate.toLocaleDateString(),
                }
              )}
            </Title>
            <Row className="no-print" gutter={8} style={{ marginBottom: 10 }}>
              <Col span={6}>
                <GroupsSelect
                  defaultValue={groups.map((group) => group.value)}
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value) => {
                    setSelectedGroups(value || []);
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Groups',
                  })}
                  style={{ width: '100%' }}
                  value={selectedGroups}
                />
              </Col>
              <Col>
                <DateSelect defaultRange="last30Days" onChange={setDateRange} />
              </Col>
              <Col flex={1} />
              <Col>
                <CSVLink data={csvData} filename="User Engagement">
                  <Button>
                    <FormattedMessage defaultMessage="Download CSV" />
                  </Button>
                </CSVLink>
              </Col>
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
                      defaultMessage: 'Business Contributions',
                    })}
                  </Title>
                  <Table
                    columns={[
                      {
                        dataIndex: 'fullName',
                        key: 'fullName',
                        title: intl.formatMessage({
                          defaultMessage: 'Name',
                        }),
                      },
                      {
                        dataIndex: 'incidentsCreated',
                        defaultSortOrder: 'descend',
                        key: 'incidentsCreated',
                        sorter: (a, b) =>
                          a.incidentsCreated - b.incidentsCreated,
                        title: intl.formatMessage({
                          defaultMessage: 'Incidents',
                        }),
                      },
                      {
                        dataIndex: 'offendersCreated',
                        key: 'offendersCreated',
                        sorter: (a, b) =>
                          a.offendersCreated - b.offendersCreated,
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
                        dataIndex: 'users',
                        key: 'users',
                        sorter: (a, b) => a.users - b.users,
                        title: intl.formatMessage({
                          defaultMessage: 'Users',
                        }),
                      },
                    ]}
                    dataSource={data?.businessContribution?.businessContributions?.map(
                      (business, i) => ({
                        fullName: business.name,
                        incidentsCreated: business.totalIncidents,
                        key: business.name + i.toString(),
                        logins: business.totalLogins,
                        messagesSent: business.totalMessages,
                        offendersCreated: business.totalOffenders,
                        updatesCreated: business.totalUpdates,
                        users: business.totalUsers,
                      })
                    )}
                    pagination={{
                      defaultPageSize: 30,
                      hideOnSinglePage: true,
                      pageSize:
                        isPrinting && data?.businessContribution?.total
                          ? data.businessContribution.total
                          : undefined,
                      showSizeChanger: true,
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total}`,
                      total: data?.businessContribution?.total || 0,
                    }}
                    size="small"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Page>
      </Col>
    </Row>
  );
};

export default PerformanceReport;
