import React from 'react';
import {
  Col,
  Row,
  Spin,
  Typography,
  Statistic,
  Card,
  Table,
  Tag,
  Button,
  DatePicker,
} from 'antd';
import { BusinessReportQuery } from 'graphql/generated';
import moment, { Moment } from 'moment';
import BusinessSideList from 'components/businesses/BusinessSideList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
import Chart from 'react-apexcharts';
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
                Download Report
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
                      title="Total Lost Value"
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
                      title="Total Recovered Value"
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
                      title="Success Rate"
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      value={data?.business?.valueStats?.totalLostValue || 0}
                      prefix="£"
                      title="Avg Lost Value"
                    />
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Statistic
                      value={data?.business?.valueStats?.avgRecoveredValue || 0}
                      prefix="£"
                      title="Avg Recovered Value"
                    />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Card>
                    <Title level={4}>Goods Types By Value Lost</Title>
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
                <Title level={4}>Goods Types</Title>
                <Table
                  columns={[
                    {
                      key: 'name',
                      dataIndex: 'name',
                      title: 'Name',
                    },
                    {
                      key: 'lost',
                      dataIndex: 'lost',
                      title: 'Total Lost',
                      render: (value) => `£${value.toFixed(2)}`,
                    },
                    {
                      key: 'recovered',
                      dataIndex: 'recovered',
                      title: 'Total Recovered',
                      render: (value) => `£${value.toFixed(2)}`,
                    },
                    {
                      key: 'successRate',
                      dataIndex: 'successRate',
                      title: 'Success Rate',
                      render: (value) => `${value.toFixed(0)}%`,
                    },
                    {
                      key: 'avgLost',
                      dataIndex: 'avgLost',
                      title: 'Avg Loss',
                      render: (value) => `£${value.toFixed(2)}`,
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
                <Title level={4}>All Incidents</Title>
                <Table
                  columns={[
                    {
                      key: 'reference',
                      dataIndex: 'reference',
                      title: 'Alert ID',
                    },
                    {
                      key: 'date',
                      dataIndex: 'date',
                      title: 'Date',
                      render: (value) => moment(value).format('DD/MM/YY'),
                    },
                    {
                      key: 'value',
                      dataIndex: 'value',
                      title: 'Value',
                      render: (value) => `£${value}`,
                    },
                    {
                      key: 'recoveredValue',
                      dataIndex: 'recoveredValue',
                      title: 'Recovered Value',
                      render: (value) => `£${value}`,
                    },
                    {
                      key: 'createdBy',
                      dataIndex: 'createdBy',
                      title: 'Created by',
                    },
                    {
                      key: 'crimeTypes',
                      dataIndex: 'crimeTypes',
                      title: 'Types',
                      render: (value) =>
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
                    data: incident.date,
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
