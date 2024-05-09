import type { RefObject } from 'react';
import React from 'react';
import {
  Button,
  Card,
  Col,
  Drawer,
  Row,
  Table,
  Tag,
  Typography,
  Form,
  Input,
} from 'antd';
import type { UserEngagementQuery } from 'graphql/generated';
import DatePicker from 'components/util-components/DatePicker';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilters } from '@fortawesome/pro-light-svg-icons';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import RolesSelect from '#/components/form-components/RolesSelect/RolesSelect.view';
import useStyles from './UserEngagement.styles';

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
  return (
    <div className={classes.page} ref={componentRef}>
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
            id: 'zon0QS',
          },
          {
            startDate: dateRange.startDate.toLocaleDateString(),
            endDate: dateRange.endDate.toLocaleDateString(),
          }
        )}
      </Title>
      <Row
        style={{ position: 'absolute', top: 20, right: 20 }}
        className="no-print"
        gutter={8}
      >
        <Col>
          <Button onClick={handlePrint}>
            {intl.formatMessage({
              defaultMessage: 'Print',
              id: 'CXRlIo',
            })}
          </Button>
        </Col>
      </Row>
      <Form layout="vertical">
        <Row gutter={8}>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Search',
                id: 'xmcVZ0',
              })}
            >
              <Input
                style={{ width: 350 }}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Search for users...',
                  id: 'nS06zC',
                })}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col flex={1} />
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Date Range',
                id: '52QtMe',
              })}
            >
              <DatePicker.RangePicker
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
            </Form.Item>
          </Col>
          <Col>
            <Button onClick={toggleFiltersOpen} style={{ marginTop: 29 }}>
              <FontAwesomeIcon icon={faFilters} style={{ marginRight: 10 }} />
              {intl.formatMessage({
                defaultMessage: 'More Filters',
                id: 'stWNQ/',
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
                id: '6VIhyo',
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
                    id: 'HAlOn1',
                  }),
                },
                {
                  key: 'businesses',
                  dataIndex: 'businesses',
                  title: intl.formatMessage({
                    defaultMessage: 'Businesses',
                    id: 'D0tMhW',
                  }),
                  render: (value: string[]) => {
                    if (value.length > 2) {
                      return (
                        <>
                          {value?.slice(0, 2).map((el) => (
                            <Tag>{el}</Tag>
                          ))}
                          <Tag>
                            {intl.formatMessage(
                              {
                                defaultMessage: '+ {num} more',
                                id: 'fi2Xie',
                              },
                              {
                                num: value.length - 1,
                              }
                            )}
                          </Tag>
                        </>
                      );
                    }
                    return value?.map((el) => <Tag>{el}</Tag>);
                  },
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
                  key: 'lastLogin',
                  dataIndex: 'lastLogin',
                  title: intl.formatMessage({
                    defaultMessage: 'Last Login',
                    id: 'LPUHNC',
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
          id: 'QxpB9+',
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
              id: 'hzmswI',
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
              id: 'D0tMhW',
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
              id: 'c35gM5',
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
    </div>
  );
};

export default PerformanceReport;
