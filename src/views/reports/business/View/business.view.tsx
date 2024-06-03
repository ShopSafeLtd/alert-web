import React from 'react';
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
import type { BusinessReportQuery } from 'graphql/generated';
import type { Moment } from 'moment';
import moment from 'moment';
import BusinessSideList from 'components/businesses/BusinessSideList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
// eslint-disable-next-line import/default
import Chart from 'react-apexcharts';
import { FormattedMessage, useIntl } from 'react-intl';
import useStyles from './business.styles';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface Props {
  data: BusinessReportQuery | undefined;
  loading: boolean;
  selectedBusiness: string | undefined;
  dateRange: Moment[];
  setDateRange: (values: Moment[]) => void;
}

const Business = ({
  data,
  loading,
  selectedBusiness,
  dateRange,
  setDateRange,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <Row wrap={false}>
      <Col>
        <BusinessSideList
          to="/app/reports/business/"
          current={selectedBusiness || ''}
        />
      </Col>
      <Col flex={1}>
        <div className={classes.page}>
          <Row gutter={32} align="middle" className={classes.actionBar}>
            <Col>
              <Title className={classes.title} level={3}>
                {data?.business?.name}
              </Title>
            </Col>
            <Col flex={1}>
              {/* @ts-expect-error date value */}
              <RangePicker value={dateRange} onChange={setDateRange} />
            </Col>
            <Col>
              <Button type="primary">
                <FontAwesomeIcon
                  icon={faDownload}
                  className={classes.buttonIcon}
                />
                {intl.formatMessage({
                  defaultMessage: 'Download Report',
                  id: 'iHdvdj',
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
                      prefix="£"
                      value={data?.business?.valueStats?.totalLostValue || 0}
                      title={intl.formatMessage({
                        defaultMessage: 'Total Lost Value',
                        id: '3LZ6MG',
                      })}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      prefix="£"
                      value={
                        data?.business?.valueStats?.totalRecoveredValue || 0
                      }
                      title={intl.formatMessage({
                        defaultMessage: 'Total Recovered Value',
                        id: 'pambF6',
                      })}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      value={
                        data?.business?.valueStats?.successRate?.toFixed(2) || 0
                      }
                      suffix="%"
                      title={intl.formatMessage({
                        defaultMessage: 'Loss Rate',
                        id: 'mQPFSj',
                      })}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      value={data?.business?.valueStats?.totalLostValue || 0}
                      prefix="£"
                      title={intl.formatMessage({
                        defaultMessage: 'Avg Lost Value',
                        id: 'lpKwSc',
                      })}
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      value={data?.business?.valueStats?.avgRecoveredValue || 0}
                      prefix="£"
                      title={intl.formatMessage({
                        defaultMessage: 'Avg Recovered Value',
                        id: 'PbCwq9',
                      })}
                    />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Card>
                    <Title level={4}>
                      <FormattedMessage
                        defaultMessage="Goods Types By Value Lost"
                        id="Iyt31T"
                      />
                    </Title>
                    <Chart
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
                      height="200"
                    />
                  </Card>
                </Col>
              </Row>
              <Card>
                <Title level={4}>
                  <FormattedMessage defaultMessage="Goods Types" id="Ewh6rQ" />
                </Title>
                <Table
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
                      key: 'lost',
                      dataIndex: 'lost',
                      title: intl.formatMessage({
                        defaultMessage: 'Total Lost',
                        id: 'TpqK2W',
                      }),
                      render: (value: number) => `£${value.toFixed(2)}`,
                    },
                    {
                      key: 'recovered',
                      dataIndex: 'recovered',
                      title: intl.formatMessage({
                        defaultMessage: 'Total Recovered',
                        id: '/YBJ85',
                      }),
                      render: (value: number) => `£${value.toFixed(2)}`,
                    },
                    {
                      key: 'successRate',
                      dataIndex: 'successRate',
                      title: intl.formatMessage({
                        defaultMessage: 'Loss Rate',
                        id: 'mQPFSj',
                      }),
                      render: (value: number) => `${value.toFixed(0)}%`,
                    },
                    {
                      key: 'avgLost',
                      dataIndex: 'avgLost',
                      title: intl.formatMessage({
                        defaultMessage: 'Avg Lost',
                        id: 'C70bmG',
                      }),
                      render: (value: number) => `£${value.toFixed(2)}`,
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
                      key: type.goodsType?.id,
                      name: type.goodsType?.name,
                      lost: type.totalLostValue || 0,
                      recovered: type.totalRecoveredValue || 0,
                      successRate: type.successRate || 0,
                      incidents: type.count || 0,
                      avgLost: type.avgLostValue || 0,
                      avgRecovered: type.avgRecoveredValue || 0,
                    }))}
                  size="small"
                />
              </Card>
              <Card>
                <Title level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'All Incidents',
                    id: 'wE2z2t',
                  })}
                </Title>
                <Table
                  columns={[
                    {
                      key: 'reference',
                      dataIndex: 'reference',
                      title: intl.formatMessage({
                        defaultMessage: 'Alert ID',
                        id: 'k8ZNgH',
                      }),
                    },
                    {
                      key: 'date',
                      dataIndex: 'date',
                      title: intl.formatMessage({
                        defaultMessage: 'Date',
                        id: 'P7PLVj',
                      }),
                      render: (value: Date) => moment(value).format('DD/MM/YY'),
                    },
                    {
                      key: 'value',
                      dataIndex: 'value',
                      title: intl.formatMessage({
                        defaultMessage: 'Value',
                        id: 'GufXy5',
                      }),
                      render: (value: number) => `£${value}`,
                    },
                    {
                      key: 'recoveredValue',
                      dataIndex: 'recoveredValue',
                      title: intl.formatMessage({
                        defaultMessage: 'Recovered Value',
                        id: 'bGwFFv',
                      }),
                      render: (value: number) => `£${value}`,
                    },
                    {
                      key: 'createdBy',
                      dataIndex: 'createdBy',
                      title: intl.formatMessage({
                        defaultMessage: 'Created By',
                        id: 'uAfuJA',
                      }),
                    },
                    {
                      key: 'crimeTypes',
                      dataIndex: 'crimeTypes',
                      title: intl.formatMessage({
                        defaultMessage: 'Types',
                        id: 'kxP9GJ',
                      }),
                      render: (value: { id: string; name: string }[]) =>
                        value.map(
                          // eslint-disable-next-line
                          ({ id, name }: { id: string; name: string }) => (
                            <Tag key={id}>{name}</Tag>
                          )
                        ),
                    },
                  ]}
                  dataSource={data?.business?.incidents.map((incident) => ({
                    key: incident.id,
                    reference: incident.reference,
                    date: incident.date,
                    crimeTypes: incident.crimeTypes,
                    value: incident.totalValue || 0,
                    recoveredValue: incident.totalRecoveredValue || 0,
                    createdBy: incident.createdBy.businesses[0]?.name,
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
