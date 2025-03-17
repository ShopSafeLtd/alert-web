import type { BusinessReportQuery } from 'graphql/businesses/queries/__generated__/business-report.generated';
import type { Moment } from 'moment';

import { faDownload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import BusinessSideList from 'components/businesses/BusinessSideList';
import moment from 'moment';
import React from 'react';
// eslint-disable-next-line import/default
import Chart from 'react-apexcharts';
import { FormattedMessage, useIntl } from 'react-intl';

import useStyles from './business.styles';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface Props {
  data: BusinessReportQuery | undefined;
  dateRange: Moment[];
  loading: boolean;
  selectedBusiness: string | undefined;
  setDateRange: (values: Moment[]) => void;
}

const Business = ({
  data,
  dateRange,
  loading,
  selectedBusiness,
  setDateRange,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Row wrap={false}>
      <Col>
        <BusinessSideList
          current={selectedBusiness || ''}
          to="/app/reports/business/"
        />
      </Col>
      <Col flex={1}>
        <div className={classes.page}>
          <Row align="middle" className={classes.actionBar} gutter={32}>
            <Col>
              <Title className={classes.title} level={3}>
                {data?.business?.name}
              </Title>
            </Col>
            <Col flex={1}>
              {/* @ts-expect-error date value */}
              <RangePicker onChange={setDateRange} value={dateRange} />
            </Col>
            <Col>
              <Button type="primary">
                <FontAwesomeIcon
                  className={classes.buttonIcon}
                  icon={faDownload}
                />
                {intl.formatMessage({
                  defaultMessage: 'Download Report',
                })}
              </Button>
            </Col>
          </Row>
          {loading ? (
            <div className={classes.loadingPage}>
              <Spin />
            </div>
          ) : (
            <div className={classes.incidentSummary}>
              <Row gutter={16}>
                <Col>
                  <Card>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Lost Value',
                      })}
                      value={intl.formatNumber(
                        data?.business?.valueStats?.totalLostValue || 0,
                        {
                          currency: 'GBP',
                          style: 'currency',
                        }
                      )}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Total Recovered Value',
                      })}
                      value={intl.formatNumber(
                        data?.business?.valueStats?.totalRecoveredValue || 0,
                        {
                          currency: 'GBP',
                          style: 'currency',
                        }
                      )}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      suffix="%"
                      title={intl.formatMessage({
                        defaultMessage: 'Loss Rate',
                      })}
                      value={
                        data?.business?.valueStats?.successRate?.toFixed(2) || 0
                      }
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Avg Lost Value',
                      })}
                      value={intl.formatNumber(
                        data?.business?.valueStats?.totalLostValue || 0,
                        {
                          currency: 'GBP',
                          style: 'currency',
                        }
                      )}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      title={intl.formatMessage({
                        defaultMessage: 'Avg Recovered Value',
                      })}
                      value={intl.formatNumber(
                        data?.business?.valueStats?.avgRecoveredValue || 0,
                        {
                          currency: 'GBP',
                          style: 'currency',
                        }
                      )}
                    />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Card>
                    <Title level={4}>
                      <FormattedMessage defaultMessage="Goods Types By Value Lost" />
                    </Title>
                    <Chart
                      height="200"
                      options={{
                        chart: {
                          id: 'business-goods-donut',
                          redrawOnParentResize: false,
                          toolbar: {
                            show: false,
                          },
                        },
                        labels:
                          data?.business?.goodsTypesTotals
                            ?.filter((item) => item.totalLostValue)
                            .map((item) => item.goodsType?.name || '') || [],
                      }}
                      series={
                        data?.business?.goodsTypesTotals
                          ?.filter((item) => item.totalLostValue)
                          .map((item) => item.totalLostValue || 0) || []
                      }
                      type="donut"
                      width="95%"
                    />
                  </Card>
                </Col>
              </Row>
              <Card>
                <Title level={4}>
                  <FormattedMessage defaultMessage="Goods Types" />
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
                      dataIndex: 'lost',
                      key: 'lost',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency: 'GBP',
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Total Lost',
                      }),
                    },
                    {
                      dataIndex: 'recovered',
                      key: 'recovered',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency: 'GBP',
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Total Recovered',
                      }),
                    },
                    {
                      dataIndex: 'successRate',
                      key: 'successRate',
                      render: (value: number) => `${value.toFixed(0)}%`,
                      title: intl.formatMessage({
                        defaultMessage: 'Loss Rate',
                      }),
                    },
                    {
                      dataIndex: 'avgLost',
                      key: 'avgLost',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency: 'GBP',
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Avg Lost',
                      }),
                    },
                  ]}
                  dataSource={data?.business?.goodsTypesTotals
                    ?.filter(
                      (type) =>
                        type.avgLostValue ||
                        type.avgRecoveredValue ||
                        type.successRate ||
                        type.totalLostValue ||
                        type.totalRecoveredValue
                    )
                    .map((type) => ({
                      avgLost: type.avgLostValue || 0,
                      avgRecovered: type.avgRecoveredValue || 0,
                      incidents: type.count || 0,
                      key: type.goodsType?.id,
                      lost: type.totalLostValue || 0,
                      name: type.goodsType?.name,
                      recovered: type.totalRecoveredValue || 0,
                      successRate: type.successRate || 0,
                    }))}
                  size="small"
                />
              </Card>
              <Card>
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'All Incidents',
                  })}
                </Title>
                <Table
                  columns={[
                    {
                      dataIndex: 'reference',
                      key: 'reference',
                      title: intl.formatMessage({
                        defaultMessage: 'Alert ID',
                      }),
                    },
                    {
                      dataIndex: 'date',
                      key: 'date',
                      render: (value: Date) => moment(value).format('DD/MM/YY'),
                      title: intl.formatMessage({
                        defaultMessage: 'Date',
                      }),
                    },
                    {
                      dataIndex: 'value',
                      key: 'value',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency: 'GBP',
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Value',
                      }),
                    },
                    {
                      dataIndex: 'recoveredValue',
                      key: 'recoveredValue',
                      render: (value: number) =>
                        intl.formatNumber(value, {
                          currency: 'GBP',
                          style: 'currency',
                        }),
                      title: intl.formatMessage({
                        defaultMessage: 'Recovered Value',
                      }),
                    },
                    {
                      dataIndex: 'createdBy',
                      key: 'createdBy',
                      title: intl.formatMessage({
                        defaultMessage: 'Created By',
                      }),
                    },
                    {
                      dataIndex: 'crimeTypes',
                      key: 'crimeTypes',
                      render: (value: { id: string; name: string }[]) =>
                        value.map(
                          // eslint-disable-next-line
                          ({ id, name }: { id: string; name: string }) => (
                            <Tag key={id}>{name}</Tag>
                          )
                        ),
                      title: intl.formatMessage({
                        defaultMessage: 'Types',
                      }),
                    },
                  ]}
                  dataSource={data?.business?.incidents.map((incident) => ({
                    createdBy: incident.createdBy.businesses[0]?.name,
                    crimeTypes: incident.crimeTypes,
                    date: incident.date,
                    key: incident.id,
                    recoveredValue: incident.totalRecoveredValue || 0,
                    reference: incident.reference,
                    value: incident.totalValue || 0,
                  }))}
                  size="small"
                />
              </Card>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Business;
